# Nuclear Mini Player

A compact, floating mini player plugin for [Nuclear](https://nuclearplayer.com/) with synced lyrics, queue/playlist controls, and a detachable player surface.

It is designed to stay useful across different Nuclear hosts and environments: when a platform cannot open a real popup window, the plugin falls back to an in-app floating player instead of failing silently.

## Highlights

- **Playback controls:** previous, play/pause, next, seek, and mute/unmute with live progress.
- **Detached player:** pop the mini player out into a separate window when supported; falls back to Picture-in-Picture (where available) or an in-app floating panel when popups are blocked/unavailable.
- **Synced lyrics:** fetches lyrics from multiple providers with automatic fallback (LRCLIB, Netease, Kugou, Genius, OVH), with optional synced/unsynced preference and click-to-seek on timed lines.
- **Queue & playlists:** browse the current queue, jump to tracks, remove items, clear the queue, browse playlists, and queue playlist contents.
- **Mini player UI:** draggable, resizable panel; fullscreen mode; movable queue/playlists panel; artwork-aware styling and optional ambient glow.
- **Theme & media integration:** follows Nuclear accent/theme colors (optional), updates Media Session metadata/state for system media controls where supported.
- **Quality-of-life:** metadata cleanup for cleaner titles/artists, artwork fallback lookup, manual lyric refresh, copy lyrics, adjustable lyric font size, and multiple UI languages.

## Settings

All settings are registered through Nuclear’s Settings API under the **Mini Player** and **Lyrics** categories:

| Setting | Description | Default |
| --- | --- | --- |
| Ambient artwork glow | Use the current artwork behind the mini player. | On |
| Clean lyric headers | Remove common lyric section/credit headers from displayed lyrics. | On |
| Show artwork background | Use the current artwork inside the player background. | On |
| Show queue | Enable the queue/playlists tab. | On |
| Autoscroll lyrics | Keep the active lyric line in view. | On |
| Prefer synced lyrics | Prefer timed lyrics when available. | On |
| Sync with Nuclear theme | Match the mini player accent color to the current Nuclear theme. | On |
| Lyrics font size | Adjust lyric text size. | 16 px |
| Language | UI language (`en`, `es`, `fr`, `ru`, `ro`). | English |

## Nuclear API usage

This plugin uses Nuclear’s plugin APIs with host-tolerant checks/fallbacks where practical:

- **Lifecycle:** `onLoad`, `onEnable`, `onDisable`
- **Settings:** `api.Settings.register/get/set/subscribe`
- **Playback:** `api.Playback.getState/play/pause/toggle/seekTo/previousTrack/nextTrack/subscribe`
- **Queue:** `api.Queue.getQueue/getCurrentItem/addNext/goToIndex/goToPrevious/goToNext/removeByIds` (with fallback to `removeByIndices`), `clearQueue`, and queue subscriptions
- **Events:** `api.Events.on("trackStarted", ...)` when available
- **Playlists:** `api.Playlists.getIndex/getPlaylist/subscribe` when available
- **HTTP:** `api.Http.fetch` for CORS-free external requests (lyrics/artwork providers), with defensive handling for host-specific constraints

The implementation aims to degrade gracefully on older or partially capable hosts instead of crashing.

## Notes

- **Detached player compatibility:** state sync works via `BroadcastChannel` and `window.postMessage`; command handling also accepts opener messages for environments without `BroadcastChannel` support.
- **External lyric/artwork sources:** lyrics are fetched from third-party providers (LRCLIB, Netease, Kugou, Genius via `lyrist.vercel.app`, OVH) and artwork fallback may query iTunes Search. Availability/quality depends on those services.
- **Single-file plugin:** the runtime implementation lives in `index.js` and is shipped with `package.json` (see release workflow).

## Development

- Syntax check: `node --check index.js`
- Package metadata: `package.json` (`name`, `version`, `main`, `nuclear.displayName/categories`)
- Review checklist: [`docs/REVIEW.md`](docs/REVIEW.md)

## Changelog

### 1.9.1 - 2026-11-18

- **Detached player crash hardening:** tightened popup/PiP teardown and state sync to avoid messaging or operating on closing windows, and made detached bridge cleanup more defensive to reduce WebKit instability in Flatpak/Tauri environments.
- **Validation:** `node --check index.js` passes.

### 1.9.0 - 2026-11-18

- **Version & packaging:** bumped release/version metadata to `1.9.0` and refreshed plugin documentation/notes.
- **Detached player reliability:** improved host compatibility by accepting detached-window commands via `window.postMessage` fallback (in addition to `BroadcastChannel`) and keeping detach button state/label in sync with the active detached surface.
- **API/host robustness:** retained defensive `api.*` checks and fallback paths across Settings, Playback, Queue, Events, Playlists, and HTTP integrations; kept DOM-level fallbacks only where the plugin API cannot provide equivalent behavior.
- **Cleanup & maintenance:** aligned user-facing docs with current behavior, clarified runtime notes, and preserved the existing mini player/lyrics/queue feature set while tightening behavior around detach and state sync.
- **Validation:** `node --check index.js` passes.

### 1.8.8

- Improved Flatpak smoothness (lighter ambient blur, one seek command per drag).
- Movable queue/playlists tab; better fullscreen layout/controls handling.
- Playback/UI fixes (mute icon/state, translated labels, safer queue item removal).
- Detached player compatibility improvements for hosts without `BroadcastChannel` and pointer-capture edge cases.

### 1.8.7

- Queue access from the detached player.
- Fixed fullscreen exit and seeking behavior.
- Improved fullscreen + lyrics layout on narrow windows.
