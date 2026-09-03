// settings.ts
const SETTINGS_IDS = {
  AMBIENT_GLOW: "mp_ambient_glow",
  CLEAN_LYRICS: "mp_clean_lyrics",
  SHOW_BG_COLOR: "mp_show_bg_color",
  SHOW_QUEUE: "mp_show_queue",
  PREFER_SYNCED: "mp_prefer_synced",
  THEME_SYNC: "mp_theme_sync",
  FONT_SIZE: "mp_font_size"
};

let storedApi = null;
let providerId = null;
let unsubscribeEvents = null;
let unsubscribeQueue = null;
let unsubscribePlayback = null;
let panelResizeObserver = null;

// state
const AppState = {
  preferences: {
    ambientGlow: true,
    cleanLyrics: true,
    showBgColor: true,
    showQueue: true,
    preferSynced: true,
    themeSync: true,
    fontSize: 16
  },
  abortController: null,
  hasSyncedTimestamps: false,
  parsedLyrics: [],
  currentLyricText: "Waiting for playback...",
  currentTrackKey: "",
  playbackStatus: "playing",
  lastArtist: "",
  lastTitle: "",
  lastTrack: null,
  lastTrackArt: null,
  isUserSeeking: false,
  isUserChangingVolume: false,
  isSettingsOpen: false,
  isLyricsExpanded: false,
  isQueueOpen: false,
  isFullscreen: false
};

// wayland drag state
let drag = { isDragging: false, startX: 0, startY: 0, translateX: 0, translateY: 0, rafId: null };

let playbackInterval = null;
let settingsObserver = null;
let escapeListener = null;

// icons
const ICONS = {
  queue: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  lyrics: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  settings: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  refresh: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  fullscreen: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
  close: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  play: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  prev: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" stroke-width="3"/></svg>`,
  next: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="3"/></svg>`,
  volHigh: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  volMute: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
};

// http fetch helper
async function httpFetch(url, options = {}) {
  if (storedApi?.Http?.fetch) {
    try {
      const tauriOptions = { ...options };
      delete tauriOptions.signal; // Strip AbortSignal for Tauri compatibility
      return await storedApi.Http.fetch(url, tauriOptions);
    } catch (_) {}
  }
  return await fetch(url, options);
}

// utilities
function cleanMetadataString(str) {
  return (str || "").replace(/\s*[\(\[](feat|ft|official|remastered|deluxe|live|bonus|version|video|hq|hd|audio)[^\)\]]*[\)\]]/gi, "").replace(/ - Single/gi, "").replace(/\s+/g, " ").trim();
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60), secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function getAudioElement() {
  return document.querySelector("audio") || document.querySelector("video");
}

function isSystemMenuOpen() {
  const headers = Array.from(document.querySelectorAll('h1, h2, h3, .header')).map(el => el.textContent?.trim().toLowerCase());
  const menuKeywords = ["plugins", "general", "key shortcuts", "themes", "logs", "what's new", "preferences"];
  return headers.some(text => menuKeywords.includes(text));
}

function resetPanelPosition() {
  const panel = document.getElementById("nuke-mp-panel");
  if (!panel) return;
  drag.translateX = 0; drag.translateY = 0;
  panel.style.transform = 'none';
}

function normalizeNuclearTrack(rawTrack) {
  if (!rawTrack) {
    return { artist: "Unknown Artist", title: "Unknown Track", cleanArtist: "", cleanTitle: "", duration: 0, artwork: null };
  }

  const track = rawTrack.track || rawTrack;
  let title = (track.title || track.name || "").trim();
  let artist = "";

  if (typeof track.artist === "string" && track.artist.trim()) {
    artist = track.artist.trim();
  } else if (track.artist && typeof track.artist.name === "string") {
    artist = track.artist.name.trim();
  } else if (Array.isArray(track.artists) && track.artists.length > 0) {
    artist = track.artists.map(a => (typeof a === "string" ? a : a?.name)).filter(Boolean).join(", ");
  } else if (typeof track.albumArtist === "string" && track.albumArtist.trim()) {
    artist = track.albumArtist.trim();
  } else if (typeof track.channel === "string" && track.channel.trim()) {
    artist = track.channel.trim();
  }

  if ((!artist || artist === "Unknown Artist") && title.includes(" - ")) {
    const parts = title.split(" - ");
    artist = parts[0].trim();
    title = parts.slice(1).join(" - ").trim();
  }

  if (artist && title.toLowerCase().startsWith(artist.toLowerCase() + " - ")) {
    title = title.substring(artist.length + 3).trim();
  }

  let artwork = track?.artwork?.large || track?.artwork?.medium || track?.artwork?.small ||
  track?.thumbnail || track?.cover || track?.album?.cover ||
  track?.album?.images?.[0]?.url || track?.image || track?.img || null;

  if (typeof artwork !== "string" || artwork.includes("data:image/svg")) {
    artwork = null;
  }

  const duration = track.duration || track.length || 0;

  return {
    artist: artist || "Unknown Artist",
    title: title || "Unknown Track",
    cleanArtist: cleanMetadataString(artist),
    cleanTitle: cleanMetadataString(title),
    duration,
    artwork,
    raw: track
  };
}

// artwork cache
class ArtworkCacheManager {
  constructor(maxSize = 100) { this.cache = new Map(); this.maxSize = maxSize; }
  get(key) { return this.cache.get(key) || null; }
  set(key, url) {
    if (!key || !url) return;
    if (this.cache.size >= this.maxSize) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, url);
  }
  async resolveArtwork(normalizedTrack) {
    const { artist, title, artwork } = normalizedTrack;
    const key = `${artist}:::${title}`.toLowerCase();
    const cached = this.get(key);
    if (cached) return cached;

    if (artwork) {
      this.set(key, artwork);
      return artwork;
    }

    try {
      const query = encodeURIComponent(`${cleanMetadataString(artist)} ${cleanMetadataString(title)}`);
      const itunesRes = await httpFetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
      if (itunesRes.ok) {
        const data = await itunesRes.json();
        if (data.results?.[0]?.artworkUrl100) {
          const highResArt = data.results[0].artworkUrl100.replace("100x100bb", "600x600bb");
          this.set(key, highResArt);
          return highResArt;
        }
      }
    } catch (_) {}
    return null;
  }
}
const ArtworkCache = new ArtworkCacheManager();

// theme manager
class ThemeManager {
  constructor() { this.callbacks = new Set(); this.currentAccent = "#1ed760"; }
  init() {
    this.detectTheme();
    this.observer = new MutationObserver(() => this.detectTheme());
    this.observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    this.observer.observe(document.body, { attributes: true, attributeFilter: ["class", "style"] });
  }
  detectTheme() {
    if (!AppState.preferences.themeSync) return;
    const computed = window.getComputedStyle(document.documentElement);
    const color = computed.getPropertyValue("--primary-color").trim() || computed.getPropertyValue("--color-primary").trim() || "#1ed760";
    if (color && color !== this.currentAccent) {
      this.currentAccent = color;
      this.callbacks.forEach(cb => cb(this.currentAccent));
    }
  }
  onThemeChange(cb) { this.callbacks.add(cb); }
  destroy() { if (this.observer) this.observer.disconnect(); this.callbacks.clear(); }
}
const Theme = new ThemeManager();

// mediasession mpris
function updateMediaSession(artist, title, artUrl) {
  if (!('mediaSession' in navigator)) return;

  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title || "Nuclear Music Player",
      artist: artist || "Unknown Artist",
      album: "Nuclear",
      artwork: artUrl ? [{ src: artUrl, sizes: '512x512', type: 'image/jpeg' }] : []
    });

    navigator.mediaSession.setActionHandler('play', () => {
      if (storedApi?.Playback?.play) storedApi.Playback.play();
      else { const a = getAudioElement(); if (a) a.play(); }
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      if (storedApi?.Playback?.pause) storedApi.Playback.pause();
      else { const a = getAudioElement(); if (a) a.pause(); }
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => storedApi?.Playback?.previousTrack?.());
    navigator.mediaSession.setActionHandler('nexttrack', () => storedApi?.Playback?.nextTrack?.());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (storedApi?.Playback?.seekTo && details.seekTime !== undefined) {
        storedApi.Playback.seekTo(details.seekTime);
      } else {
        const a = getAudioElement();
        if (a && details.seekTime !== undefined) a.currentTime = details.seekTime;
      }
    });
  } catch (_) {}
}

// lyrics fetchers
const Fetchers = {
  lrclib: async (artist, title, signal) => {
    try {
      const strict = new URLSearchParams({ artist_name: artist, track_name: title });
      let res = await httpFetch(`https://lrclib.net/api/get?${strict}`, { signal });
      if (res.ok) {
        const data = await res.json();
        const lyrics = AppState.preferences.preferSynced ? (data.syncedLyrics || data.plainLyrics) : (data.plainLyrics || data.syncedLyrics);
        if (lyrics) return { lyrics, source: "lrclib", isSynced: !!data.syncedLyrics };
      }
    } catch (_) {} return null;
  },

  netease: async (artist, title, signal) => {
    try {
      const query = encodeURIComponent(`${artist} ${title}`);
      const searchRes = await httpFetch(`https://music.163.com/api/search/get/web?csrf_token=type=1&offset=0&total=true&limit=3&s=${query}`, { signal });
      if (!searchRes.ok) return null;
      const data = await searchRes.json();
      if (!data?.result?.songs?.length) return null;
      const lrcRes = await httpFetch(`https://music.163.com/api/song/lyric?os=pc&id=${data.result.songs[0].id}&lv=-1&kv=-1&tv=-1`, { signal });
      const lyricText = (await lrcRes.json())?.lrc?.lyric;
      if (lyricText && !lyricText.includes("纯音乐")) return { lyrics: lyricText, source: "netease", isSynced: true };
    } catch (_) {} return null;
  },

  kugou: async (artist, title, signal) => {
    try {
      const query = encodeURIComponent(`${artist} - ${title}`);
      const res = await httpFetch(`https://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${query}&duration=&hash=`, { signal });
      if (res.ok) {
        const data = await res.json();
        if (data?.candidates?.[0]) {
          const id = data.candidates[0].id, accesskey = data.candidates[0].accesskey;
          const lrcRes = await httpFetch(`https://lyrics.kugou.com/download?ver=1&client=pc&id=${id}&accesskey=${accesskey}&fmt=lrc&charset=utf8`, { signal });
          const lrcData = await lrcRes.json();
          if (lrcData?.content) {
            const decoded = atob(lrcData.content);
            if (decoded) return { lyrics: decoded, source: "kugou", isSynced: true };
          }
        }
      }
    } catch (_) {} return null;
  },

  genius: async (artist, title, signal) => {
    try {
      const res = await httpFetch(`https://lyrist.vercel.app/api/${encodeURIComponent(title)}/${encodeURIComponent(artist)}`, { signal });
      if (res.ok) {
        const data = await res.json();
        if (data?.lyrics) return { lyrics: data.lyrics, source: "genius", isSynced: false };
      }
    } catch (_) {} return null;
  },

  ovh: async (artist, title, signal) => {
    try {
      const res = await httpFetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`, { signal });
      const data = await res.json();
      if (data?.lyrics) return { lyrics: data.lyrics, source: "lyrics.ovh", isSynced: false };
    } catch (_) {} return null;
  }
};

async function fetchLyrics(artist, title) {
  if (AppState.abortController) AppState.abortController.abort();
  AppState.abortController = new AbortController();
  const { signal } = AppState.abortController;

  updateLyricsUI(title, "searching lyrics...");

  const cA = cleanMetadataString(artist);
  const cT = cleanMetadataString(title);

  const primaryKey = AppState.preferences.primarySource || "lrclib";
  const providerOrder = [primaryKey];

  if (AppState.preferences.enableFallbacks) {
    Object.keys(Fetchers).forEach(key => {
      if (key !== primaryKey) providerOrder.push(key);
    });
  }

  try {
    let bestResult = null;

    for (const key of providerOrder) {
      if (signal.aborted) return;
      const fetcher = Fetchers[key];
      if (!fetcher) continue;

      const result = await fetcher(cA, cT, signal);
      if (result && result.lyrics) {
        if (result.isSynced && AppState.preferences.preferSynced) {
          bestResult = result;
          break;
        }
        if (!bestResult) bestResult = result;
      }
    }

    if (signal.aborted) return;

    if (bestResult?.lyrics) {
      updateLyricsUI(title, bestResult.lyrics, bestResult.source);
    } else {
      updateLyricsUI(title, "no lyrics found.");
    }
  } catch (e) {
    if (e.name !== "AbortError") {
      updateLyricsUI(title, "lyrics service unavailable.");
    }
  }
}

function cleanLyricsText(rawText) {
  if (!rawText) return "";
  if (!AppState.preferences.cleanLyrics) return rawText;

  return rawText
  .replace(/^\[(Verse|Chorus|Bridge|Outro|Intro|Hook|Pre-Chorus)[^\]]*\]$/gim, "")
  .replace(/^.*by.*lyrics.*$/gim, "")
  .replace(/\n{3,}/g, "\n\n")
  .trim();
}

function parseLrc(raw) {
  const cleaned = cleanLyricsText(raw);
  if (!cleaned) return [];
  AppState.hasSyncedTimestamps = false;
  AppState.parsedLyrics = [];

  const lines = cleaned.split(/\r?\n/);
  const regex = /\[(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?\]/g;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^\[(ar|ti|al|au|length|by|offset|re|ve):/i.test(trimmed)) return;

    let match;
    const timestamps = [];
    const text = trimmed.replace(/\[.*?\]/g, "").trim();

    regex.lastIndex = 0;
    while ((match = regex.exec(trimmed)) !== null) {
      const mins = parseInt(match[1], 10);
      const secs = parseInt(match[2], 10);
      const msStr = match[3] ? match[3].padEnd(3, '0').slice(0, 3) : "0";
      const ms = parseInt(msStr, 10);
      timestamps.push(mins * 60 + secs + ms / 1000);
      AppState.hasSyncedTimestamps = true;
    }

    if (timestamps.length > 0) {
      timestamps.forEach(time => AppState.parsedLyrics.push({ time, text: text || "♪" }));
    } else if (text) {
      AppState.parsedLyrics.push({ time: -1, text });
    } else if (AppState.parsedLyrics.length > 0 && !AppState.parsedLyrics[AppState.parsedLyrics.length - 1].spacer) {
      AppState.parsedLyrics.push({ time: -1, text: "", spacer: true });
    }
  });

  return AppState.parsedLyrics.sort((a, b) => a.time - b.time);
}

async function handleTrackChange(api, rawTrack) {
  const norm = normalizeNuclearTrack(rawTrack);
  if (!norm || !norm.title) {
    AppState.lastTitle = "";
    return;
  }
  const key = `${norm.artist} - ${norm.title}`;
  if (key === AppState.currentTrackKey) return;
  AppState.currentTrackKey = key;
  AppState.lastArtist = norm.artist;
  AppState.lastTitle = norm.title;
  AppState.lastTrack = norm.raw;

  await syncSettings(api);
  updateMiniPlayerMeta(norm);
  fetchLyrics(norm.artist, norm.title);
}

// ui styles & injection
function injectStyles() {
  if (document.getElementById("nuke-mp-styles")) return;
  const style = document.createElement("style");
  style.id = "nuke-mp-styles";
  style.innerHTML = `
  :root { --nuke-mp-accent: #1ed760; }

  #nuke-mp-panel {
  position: fixed; bottom: 95px; right: 25px;
  width: clamp(340px, 30vw, 480px);
  height: 360px;
  min-width: 320px; min-height: 280px;
  max-width: calc(100vw - 32px); max-height: calc(100vh - 32px);
  resize: horizontal; overflow: hidden;
  background: rgba(18, 18, 18, 0.45); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85); color: #fff;
  display: flex; flex-direction: column; z-index: 99999; contain: layout style; touch-action: none;
  transition: height 0.3s cubic-bezier(0.2,0.8,0.2,1), width 0.3s cubic-bezier(0.2,0.8,0.2,1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  user-select: none;
  }

  #nuke-mp-panel.lyrics-expanded { height: 580px; resize: both; }

  #nuke-mp-panel::before {
  content: "";
  position: absolute; inset: 0;
  background-image: var(--nuke-mp-art-url, none);
  background-size: cover; background-position: center;
  filter: blur(40px) brightness(0.35) saturate(1.4);
  z-index: -1; pointer-events: none;
  transition: background-image 0.5s ease;
  will-change: background-image;
  }

  #nuke-mp-panel.fullscreen-mode {
  top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
  width: 100vw !important; height: 100vh !important; max-width: 100vw !important; max-height: 100vh !important;
  border-radius: 0 !important; border: none !important; transform: none !important; resize: none !important;
  display: flex; flex-direction: row;
  }

  @media (min-aspect-ratio: 16/9) {
    #nuke-mp-panel.fullscreen-mode .nuke-native-card {
    width: 45vw !important; height: 100vh !important;
    background: transparent !important;
    }
    #nuke-mp-panel.fullscreen-mode #nuke-mp-lyrics-container {
    display: flex !important; flex: 1 !important; height: 100vh !important;
    background: transparent !important; padding: 40px 8vw;
    }
  }

  /* Split layout on wider resizing (Image Side-by-Side Mode) */
  #nuke-mp-panel.split-layout {
  flex-direction: row !important;
  width: 680px;
  height: 360px !important;
  resize: both;
  }
  #nuke-mp-panel.split-layout.lyrics-expanded {
  height: 360px !important;
  }
  #nuke-mp-panel.split-layout .nuke-native-card {
  width: 320px !important;
  height: 100% !important;
  flex-shrink: 0;
  background: transparent !important;
  }
  #nuke-mp-panel.split-layout #nuke-mp-lyrics-container {
  display: flex !important;
  flex: 1 !important;
  height: 100% !important;
  min-height: unset !important;
  background: transparent !important;
  border-left: 1px solid rgba(255,255,255,0.08);
  }

  .nuke-native-card {
    position: relative; width: 100%; height: 360px;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 16px; box-sizing: border-box; overflow: hidden; flex-shrink: 0;
  }

  /* Transparent Artwork Wallpaper Background */
  .nuke-art-backdrop {
    position: absolute; top: 0; left: 0; right: 0; bottom: 65px;
    background-size: cover; background-position: center;
    z-index: 1; overflow: hidden;
  }

  /* Hover-Only Overlay */
  .nuke-art-overlay {
    position: absolute; inset: 0; background: rgba(0, 0, 0, 0.65);
    display: flex; flex-direction: column; justify-content: space-between; padding: 16px;
    backdrop-filter: blur(8px); opacity: 0; pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .nuke-card-header {
    display: flex; justify-content: space-between; align-items: center; z-index: 2; color: #fff;
    opacity: 0; pointer-events: none; transform: translateY(-5px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  /* Reveal settings & controls ONLY on hover over picture */
  .nuke-native-card:hover .nuke-art-overlay,
  .nuke-native-card:hover .nuke-card-header,
  #nuke-mp-panel.settings-active .nuke-art-overlay,
  #nuke-mp-panel.settings-active .nuke-card-header,
  #nuke-mp-panel.queue-active .nuke-art-overlay,
  #nuke-mp-panel.queue-active .nuke-card-header {
  opacity: 1; pointer-events: auto; transform: translateY(0);
  }

  .nuke-card-meta { text-align: center; color: #fff; margin-bottom: 8px; }
  .nuke-card-title { font-size: 16px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nuke-card-artist { font-size: 12px; color: rgba(255,255,255,0.8); }

  .nuke-center-controls {
    display: flex; align-items: center; justify-content: center; gap: 12px; z-index: 3;
  }

  .nuke-btn-play-circle {
    width: 48px; height: 48px; border-radius: 50%; background: #ffffff; color: #000;
    display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;
    box-shadow: 0 4px 14px rgba(0,0,0,0.5); transition: transform 0.15s;
  }
  .nuke-btn-play-circle:hover { transform: scale(1.08); background: #f0f0f0; }

  .nuke-btn-icon-card {
    background: transparent; border: none; color: #ffffff; cursor: pointer;
    padding: 6px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    transition: transform 0.15s, opacity 0.15s; opacity: 0.85;
  }
  .nuke-btn-icon-card:hover { opacity: 1; transform: scale(1.1); }
  .nuke-btn-icon-card.disabled { opacity: 0.35 !important; cursor: not-allowed !important; pointer-events: none !important; }

  /* Transport Bar at Bottom */
  .nuke-bottom-progress-container {
    position: absolute; bottom: 12px; left: 12px; right: 12px;
    display: flex; flex-direction: column; gap: 6px; z-index: 4;
  }
  .nuke-timestamps-row {
    display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.9);
  }

  .nuke-slider {
    width: 100%; -webkit-appearance: none; appearance: none;
    height: 4px; border-radius: 2px;
    background: rgba(255, 255, 255, 0.15);
    outline: none; cursor: pointer;
  }
  .nuke-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 10px; height: 10px; border-radius: 50%; background: #fff; cursor: pointer;
  }

  /* Miniplayer Settings Screen (Spacious & Clean) */
  #nuke-mp-settings-view {
  position: absolute; inset: 0; background: rgba(18, 14, 28, 0.98);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  padding: 24px; display: flex; flex-direction: column; justify-content: space-between;
  z-index: 50; box-sizing: border-box; overflow-y: auto;
  }
  .nuke-settings-title { font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 16px; }
  .nuke-setting-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; color: #fff; font-size: 14px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.05); }

  .nuke-switch-bg {
    width: 42px; height: 24px; border-radius: 12px; position: relative; cursor: pointer; transition: background 0.2s;
  }
  .nuke-switch-knob {
    width: 20px; height: 20px; background: #fff; border-radius: 50%; position: absolute; top: 2px; transition: left 0.2s;
  }

  .nuke-btn-done {
    margin-top: 24px; align-self: center; padding: 10px 48px; border-radius: 20px;
    background: var(--nuke-mp-accent); color: #000; font-weight: 800; font-size: 14px; border: none; cursor: pointer;
    box-shadow: 0 4px 16px rgba(30, 215, 96, 0.4); transition: transform 0.15s, background 0.15s; flex-shrink: 0;
  }
  .nuke-btn-done:hover { transform: scale(1.05); }

  /* Lyrics Expansion Drawer */
  #nuke-mp-lyrics-container {
  position: relative; z-index: 10; background: transparent !important; flex: 1;
  overflow-y: auto; padding: 16px 20px; scroll-behavior: smooth; display: flex; flex-direction: column; align-items: center;
  min-height: 200px;
  }
  .nuke-lyrics-toolbar {
    display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 600px;
    margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .nuke-source-badge { font-size: 11px; color: var(--nuke-mp-accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; }
  .nuke-toolbar-actions { display: flex; gap: 8px; align-items: center; }

  .lyric-line {
    color: rgba(255,255,255,0.4); font-size: 16px; font-weight: 600; line-height: 1.5; padding: 8px 12px; text-align: center; cursor: pointer; border-radius: 8px; transition: 0.25s cubic-bezier(0.2,0.8,0.2,1); width: 100%; max-width: 600px;
    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  }
  .lyric-line:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); }
  .lyric-line.active { color: var(--nuke-mp-accent) !important; font-size: 1.15em; font-weight: 800; transform: scale(1.03); background: rgba(255,255,255,0.06); text-shadow: 0 0 12px rgba(30,215,96,0.3), 0 1px 4px rgba(0,0,0,0.6); }
  .lyric-line.unsynced { color: #e0e0e0; cursor: default; }
  .lyric-line.spacer { height: 1.2em; cursor: default; }

  #nuke-mp-queue-dropdown { position: absolute; top: 40px; left: 8px; right: 8px; bottom: 8px; background: rgba(20, 20, 20, 0.98); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; z-index: 100; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.85); }
  .nuke-queue-header { padding: 10px 14px; font-weight: 700; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; }
  .nuke-queue-list { flex: 1; overflow-y: auto; list-style: none; margin: 0; padding: 0; }
  .nuke-queue-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.03); }
  .nuke-queue-item:hover { background: rgba(255,255,255,0.06); }
  .nuke-queue-item.active { background: rgba(255,255,255,0.08); color: var(--nuke-mp-accent); }
  `;
  document.head.appendChild(style);
}

function injectUI() {
  if (document.getElementById("nuke-mp-panel")) return;
  injectStyles();
  const panel = document.createElement("div");
  panel.id = "nuke-mp-panel";

  panel.innerHTML = `
  <!-- Main Card View -->
  <div class="nuke-native-card" id="nuke-mp-card-view">
  <div class="nuke-art-backdrop" id="nuke-mp-art-bg">
  <div class="nuke-art-overlay">
  <!-- Header Bar -->
  <div class="nuke-card-header" id="nuke-mp-header">
  <span style="font-size: 12px; font-weight: 800; color: var(--nuke-mp-accent); letter-spacing: 0.5px;">nuclear | player</span>
  <div style="display: flex; gap: 2px;">
  <button class="nuke-btn-icon-card" id="nuke-btn-fullscreen" title="fullscreen">${ICONS.fullscreen}</button>
  <button class="nuke-btn-icon-card" id="nuke-btn-settings-view" title="settings">${ICONS.settings}</button>
  <button class="nuke-btn-icon-card" id="nuke-btn-lyrics-toggle" title="lyrics">${ICONS.lyrics}</button>
  <button class="nuke-btn-icon-card" id="nuke-btn-close" title="close">${ICONS.close}</button>
  </div>
  </div>

  <!-- Metadata -->
  <div class="nuke-card-meta">
  <div class="nuke-card-title" id="nuke-mp-title">waiting for track...</div>
  <div class="nuke-card-artist" id="nuke-mp-artist">no artist</div>
  </div>

  <!-- Controls Over Art -->
  <div class="nuke-center-controls">
  <button class="nuke-btn-icon-card" id="nuke-ctrl-vol" title="mute/unmute">${ICONS.volHigh}</button>
  <button class="nuke-btn-icon-card" id="nuke-ctrl-prev" title="previous">${ICONS.prev}</button>
  <button class="nuke-btn-play-circle" id="nuke-ctrl-play" title="play/pause">${ICONS.play}</button>
  <button class="nuke-btn-icon-card" id="nuke-ctrl-next" title="next">${ICONS.next}</button>
  <button class="nuke-btn-icon-card" id="nuke-ctrl-queue" title="queue">${ICONS.queue}</button>
  </div>
  </div>
  </div>

  <!-- Timestamps & Progress Transport Bar -->
  <div class="nuke-bottom-progress-container">
  <div class="nuke-timestamps-row">
  <span id="nuke-time-current">0:00</span>
  <span id="nuke-time-total">0:00</span>
  </div>
  <input type="range" class="nuke-slider" id="nuke-seek-bar" min="0" max="100" value="0" step="0.1" />
  </div>
  </div>

  <!-- Miniplayer Settings View -->
  <div id="nuke-mp-settings-view" style="display: none;">
  <div>
  <div class="nuke-settings-title">Miniplayer settings</div>

  <div class="nuke-setting-row">
  <span>Background Glow (Better Lyrics)</span>
  <div class="nuke-switch-bg" id="nuke-sw-glow" style="background: #1ed760;">
  <div class="nuke-switch-knob" style="left: 20px;"></div>
  </div>
  </div>

  <div class="nuke-setting-row">
  <span>Clean Lyrics Headers</span>
  <div class="nuke-switch-bg" id="nuke-sw-clean" style="background: #1ed760;">
  <div class="nuke-switch-knob" style="left: 20px;"></div>
  </div>
  </div>

  <div class="nuke-setting-row">
  <span>Queue Menu</span>
  <div class="nuke-switch-bg" id="nuke-sw-queue" style="background: #1ed760;">
  <div class="nuke-switch-knob" style="left: 20px;"></div>
  </div>
  </div>

  <div class="nuke-setting-row">
  <span>Synced Lyrics</span>
  <div class="nuke-switch-bg" id="nuke-sw-synced" style="background: #1ed760;">
  <div class="nuke-switch-knob" style="left: 20px;"></div>
  </div>
  </div>
  </div>

  <!-- Green Done Button -->
  <button class="nuke-btn-done" id="nuke-btn-done">Done</button>
  </div>

  <!-- Lyrics Drawer Expand View -->
  <div id="nuke-mp-lyrics-container" style="display: none;">
  <div class="nuke-lyrics-toolbar">
  <span class="nuke-source-badge" id="nuke-source-badge">source: lrclib</span>
  <div class="nuke-toolbar-actions">
  <button class="nuke-btn-icon-card" id="nuke-btn-font-dec" title="smaller font" style="font-size:12px; font-weight:800;">A-</button>
  <button class="nuke-btn-icon-card" id="nuke-btn-font-inc" title="larger font" style="font-size:14px; font-weight:800;">A+</button>
  <button class="nuke-btn-icon-card" id="nuke-btn-copy" title="copy lyrics">${ICONS.copy}</button>
  <button class="nuke-btn-icon-card" id="nuke-btn-refresh" title="refresh lyrics">${ICONS.refresh}</button>
  </div>
  </div>
  <div id="nuke-lyrics-body" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
  <div style="color: #666; margin-top: 30px;">play a song to view lyrics</div>
  </div>
  </div>

  <!-- Queue Dropdown Overlay -->
  <div id="nuke-mp-queue-dropdown" style="display: none;">
  <div class="nuke-queue-header">
  <span>up next</span>
  <button class="nuke-btn-icon-card" id="nuke-queue-close">${ICONS.close}</button>
  </div>
  <ul class="nuke-queue-list" id="nuke-queue-items-container"></ul>
  </div>
  `;

  document.body.appendChild(panel);
  attachPanelEventListeners(panel);
  startSyncedPlaybackTracker();
}

async function updateMiniPlayerMeta(normalizedTrack) {
  const { artist, title } = normalizedTrack;
  document.getElementById("nuke-mp-title").innerText = title || "unknown title";
  document.getElementById("nuke-mp-artist").innerText = artist || "unknown artist";

  const artUrl = await ArtworkCache.resolveArtwork(normalizedTrack);
  if (artUrl) {
    document.getElementById("nuke-mp-art-bg").style.backgroundImage = `url(${artUrl})`;
    AppState.lastTrackArt = artUrl;
    if (AppState.preferences.ambientGlow) {
      document.getElementById("nuke-mp-panel")?.style.setProperty("--nuke-mp-art-url", `url(${artUrl})`);
    } else {
      document.getElementById("nuke-mp-panel")?.style.setProperty("--nuke-mp-art-url", "none");
    }
    updateMediaSession(artist, title, artUrl);
  }
}

function updateLyricsUI(title, lrcText, sourceName = "") {
  const body = document.getElementById("nuke-lyrics-body");
  const badge = document.getElementById("nuke-source-badge");
  if (!body) return;

  if (badge) badge.innerText = sourceName ? `source: ${sourceName}` : "";

  body.innerHTML = "";
  parseLrc(lrcText);

  if (AppState.parsedLyrics.length === 0) {
    body.innerHTML = `<div style="color: #777; margin-top: 40px; font-weight:600;">no lyrics available</div>`;
    AppState.currentLyricText = "No lyrics available";
    return;
  }

  AppState.parsedLyrics.forEach((line) => {
    const lineEl = document.createElement("div");
    if (line.spacer) { lineEl.className = "lyric-line spacer"; lineEl.innerHTML = "&nbsp;"; body.appendChild(lineEl); return; }
    lineEl.className = "lyric-line" + (AppState.hasSyncedTimestamps ? "" : " unsynced");
    lineEl.innerText = line.text;
    lineEl.style.fontSize = `${AppState.preferences.fontSize}px`;

    if (AppState.hasSyncedTimestamps && line.time >= 0) {
      lineEl.addEventListener("click", () => {
        if (storedApi?.Playback?.seekTo) {
          storedApi.Playback.seekTo(line.time);
        } else {
          const a = getAudioElement(); if (a) a.currentTime = line.time;
        }
      });
    }
    body.appendChild(lineEl);
  });
}

function updateSliderBackground(slider) {
  if (!slider) return;
  const val = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, var(--nuke-mp-accent) 0%, var(--nuke-mp-accent) ${val}%, rgba(255,255,255,0.2) ${val}%)`;
}

function attachPanelEventListeners(panel) {
  // grabbing and dragging
  panel.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button") || e.target.closest("input") || e.target.closest("select") || e.target.closest(".lyric-line") || e.target.closest("#nuke-mp-queue-dropdown") || e.target.closest("#nuke-mp-settings-view")) {
      return;
    }

    // pls ignore dragging near resize handle (bottom-right 20px) to let native CSS resizing work
    const rect = panel.getBoundingClientRect();
    const isNearResizeHandle = (e.clientX > rect.right - 20) && (e.clientY > rect.bottom - 20);
    if (isNearResizeHandle) return;

    drag.isDragging = true;
    drag.startX = e.clientX - drag.translateX;
    drag.startY = e.clientY - drag.translateY;
    try { panel.setPointerCapture(e.pointerId); } catch (_) {}
  });

  panel.addEventListener("pointermove", (e) => {
    if (!drag.isDragging) return;
    drag.translateX = e.clientX - drag.startX;
    drag.translateY = e.clientY - drag.startY;
    if (!drag.rafId) drag.rafId = requestAnimationFrame(() => {
      panel.style.transform = `translate3d(${drag.translateX}px, ${drag.translateY}px, 0)`;
      drag.rafId = null;
    });
  });

  const stopDrag = (e) => {
    if (drag.isDragging) {
      drag.isDragging = false;
      try { panel.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };
  panel.addEventListener("pointerup", stopDrag);
  panel.addEventListener("pointercancel", stopDrag);

  // splitting the ResizeObserver to make room for artwork on resize (yes, i had to write this for some reason?)
  if (window.ResizeObserver) {
    panelResizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        if (width >= 550) {
          panel.classList.add("split-layout");
        } else {
          panel.classList.remove("split-layout");
        }
      }
    });
    panelResizeObserver.observe(panel);
  }

  // playback controls
  document.getElementById("nuke-ctrl-play").addEventListener("click", () => {
    if (storedApi?.Playback?.toggle) {
      storedApi.Playback.toggle();
    } else {
      const a = getAudioElement(); if (a) a.paused ? a.play() : a.pause();
    }
  });
  document.getElementById("nuke-ctrl-prev").addEventListener("click", () => storedApi?.Playback?.previousTrack?.());
  document.getElementById("nuke-ctrl-next").addEventListener("click", () => storedApi?.Playback?.nextTrack?.());

  // mute Toggle
  let lastVol = 1;
  document.getElementById("nuke-ctrl-vol").addEventListener("click", () => {
    const a = getAudioElement(); if (!a) return;
    if (a.volume > 0) { lastVol = a.volume; a.volume = 0; }
    else { a.volume = lastVol || 0.8; }
    document.getElementById("nuke-ctrl-vol").innerHTML = a.volume === 0 ? ICONS.volMute : ICONS.volHigh;
  });

  // seekbar
  const seekBar = document.getElementById("nuke-seek-bar");
  seekBar.addEventListener("pointerdown", () => AppState.isUserSeeking = true);
  seekBar.addEventListener("input", () => {
    updateSliderBackground(seekBar);
    const targetTime = (seekBar.value / 100) * (getAudioElement()?.duration || 0);
    if (storedApi?.Playback?.seekTo) {
      storedApi.Playback.seekTo(targetTime);
    } else {
      const a = getAudioElement(); if (a) a.currentTime = targetTime;
    }
  });
  seekBar.addEventListener("pointerup", () => AppState.isUserSeeking = false);

  // fullscreen
  document.getElementById("nuke-btn-fullscreen").addEventListener("click", () => {
    AppState.isFullscreen = !AppState.isFullscreen;
    panel.classList.toggle("fullscreen-mode", AppState.isFullscreen);
  });

  // settings
  const settingsView = document.getElementById("nuke-mp-settings-view");
  document.getElementById("nuke-btn-settings-view").addEventListener("click", () => {
    AppState.isSettingsOpen = true;
    panel.classList.add("settings-active");
    settingsView.style.display = "flex";
  });

  // Done Button
  document.getElementById("nuke-btn-done").addEventListener("click", () => {
    AppState.isSettingsOpen = false;
    panel.classList.remove("settings-active");
    settingsView.style.display = "none";
  });

  // Settings Switches
  const setupSwitch = (elemId, initialVal, onToggle) => {
    const sw = document.getElementById(elemId);
    if (!sw) return;
    let isVal = initialVal;
    const updateSwitchUI = (val) => {
      sw.style.background = val ? "var(--nuke-mp-accent)" : "#444";
      sw.querySelector(".nuke-switch-knob").style.left = val ? "20px" : "2px";
    };
    updateSwitchUI(isVal);
    sw.addEventListener("click", () => {
      isVal = !isVal;
      updateSwitchUI(isVal);
      onToggle(isVal);
    });
  };

  setupSwitch("nuke-sw-glow", AppState.preferences.ambientGlow, async (v) => {
    AppState.preferences.ambientGlow = v;
    await storedApi?.Settings?.set(SETTINGS_IDS.AMBIENT_GLOW, v);
    if (v && AppState.lastTrackArt) {
      document.getElementById("nuke-mp-panel")?.style.setProperty("--nuke-mp-art-url", `url(${AppState.lastTrackArt})`);
    } else {
      document.getElementById("nuke-mp-panel")?.style.setProperty("--nuke-mp-art-url", "none");
    }
  });
  setupSwitch("nuke-sw-clean", AppState.preferences.cleanLyrics, async (v) => {
    AppState.preferences.cleanLyrics = v;
    await storedApi?.Settings?.set(SETTINGS_IDS.CLEAN_LYRICS, v);
  });
  setupSwitch("nuke-sw-queue", AppState.preferences.showQueue, async (v) => {
    AppState.preferences.showQueue = v;
    await storedApi?.Settings?.set(SETTINGS_IDS.SHOW_QUEUE, v);
  });
  setupSwitch("nuke-sw-synced", AppState.preferences.preferSynced, async (v) => {
    AppState.preferences.preferSynced = v;
    await storedApi?.Settings?.set(SETTINGS_IDS.PREFER_SYNCED, v);
  });

  // Lyrics Drawer Pop-Down
  const lyricsContainer = document.getElementById("nuke-mp-lyrics-container");
  document.getElementById("nuke-btn-lyrics-toggle").addEventListener("click", () => {
    resetPanelPosition();
    AppState.isLyricsExpanded = !AppState.isLyricsExpanded;
    panel.classList.toggle("lyrics-expanded", AppState.isLyricsExpanded);
    lyricsContainer.style.display = AppState.isLyricsExpanded ? "flex" : "none";
  });

  // Font Size Resizing (A- / A+)
  document.getElementById("nuke-btn-font-inc")?.addEventListener("click", async () => {
    if (AppState.preferences.fontSize < 28) {
      AppState.preferences.fontSize += 2;
      document.querySelectorAll(".lyric-line").forEach(el => el.style.fontSize = `${AppState.preferences.fontSize}px`);
      await storedApi?.Settings?.set(SETTINGS_IDS.FONT_SIZE, AppState.preferences.fontSize);
    }
  });
  document.getElementById("nuke-btn-font-dec")?.addEventListener("click", async () => {
    if (AppState.preferences.fontSize > 12) {
      AppState.preferences.fontSize -= 2;
      document.querySelectorAll(".lyric-line").forEach(el => el.style.fontSize = `${AppState.preferences.fontSize}px`);
      await storedApi?.Settings?.set(SETTINGS_IDS.FONT_SIZE, AppState.preferences.fontSize);
    }
  });

  // copy lyrics
  document.getElementById("nuke-btn-copy")?.addEventListener("click", async () => {
    if (AppState.parsedLyrics && AppState.parsedLyrics.length > 0) {
      const fullText = AppState.parsedLyrics.map(l => l.text).filter(Boolean).join("\n");
      try { await navigator.clipboard.writeText(fullText); } catch (_) {}
    }
  });

  // refresh lyrics
  document.getElementById("nuke-btn-refresh")?.addEventListener("click", () => {
    if (AppState.lastTrack) {
      const norm = normalizeNuclearTrack(AppState.lastTrack);
      fetchAndDisplay(norm);
    }
  });

  document.getElementById("nuke-btn-close").addEventListener("click", () => {
    resetPanelPosition();
    panel.style.display = "none";
  });

  const toggleQueue = () => {
    AppState.isQueueOpen = !AppState.isQueueOpen;
    panel.classList.toggle("queue-active", AppState.isQueueOpen);
    document.getElementById("nuke-mp-queue-dropdown").style.display = AppState.isQueueOpen ? "flex" : "none";
    if (AppState.isQueueOpen) renderQueueDropdown();
  };
    document.getElementById("nuke-ctrl-queue").addEventListener("click", toggleQueue);
    document.getElementById("nuke-queue-close").addEventListener("click", toggleQueue);

    Theme.onThemeChange((color) => {
      document.documentElement.style.setProperty("--nuke-mp-accent", color);
    });

    escapeListener = (e) => {
      if (e.key === "Escape") {
        if (AppState.isSettingsOpen) {
          AppState.isSettingsOpen = false;
          panel.classList.remove("settings-active");
          settingsView.style.display = "none";
        } else if (AppState.isQueueOpen) {
          toggleQueue();
        } else if (AppState.isLyricsExpanded) {
          resetPanelPosition();
          AppState.isLyricsExpanded = false;
          panel.classList.remove("lyrics-expanded");
          lyricsContainer.style.display = "none";
        } else if (AppState.isFullscreen) {
          AppState.isFullscreen = false;
          panel.classList.remove("fullscreen-mode");
        }
      }
    };
    window.addEventListener("keydown", escapeListener);
}

// fallback queue engine (api)
async function getQueueArray() {
  if (!storedApi) return [];

  // 1. trying nuclear plugin api
  try {
    if (storedApi.Queue?.getQueue) {
      const q = await storedApi.Queue.getQueue();
      if (Array.isArray(q) && q.length > 0) return q;
    }
    if (storedApi.Queue?.getTracks) {
      const q = await storedApi.Queue.getTracks();
      if (Array.isArray(q) && q.length > 0) return q;
    }
    if (storedApi.Queue?.getItems) {
      const q = await storedApi.Queue.getItems();
      if (Array.isArray(q) && q.length > 0) return q;
    }
    if (Array.isArray(storedApi.Queue?.queue) && storedApi.Queue.queue.length > 0) {
      return storedApi.Queue.queue;
    }
  } catch (_) {}

  // 2. try window/redux
  try {
    const reduxState = window.store?.getState?.() || window.__REDUX_DEVTOOLS_EXTENSION__?.store?.getState?.();
    const queueItems = reduxState?.queue?.queueItems || reduxState?.queue?.items || reduxState?.queue;
    if (Array.isArray(queueItems) && queueItems.length > 0) return queueItems;
  } catch (_) {}

  // 3. dom inspection
  try {
    const queueElements = document.querySelectorAll('.queue-item, [class*="QueueItem"], [class*="queue_item"]');
    if (queueElements.length > 0) {
      const domQueue = [];
      queueElements.forEach(el => {
        const titleEl = el.querySelector('.title, [class*="title"], h4, span');
        const artistEl = el.querySelector('.artist, [class*="artist"], p');
        const durationEl = el.querySelector('.duration, [class*="duration"]');
        if (titleEl) {
          domQueue.push({
            track: {
              title: titleEl.textContent?.trim(),
                        artist: artistEl?.textContent?.trim() || "",
                        duration: durationEl?.textContent?.trim() || 0
            }
          });
        }
      });
      if (domQueue.length > 0) return domQueue;
    }
  } catch (_) {}

  return [];
}

async function renderQueueDropdown() {
  const listContainer = document.getElementById("nuke-queue-items-container");
  if (!AppState.isQueueOpen || !listContainer) return;
  listContainer.innerHTML = `<div style="padding:16px; color:#888;">fetching queue...</div>`;

  try {
    const queue = await getQueueArray();
    const currentItem = await storedApi?.Queue?.getCurrentItem?.();

    if (!queue || queue.length === 0) {
      listContainer.innerHTML = `<div style="padding:16px; color:#888;">no upcoming tracks in queue</div>`;
      return;
    }

    listContainer.innerHTML = "";
    queue.forEach((item, idx) => {
      const norm = normalizeNuclearTrack(item);
      const li = document.createElement("li");
      const isCurrent = currentItem && (currentItem.uuid === item.uuid || currentItem.track?.title === norm.title);
      li.className = `nuke-queue-item ${isCurrent ? "active" : ""}`;

      li.innerHTML = `
      <span style="font-size:11px; color:#666; width:16px;">${idx + 1}</span>
      <div style="flex:1; min-width:0;">
      <div style="font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${norm.title || "unknown track"}</div>
      <div style="font-size:11px; color:#888;">${norm.artist}</div>
      </div>
      <span style="font-size:11px; color:#777;">${formatTime(norm.duration || 0)}</span>
      `;

      li.addEventListener("click", async () => {
        if (storedApi?.Queue?.playTrack) await storedApi.Queue.playTrack(item);
      });

        listContainer.appendChild(li);
    });
  } catch (_) {
    listContainer.innerHTML = `<div style="padding:16px; color:#888;">no upcoming tracks in queue</div>`;
  }
}

function startSyncedPlaybackTracker() {
  if (playbackInterval) clearInterval(playbackInterval);
  playbackInterval = setInterval(async () => {
    const panel = document.getElementById("nuke-mp-panel"), a = getAudioElement();
    if (panel) {
      const isPlaybackStopped = AppState.playbackStatus === "stopped" || !AppState.lastTitle;
      const shouldHide = isSystemMenuOpen() || isPlaybackStopped;
      panel.style.opacity = shouldHide ? "0" : "1";
      panel.style.visibility = shouldHide ? "hidden" : "visible";
      panel.style.pointerEvents = shouldHide ? "none" : "auto";
    }
    if (!a) return;

    const playBtn = document.getElementById("nuke-ctrl-play");
    if (playBtn) playBtn.innerHTML = a.paused ? ICONS.play : ICONS.pause;

    const currentEl = document.getElementById("nuke-time-current"), totalEl = document.getElementById("nuke-time-total"), seekBar = document.getElementById("nuke-seek-bar");
    if (currentEl) currentEl.innerText = formatTime(a.currentTime);
    if (totalEl) totalEl.innerText = formatTime(a.duration || 0);
    if (seekBar && a.duration && !AppState.isUserSeeking) {
      seekBar.value = (a.currentTime / a.duration) * 100;
      updateSliderBackground(seekBar);
    }

    const queueBtn = document.getElementById("nuke-ctrl-queue");
    if (queueBtn) {
      const queue = await getQueueArray();
      if (queue.length <= 1) {
        queueBtn.classList.add("disabled");
        queueBtn.title = "no upcoming queue tracks";
      } else {
        queueBtn.classList.remove("disabled");
        queueBtn.title = "queue";
      }
    }

    const container = document.getElementById("nuke-mp-lyrics-container");
    if (!container || !AppState.hasSyncedTimestamps || AppState.parsedLyrics.length === 0 || !AppState.preferences.autoscroll) return;

    let activeIndex = -1;
    for (let i = 0; i < AppState.parsedLyrics.length; i++) {
      if (AppState.parsedLyrics[i].time >= 0 && AppState.parsedLyrics[i].time <= a.currentTime) activeIndex = i;
      else if (AppState.parsedLyrics[i].time > a.currentTime) break;
    }

    container.querySelectorAll(".lyric-line").forEach((el, idx) => {
      if (idx === activeIndex) {
        if (!el.classList.contains("active")) {
          el.classList.add("active");
          AppState.currentLyricText = el.innerText;
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else el.classList.remove("active");
    });
  }, 250);
}

// native preferences injector
async function syncSettings(api) {
  AppState.preferences.ambientGlow = (await api.Settings.get(SETTINGS_IDS.AMBIENT_GLOW)) !== false;
  AppState.preferences.cleanLyrics = (await api.Settings.get(SETTINGS_IDS.CLEAN_LYRICS)) !== false;
  AppState.preferences.showBgColor = (await api.Settings.get(SETTINGS_IDS.SHOW_BG_COLOR)) !== false;
  AppState.preferences.showQueue = (await api.Settings.get(SETTINGS_IDS.SHOW_QUEUE)) !== false;
  AppState.preferences.autoscroll = (await api.Settings.get(SETTINGS_IDS.AUTOSCROLL)) !== false;
  AppState.preferences.preferSynced = (await api.Settings.get(SETTINGS_IDS.PREFER_SYNCED)) !== false;
  AppState.preferences.primarySource = (await api.Settings.get(SETTINGS_IDS.PRIMARY_SOURCE)) || "lrclib";
  AppState.preferences.themeSync = (await api.Settings.get(SETTINGS_IDS.THEME_SYNC)) !== false;
  AppState.preferences.fontSize = (await api.Settings.get(SETTINGS_IDS.FONT_SIZE)) || 16;
}

function setupNativeSettingsInjector(api) {
  if (settingsObserver) settingsObserver.disconnect();

  settingsObserver = new MutationObserver(() => {
    const injectToggle = (settingTitle, settingId) => {
      const labels = Array.from(document.querySelectorAll('div, span, label')).filter(el => el.textContent?.trim().toLowerCase() === settingTitle.toLowerCase());
      labels.forEach(lbl => {
        const row = lbl.closest('.setting-row') || lbl.parentElement;
        const input = row?.querySelector('input[type="checkbox"], input[type="text"]');
        if (!input || input.dataset.injected) return;
        input.dataset.injected = "true";
        input.style.display = "none";

        const isChecked = input.value === "true" || input.checked === true;
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "display: flex; align-items: center; gap: 12px; cursor: pointer; margin-top: 6px;";
        wrapper.innerHTML = `
        <div style="width: 40px; height: 22px; background: ${isChecked ? "var(--nuke-mp-accent, #1ed760)" : "#444"}; border-radius: 11px; position: relative; transition: 0.2s;">
        <div style="width: 18px; height: 18px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: ${isChecked ? "20px" : "2px"}; transition: 0.2s;"></div>
        </div>
        <span style="font-size: 13px; color: #ccc;">${isChecked ? "enabled" : "disabled"}</span>
        `;
        wrapper.addEventListener("click", async () => {
          const newVal = !(input.value === "true" || input.checked === true);
          input.value = String(newVal); input.checked = newVal;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          await api.Settings.set(settingId, newVal);
          await syncSettings(api);

          const bg = wrapper.querySelector('div'), knob = bg.querySelector('div'), text = wrapper.querySelector('span');
          bg.style.background = newVal ? "var(--nuke-mp-accent, #1ed760)" : "#444";
          knob.style.left = newVal ? "20px" : "2px";
          text.innerText = newVal ? "enabled" : "disabled";
        });
        row.appendChild(wrapper);
      });
    };

    injectToggle("enable ambient background color aura (better lyrics)", SETTINGS_IDS.AMBIENT_GLOW);
    injectToggle("clean lyrics section headers and credits", SETTINGS_IDS.CLEAN_LYRICS);
    injectToggle("display miniplayer background color", SETTINGS_IDS.SHOW_BG_COLOR);
    injectToggle("enable queue menu", SETTINGS_IDS.SHOW_QUEUE);
    injectToggle("prefer synced lrc lyrics", SETTINGS_IDS.PREFER_SYNCED);
    injectToggle("sync theme accent color", SETTINGS_IDS.THEME_SYNC);
  });

  settingsObserver.observe(document.body, { childList: true, subtree: true });
}

// lifecycle
module.exports = {
  async onLoad(api) {
    await api.Settings.register([
      { id: SETTINGS_IDS.AMBIENT_GLOW, title: "enable ambient background color aura (better lyrics)", category: "mini player & lyrics", kind: "boolean", type: "boolean", default: true },
                                { id: SETTINGS_IDS.CLEAN_LYRICS, title: "clean lyrics section headers and credits", category: "mini player & lyrics", kind: "boolean", type: "boolean", default: true },
                                { id: SETTINGS_IDS.SHOW_BG_COLOR, title: "display miniplayer background color", category: "mini player & lyrics", kind: "boolean", type: "boolean", default: true },
                                { id: SETTINGS_IDS.SHOW_QUEUE, title: "enable queue menu", category: "mini player & lyrics", kind: "boolean", type: "boolean", default: true },
                                { id: SETTINGS_IDS.PREFER_SYNCED, title: "prefer synced lrc lyrics", category: "mini player & lyrics", kind: "boolean", type: "boolean", default: true },
                                { id: SETTINGS_IDS.THEME_SYNC, title: "sync theme accent color", category: "mini player & lyrics", kind: "boolean", type: "boolean", default: true }
    ]);
  },

  async onEnable(api) {
    storedApi = api;
    await syncSettings(api);
    Theme.init();
    injectUI();
    setupNativeSettingsInjector(api);

    unsubscribeEvents = api.Events.on("trackStarted", (t) => handleTrackChange(api, t));

    if (api.Playback?.subscribe) {
      unsubscribePlayback = api.Playback.subscribe((pState) => {
        const playBtn = document.getElementById("nuke-ctrl-play");
        if (playBtn) playBtn.innerHTML = pState.status === "playing" ? ICONS.pause : ICONS.play;
        AppState.playbackStatus = pState.status;
      });
    }

    if (api.Queue?.subscribeToCurrentItem) {
      unsubscribeQueue = api.Queue.subscribeToCurrentItem((item) => {
        if (item?.track) {
          handleTrackChange(api, item.track);
        } else {
          AppState.lastTitle = "";
          AppState.lastArtist = "";
          AppState.currentTrackKey = "";
          AppState.lastTrack = null;
        }
      });
    }

    try {
      const pState = await api.Playback.getState();
      AppState.playbackStatus = pState.status;
    } catch (_) {
      AppState.playbackStatus = "playing";
    }

    try {
      const current = await api.Queue?.getCurrentItem?.();
      if (current?.track) handleTrackChange(api, current.track);
    } catch (_) {}

    providerId = api.Providers.register({ id: "mp-lyrics", kind: "lyrics", name: "miniplayer lyrics", fetchLyrics: () => null });
  },

  async onDisable(api) {
    if (unsubscribeEvents) unsubscribeEvents();
    if (unsubscribeQueue) unsubscribeQueue();
    if (unsubscribePlayback) unsubscribePlayback();
    if (providerId) api.Providers.unregister(providerId);
    if (playbackInterval) clearInterval(playbackInterval);
    if (panelResizeObserver) panelResizeObserver.disconnect();
    if (AppState.abortController) AppState.abortController.abort();
    if (settingsObserver) settingsObserver.disconnect();
    if (escapeListener) window.removeEventListener("keydown", escapeListener);
    Theme.destroy();
    document.getElementById("nuke-mp-panel")?.remove();
    document.getElementById("nuke-mp-styles")?.remove();
  }
};
