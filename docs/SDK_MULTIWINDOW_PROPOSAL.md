# proposal: `api.Windows.create` for multi-window plugins

status: proposal, for the plugin sdk backed by tauri's rust side
author context: the mini player plugin's detached mode

## the problem

plugins that want a second, real window today have exactly one tool:
`window.open`. it is a browser primitive living inside webkitgtk, and inside
nuclear's flatpak it fights three layers at once:

- webkitgtk only partially supports detached secondary surfaces (popups often
  fail to map, decorate or raise inside the flatpak sandbox).
- document picture-in-picture is not implemented in nuclear's runtime.
- wayland's xdg-shell forbids clients from positioning, remembering geometry or
  stacking themselves. the app cannot cheat; the compositor is the owner.

the result is a detach button whose best-effort fallback (an in-app floating
panel) is the only reliable surface, while the "real window" experience depends
on the environment.

## what the sdk should offer

a window is a first-class, permissioned thing the plugin can spawn through the
host, not through the web layer. one call:

```js
const win = await api.Windows.create({
  id: "nuclear-mini-player",        // unique per plugin
  title: "Nuclear Mini Player",
  width: 430,
  height: 230,
  minWidth: 320,
  minHeight: 180,
  preferAlwaysOnTop: true,          // a wish, not a right (see wayland note)
  persistGeometry: true,            // the host remembers, not the client
  decorate: false,                  // frameless variants welcome
  surface(plugin, win) { ... }      // the plugin renders its own html
});
```

capabilities in sdk version terms:

- created windows are independent web views (tauri `WebviewWindow`), not child
  frames: they survive tab reloads and dark-program crashes of the panel page.
- the host owns the permission model: a plugin must declare an
  `experimental.windows` permission in its manifest and the user gets a prompt
  once. capped at a small number of windows per plugin (2 by default).
- geometry persistence is done by the host (`persistGeometry`), consistent with
  xdg-shell's rule that the client may ask and the compositor and host remember.
- events: `onWindowFocus`, `onWindowClose`, `onMove`, `onResize` as plugin-side
  listeners through the normal sdk event bus.
- cleanup: on `api.Windows.close(id)`, plugin disable, or uninstall, the host
  closes plugin windows. a plugin never leaves orphan windows behind.

## implementation notes (tauri side)

- the rust command holds a registry keyed by plugin id: `plugin_id + window_id`
  so two plugins cannot collide, and queries are scoped.
- creation uses the `WebviewWindowBuilder` with the plugin's own
  `initialization_script` and origin so api calls keep identifying the plugin.
- x11: everything works, including remembered geometry and keep-above
  (the windows can do it themselves; the host just keeps the record).
- wayland: `position` and `always_on_top` are requests the compositor may
  ignore. the host communicates the practical truth back:
  `win.created.flags.alwaysOnTop` reports what was granted, so a plugin can
  adapt rather than assume. geometry persistence is implemented with
  `set_geometry` on the *next* map, not before it.
- flatpak: no portal dance needed - the windows live inside the same sandbox as
  the app itself, which sidesteps the webkitgtk popup mapping problem entirely,
  because the host creates real `xdg-toplevel` windows, not webkit popups.

## migration for the mini player

when `api.Windows.create` is available, the detached mode becomes:

1. ask for the window (with remembered geometry and the always-on-top wish).
2. keep the current probe behavior as a guard for exactly one version, then
   drop it.
3. the in-app floating panel stays as the forever fallback under the
   "in-app floating panel only" setting, since some users want that anyway.

version gate in the plugin: `api.Windows?` feature detection, so one build of
the plugin serves both old and new hosts.
