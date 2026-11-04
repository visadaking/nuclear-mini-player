# the mini player on pure wayland with gnome

on gnome there is no per-app window rules gui like kwin has, so the compositor
owning stacking (and forbidding clients from setting always-on-top) is handled
with an extension or by using the app's own fallback.

## the honest reading of it

- gnome will not let the app put itself above everything by design. anything
  that keeps the detached player on top is the extension's doing, not the app's.
- the in-app floating panel (the plugin's own fallback) does not need any of
  this - it lives inside nuclear's own window. choose
  "in-app floating panel only" in the plugin's detached player behavior and you
  skip the whole subject.

## extensions that work for this

- **alwaystop / always on top indicator (justperfection, v caulker)** - puts a
  toggle in the window menu and can remember it per title. with the detached
  popup titled "nuclear mini player" the exception is easy to pin.
- extensions are sandboxed the same way the app is not: install them from
  extensions.gnome.org or the extension manager app, enable once, toggle when
  you detach.

## if you use flatpak

extensions do not care about the app's sandbox. keep the nuclear flatpak
untouched (no overrides) and the plugin's auto probe will fall back to the
in-app panel, which together with an always-on-top toggle on the main window
gives you the same practical result as the kwin rule does on kde.

## what does not work

- telling the window manager to keep it above from inside the app: not allowed
  on wayland, not by gnome, not by any composer of xdg-shell.
- picture-in-picture via document.pictureinpicture: webkitgtk does not
  implement it in nuclear's runtime today. the plugin falls back cleanly.
