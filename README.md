# Nuclear Mini Player

Nuclear Lyrics? goodbye, it is time to welcome Nuclear Mini Player.

it is a small floating player for Nuclear, and now it can pop out of the app entirely with the detached player.

### experimental branch (wayland)

this branch (experiment/nuclear-mini-wayland) is about the detached player on linux wayland, where
webkitgtk inside the flatpak often never maps the popup window and always fails silently. here the plugin
probes the popup once, falls back to the in-app floating panel, remembers the verdict for the session, and
ships honest tooling in [wayland/README.md](wayland/README.md) - the flatpak xwayland override, the kwin
keep-above rule, and the gnome note. try it before the next stable release.


Nuclear Mini Player features - 

```
metadata cleaning for cleaner titles (automatically removes feat., official, remastered, etc)

dynamic split layout mode (artwork and lyrics go side-by-side when panel is resized wide)

full theme sync support (miniplayer accent color now matches your Nuclear theme automatically)

added MediaSession support (use your system media keys and lockscreen to control playback)

integrated 5 lyric sources (LRCLib, Netease, Kugou, Genius, OVH) with automatic fallback logic

hover-to-reveal controls (buttons hide to show full artwork until you move your mouse over it)

queue menu dropdown to see and jump to upcoming tracks directly, also reachable from the detached player

playlist browsing with playlist details and add-to-queue

detached player window (pop the player out of Nuclear, falls back to a floating panel when your system blocks popups)

smooth Wayland-optimized dragging logic 

auto-hides the miniplayer when system menus or preferences are open to prevent overlap

added ambient background glow that matches the current track artwork

synced lyrics support (click a line to seek the song instantly)

copy to clipboard and manual refresh buttons

resizable and draggable interface (it stays where you put it)
```

-------------------------------------------------------------
version 1.8.8 beta as of 01/11/2026

1.8.8 beta - flatpak and windows smoothness pass

- fixed the choppy, laggy feel in flatpak: a smaller blur radius on the
  ambient glow (the big blur + will-change combo wrecks software GL),
  and one seek command per drag instead of one per pixel of movement
- the queue and playlists tab is moveable now: grab its header and
  place it anywhere, it stays while the app runs (note: in fullscreen
  it docks to the right edge on purpose)
- fullscreen keeps its header and footer buttons in every case - any
  player drag offset is cleared on the mode change, so ui bits can no
  longer end up offscreen or half missing
- player can no longer be dragged offscreen
- music controls: unmute updates its icon right away, language switch
  translates the play/mute labels too, and removing queue items can
  no longer hit a stale index after the queue changed
- detached player works on webviews without BroadcastChannel as well
  (opener messages), and pointer capture failures no longer kill
  drags on windows
- lockscreen shows the right play state (mediasession playbackstate)
