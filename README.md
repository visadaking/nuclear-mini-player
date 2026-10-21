# Nuclear Mini Player - lyrics and a mini player for Nuclear

a single-file plugin for [Nuclear](https://nuclearplayer.com) that pins a
small player in the corner of the window: artwork, controls, synced
lyrics, and the queue. no build step, no dependencies - just `index.js`
and a `package.json`, loaded straight by Nuclear.

it is the old **Nuclear Lyrics** plugin, renamed and grown up.

## quick start

in Nuclear: **Preferences -> Plugins -> Store**, find **Mini Player**,
**Install**.

building it yourself, or not in your store? add the folder by hand:

1. **Preferences -> Plugins -> Installed -> Add Plugin**
2. pick the folder holding `index.js` + `package.json`

release assets are named `plugin.zip` and hold exactly those two files.

## why a corner panel?

Nuclear shows lyrics in its own page. this is for the other case: a small
player that stays in the corner while you keep doing whatever you were
doing - and pops out into its own window when you want it elsewhere.

## what it does, in plain words

- **a small panel, pinned bottom-right.** artwork, title and artist,
  previous / play / next, mute, lyrics, queue, fullscreen, detach, close.
- **lyrics from 5 sources, in order** - LRCLib, Netease, Kugou, Genius,
  Lyrics.ovh. the first source with a match wins; a source that is down
  is skipped quietly. LRCLib, Netease and Kugou are searched, and only a
  result with the same title and artist counts; synced lyrics are used
  only when their length fits the song, so the timings line up.
- **synced lyrics you can click.** timed lines follow the song; click any
  line to jump straight to it. auto-scroll is a setting.
- **cleaner titles.** for lyric and artwork lookups it strips bracketed
  junk - `feat.`, `ft.`, `official`, `remastered`, `deluxe`, `live`,
  `bonus`, `radio edit`, `version`, `video`, `hq`, `hd`, `audio`,
  `lyrics`, `mv`, `music video`, `visualizer`, `karaoke` - plus anything
  after ` | `, a trailing `- Single` or `- Remastered`, so "Song
  (Remastered 2011)" still finds lyrics. YouTube titles written as
  "Artist - Song" are searched by that artist, not the channel name.
- **it fits your theme.** the accent colour is read from your Nuclear
  theme and watched live, so it follows a theme change.
- **artwork, everywhere it helps.** the current cover glows behind the
  panel and can fill the artwork tile.
- **queue and playlists.** a second panel shows what is coming, jumps to
  any track, removes one, or clears the queue - and browses your
  playlists.
- **system media keys.** through MediaSession: play/pause, next,
  previous, and lockscreen controls.
- **detach into its own window.** pop the player out into a real,
  resizable window that stays in sync with the panel. needs one click -
  windows that open themselves get blocked.
- **fullscreen, copy, refresh.** a big view, copy the lyrics, or refetch
  them.
- **text size.** a setting (12-28 px) plus +/- buttons.
- **5 languages.** English, Español, Français, Русский, Română.

## layout

```
index.js        the whole plugin - player, lyrics, queue, popup, styles
package.json    manifest + Nuclear metadata (displayName, categories)
.github/workflows/release.yml  tag -> plugin.zip, version checked
AGENTS.md       house notes for helpers (humans can ignore it)
docs/REVIEW.md  the checklist every change passes
```

`index.js` is the entire plugin. it exports `onLoad`, `onEnable`,
`onDisable` and injects its own styles at runtime - nothing to build,
nothing to bundle.

## settings

all nine live under the plugin in **Preferences -> Plugins**:

| setting | default | what it does |
|---|---|---|
| Sync theme accent | on | match the accent to Nuclear's theme |
| Ambient artwork glow | on | current artwork glows behind the panel |
| Show artwork background | on | current artwork inside the panel |
| Show queue button | on | show the queue + playlists panel |
| Language | English | interface language |
| Prefer synced lyrics | on | prefer timed lyrics when both exist |
| Auto-scroll lyrics | on | keep the active line in view |
| Clean lyric headers | on | drop common section / credit headers |
| Lyrics font size | 16 px | 12-28 px; also +/- in the panel |

## notes (please read)

- the panel is drawn **inside Nuclear's window**, pinned to the corner.
  it is not a separate always-on-top window - only the detached player is
  its own window.
- **dragging lasts for the session.** move the panel where you like; after
  a reload it returns to its corner. the position is not saved yet.
- **the panel is not hand-resizable.** it widens on its own when you open
  lyrics. only the detached window is resized by dragging its edge.
- **no cover? it asks Apple.** when a track has no artwork the plugin
  looks one up through Apple's iTunes search API (a network call to
  Apple) and caches it. lyrics come from the five sources above.
- **lyrics are best-effort.** public sources, so quality varies and a
  source can go quiet - the plugin just moves to the next.
- **older hosts degrade, not crash.** a missing host HTTP bridge falls
  back to the browser's own `fetch`.
- **it needs a real Nuclear host.** it cannot run under plain node; the
  honest test is loading it in Nuclear.

## credits

thanks to [Naufal48 (@naufaljct48)](https://github.com/naufaljct48) for the
track-change, seek-estimate, lyrics-autoscroll, and lyrics-lookup fixes
that landed in 1.8.3 and remain in 1.8.4.

## version

1.8.4. the plugin store can lag by a release - the registry pins a
version, so it shows the last one submitted there.
