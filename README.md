# Nuclear Mini Player

Nuclear Lyrics? goodbye, it is time to welcome Nuclear Mini Player.

it is a small floating player for Nuclear, and now it can pop out of the app entirely with the detached player.


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
version 1.9.2 as of 24/11/2026

1.9.2 - fullscreen queue performance fixes, chunked playlist rendering, queue rerender coalescing/scroll preservation

- hardened detached popup/PiP teardown and state sync to avoid messaging or
  interacting with closing windows/contexts (fixes WebKit crashes seen in
  Flatpak/Tauri detached player use)
- made detached bridge cleanup and close flow more defensive
- kept host-tolerant Nuclear API usage and detached fallbacks
  (popup -> Picture-in-Picture -> in-app floating panel)

1.9.0 - improvements and cleanup

- improved detached player compatibility for hosts without BroadcastChannel
  (commands also work via opener window messages)
- detach button now reflects whether the detached player is open
- bumped plugin metadata/docs to 1.9.0 and cleaned up notes/README
- validated with `node --check index.js`
