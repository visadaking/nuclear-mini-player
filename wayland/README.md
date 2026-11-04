# the detached mini player on linux – wayland, webkitgtk, flatpak

this folder explains why detached popups (`window.open`) are in hell mode on
native wayland with webkitgtk inside flatpak, and gives you the tools for each
way out. the experimental `index.js` on this branch already handles most of it
by itself.

## why it goes wrong

1. **wayland's design.** xdg-shell does not let apps position themselves,
   remember their geometry, or set always-on-top. the compositor takes that
   control and refuses to give it to clients.
2. **webkitgtk inside flatpak often fails to map lean secondary windows.**
   the popup gets created, its dom works, the plugin can write into it, timers
   run, nothing throws... and the compositor still never draws the window. you
   just end up with an invisible or black 430x230 hole on your screen.
3. **it fails silently.** this is the part that hurts: version 1.8.8 tried
   popup, then picture-in-picture, then the in-app floating panel, but the
   popup "succeeded" (no errors) so the fallback never ran.

the experimental branch fixes that directly: after writing the popup surface it
probes `document.visibilityState` and the real viewport for around 0.7 s, and
only accepts the popup when the surface actually became visible. if it did not,
the popup is closed and the in-app floating panel takes over. the result of the
first probe is remembered for the session, so a broken popup is not tried over
and over again.

## three ways out

| what you are on                          | what to do                                                        |
| ---------------------------------------- | ----------------------------------------------------------------- |
| x11, or you accept xwayland for this app | run `./flatpak-x11-override.sh`, or toggle it in flatseal          |
| pure wayland on kde                      | run `./kwin-mini-rules.sh` so kwin keeps the panel above           |
| pure wayland on gnome                    | an always-on-top or picture-in-picture extension, see `gnome-mini-note.md` |

the plugin setting has the same shape:

- **auto** (default): probe the popup once, fall back to the floating panel if
  it never maps. works everywhere.
- **always pop out**: pin this if the xwayland override is on and popouts map
  fine for you.
- **in-app floating panel only**: pin this on pure wayland so the popup probe
  never runs at all.

## how to try it

1. quit nuclear completely.
2. make a version folder next to your current one and copy the two files in:

   ```
   plug=~/.var/app/com.nuclearplayer.Nuclear/data/com.nuclearplayer/plugins/nuclear-mini-player
   mkdir -p "$plug/1.8.9"
   cp index.js package.json "$plug/1.8.9/"
   ```

3. start nuclear, let the plugin load, and pick the behavior you want under
   mini player -> detached player behavior.

if you use the xwayland override, run `./flatpak-x11-override.sh` first and
restart nuclear, otherwise the popup has no x11 to talk to.

## what the scripts do

- `flatpak-x11-override.sh` sets `GDK_BACKEND=x11` for the app at the user
  level, so no sudo is needed:

  ```
  flatpak override --user --env=GDK_BACKEND=x11 com.nuclearplayer.Nuclear
  ```

  `./flatpak-x11-override.sh --undo` removes just that env again,
  `--status` shows what is set.

- `kwin-mini-rules.sh` writes a kwin window rule that forces keep-above on the
  window titled "nuclear mini player" (the popouts and the in-app panel use
  that title; the main window is called plain "nuclear" and is not matched).
  `./kwin-mini-rules.sh --remove` takes the rule away again. after changes
  reload the rules with:

  ```
  qdbus org.kde.KWin /KWin reconfigure
  ```

## the long term fix

fighting `window.open` in webkitgtk is not sustainable. see
`../docs/SDK_MULTIWINDOW_PROPOSAL.md`: it proposes `api.Windows.create` in the
plugin sdk, backed by tauri's rust side, so a plugin can ask for a real player
window with remembered geometry and proper keep-above where the compositor
allows it.

## what this branch does not do

it does not touch pipewire, audio routing or flatpak permissions except the one
environment variable, and it does not fight the compositor on pure wayland.
positioning and stacking is the compositor's call there, by design.
