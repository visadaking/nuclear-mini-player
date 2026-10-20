/*
 * Nuclear Mini Player v1.8.2 Dev Rework
 */

// settings

const SETTINGS_IDS = {
  AMBIENT_GLOW: "mp_ambient_glow",
  CLEAN_LYRICS: "mp_clean_lyrics",
  SHOW_BG_COLOR: "mp_show_bg_color",
  SHOW_QUEUE: "mp_show_queue",
  AUTOSCROLL: "mp_autoscroll",
  PREFER_SYNCED: "mp_prefer_synced",
  THEME_SYNC: "mp_theme_sync",
  FONT_SIZE: "mp_font_size",
  LANGUAGE: "mp_language"
};

const DEFAULT_SETTINGS = {
  ambientGlow: true,
  cleanLyrics: true,
  showBgColor: true,
  showQueue: true,
  autoscroll: true,
  preferSynced: true,
  themeSync: true,
  fontSize: 16,
  language: "en"
};

const LANGUAGE_OPTIONS = [
  {
    value: "en",
    label: "English"
  },
{
  value: "es",
  label: "Español"
},
{
  value: "fr",
  label: "Français"
},
{
  value: "ru",
  label: "Русский"
},
{
  value: "ro",
  label: "Română"
}
];

const TEXT = {
  en: {
    player: "player",
    queue: "Queue",
    playlists: "Playlists",
    lyrics: "Lyrics",
    previous: "Previous",
    next: "Next",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    close: "Close",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen",
    detach: "Detach player",
    detached: "Detached player",
    attach: "Close detached player",
    copy: "Copy",
    copied: "Copied",
    refresh: "Refresh",
    decreaseText: "Decrease text size",
    increaseText: "Increase text size",
    clearQueue: "Clear queue",
    remove: "Remove",
    back: "Back",
    noQueue: "Your queue is empty.",
    noPlaylists: "No playlists found.",
    playlistEmpty: "This playlist is empty.",
    loading: "Loading…",
    searchingLyrics: "Searching lyrics…",
    noLyrics: "No lyrics found.",
    lyricsUnavailable: "Lyrics service unavailable.",
    waitingPlayback: "Play a song to view lyrics.",
    added: "Added to queue",
    current: "Now playing",
    source: "Source",
    unknownArtist: "Unknown Artist",
    unknownTrack: "Unknown Track",
    nothingPlaying: "Nothing playing",
    pickTrack: "Pick a song in Nuclear",
    popupBlocked: "The detached window was blocked."
  },

  es: {
    player: "reproductor",
    queue: "Cola",
    playlists: "Listas",
    lyrics: "Letras",
    previous: "Anterior",
    next: "Siguiente",
    play: "Reproducir",
    pause: "Pausa",
    mute: "Silenciar",
    unmute: "Activar sonido",
    close: "Cerrar",
    fullscreen: "Pantalla completa",
    exitFullscreen: "Salir de pantalla completa",
    detach: "Separar reproductor",
    detached: "Reproductor separado",
    attach: "Cerrar reproductor separado",
    copy: "Copiar",
    copied: "Copiado",
    refresh: "Actualizar",
    decreaseText: "Reducir texto",
    increaseText: "Aumentar texto",
    clearQueue: "Vaciar cola",
    remove: "Quitar",
    back: "Atrás",
    noQueue: "La cola está vacía.",
    noPlaylists: "No hay listas.",
    playlistEmpty: "Esta lista está vacía.",
    loading: "Cargando…",
    searchingLyrics: "Buscando letras…",
    noLyrics: "No se encontraron letras.",
    lyricsUnavailable: "El servicio de letras no está disponible.",
    waitingPlayback: "Reproduce una canción para ver las letras.",
    added: "Añadido a la cola",
    current: "Reproduciendo",
    source: "Fuente",
    unknownArtist: "Artista desconocido",
    unknownTrack: "Canción desconocida",
    nothingPlaying: "Nada en reproducción",
    pickTrack: "Elige una canción en Nuclear",
    popupBlocked: "La ventana separada fue bloqueada."
  },

  fr: {
    player: "lecteur",
    queue: "File",
    playlists: "Listes",
    lyrics: "Paroles",
    previous: "Précédent",
    next: "Suivant",
    play: "Lecture",
    pause: "Pause",
    mute: "Muet",
    unmute: "Activer le son",
    close: "Fermer",
    fullscreen: "Plein écran",
    exitFullscreen: "Quitter le plein écran",
    detach: "Détacher le lecteur",
    detached: "Lecteur séparé",
    attach: "Fermer le lecteur séparé",
    copy: "Copier",
    copied: "Copié",
    refresh: "Actualiser",
    decreaseText: "Réduire le texte",
    increaseText: "Agrandir le texte",
    clearQueue: "Vider la file",
    remove: "Retirer",
    back: "Retour",
    noQueue: "La file est vide.",
    noPlaylists: "Aucune liste trouvée.",
    playlistEmpty: "Cette liste est vide.",
    loading: "Chargement…",
    searchingLyrics: "Recherche des paroles…",
    noLyrics: "Aucune parole trouvée.",
    lyricsUnavailable: "Service de paroles indisponible.",
    waitingPlayback: "Lancez une chanson pour voir les paroles.",
    added: "Ajouté à la file",
    current: "Lecture en cours",
    source: "Source",
    unknownArtist: "Artiste inconnu",
    unknownTrack: "Titre inconnu",
    nothingPlaying: "Rien en lecture",
    pickTrack: "Choisissez une chanson dans Nuclear",
    popupBlocked: "La fenêtre séparée a été bloquée."
  },

  ru: {
    player: "плеер",
    queue: "Очередь",
    playlists: "Плейлисты",
    lyrics: "Текст",
    previous: "Назад",
    next: "Далее",
    play: "Воспроизвести",
    pause: "Пауза",
    mute: "Без звука",
    unmute: "Включить звук",
    close: "Закрыть",
    fullscreen: "На весь экран",
    exitFullscreen: "Выйти из полноэкранного режима",
    detach: "Отделить плеер",
    detached: "Отдельный плеер",
    attach: "Закрыть отдельный плеер",
    copy: "Копировать",
    copied: "Скопировано",
    refresh: "Обновить",
    decreaseText: "Уменьшить текст",
    increaseText: "Увеличить текст",
    clearQueue: "Очистить очередь",
    remove: "Удалить",
    back: "Назад",
    noQueue: "Очередь пуста.",
    noPlaylists: "Плейлисты не найдены.",
    playlistEmpty: "Плейлист пуст.",
    loading: "Загрузка…",
    searchingLyrics: "Поиск текста…",
    noLyrics: "Текст не найден.",
    lyricsUnavailable: "Сервис текстов недоступен.",
    waitingPlayback: "Включите песню, чтобы увидеть текст.",
    added: "Добавлено в очередь",
    current: "Сейчас играет",
    source: "Источник",
    unknownArtist: "Неизвестный исполнитель",
    unknownTrack: "Неизвестный трек",
    nothingPlaying: "Ничего не воспроизводится",
    pickTrack: "Выберите песню в Nuclear",
    popupBlocked: "Отдельное окно было заблокировано."
  },

  ro: {
    player: "player",
    queue: "Coadă",
    playlists: "Liste",
    lyrics: "Versuri",
    previous: "Anterior",
    next: "Următor",
    play: "Redare",
    pause: "Pauză",
    mute: "Mut",
    unmute: "Activează sunetul",
    close: "Închide",
    fullscreen: "Ecran complet",
    exitFullscreen: "Ieși din ecran complet",
    detach: "Separă playerul",
    detached: "Player separat",
    attach: "Închide playerul separat",
    copy: "Copiază",
    copied: "Copiat",
    refresh: "Reîmprospătează",
    decreaseText: "Micșorează textul",
    increaseText: "Mărește textul",
    clearQueue: "Golește coada",
    remove: "Elimină",
    back: "Înapoi",
    noQueue: "Coada este goală.",
    noPlaylists: "Nu există liste.",
    playlistEmpty: "Această listă este goală.",
    loading: "Se încarcă…",
    searchingLyrics: "Se caută versurile…",
    noLyrics: "Nu au fost găsite versuri.",
    lyricsUnavailable: "Serviciul de versuri nu este disponibil.",
    waitingPlayback: "Redă o melodie pentru a vedea versurile.",
    added: "Adăugat în coadă",
    current: "În redare",
    source: "Sursă",
    unknownArtist: "Artist necunoscut",
    unknownTrack: "Melodie necunoscută",
    nothingPlaying: "Nimic nu rulează",
    pickTrack: "Alege o melodie în Nuclear",
    popupBlocked: "Fereastra separată a fost blocată."
  }
};

const PROVIDER_ORDER = [
  "lrclib",
"netease",
"kugou",
"genius",
"ovh"
];

// state

const state = {
  api: null,

  settings: {
    ...DEFAULT_SETTINGS
  },

  track: null,

  artwork: {
    url: "",
    requestId: 0
  },

  playback: {
    status: "stopped",
    seek: 0,
    duration: 0,
    updatedAt: 0
  },

  queue: {
    items: [],
    currentIndex: -1,
    currentItemId: ""
  },

  queueOpen: false,
  queueView: "queue",
  selectedPlaylist: null,
  playlists: [],
  playlistsLoading: false,

  lyricsOpen: false,

  lyrics: {
    raw: "",
    source: "",
    synced: false,
    lines: [],
    activeIndex: -1,
    requestId: 0,
    controller: null,
    key: "",
    loading: false,
    error: false
  },

  fullscreen: false,
  hidden: false,

  lastVolume: 0.8,

  accent: "#1ed760",

  dragging: false,
  dragOffsetX: 0,
  dragOffsetY: 0,
  dragStartX: 0,
  dragStartY: 0,

  animationFrame: null,

  detachedWindow: null,
  detachedChannel: null,

  cleanup: [],

  toastTimer: null
};

let api = null;
let panel = null;
let queuePanel = null;
let styleNode = null;

// helpers

function log(...args) {
  console.debug("[Nuclear Mini Player]", ...args);
}

function addCleanup(fn) {
  if (typeof fn === "function") {
    state.cleanup.push(fn);
  }
}

function text(key) {
  return TEXT[state.settings.language]?.[key] || TEXT.en[key] || key;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;

  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function createElement(tag, className = "", content = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (content) {
    element.textContent = content;
  }

  return element;
}

function createButton(className, label, icon = "") {
  const button = createElement("button", className);

  button.type = "button";
  button.setAttribute("aria-label", label);

  if (icon) {
    button.innerHTML = icon;
  }

  return button;
}

function getAudioElement() {
  return document.querySelector("audio") || document.querySelector("video");
}

function safeString(value) {
  return String(value ?? "").trim();
}

function sameTrack(a, b) {
  if (!a || !b) {
    return false;
  }

  return trackKey(a) === trackKey(b);
}

// cache

class BoundedCache {
  constructor(limit) {
    this.limit = limit;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) {
      return null;
    }

    const value = this.map.get(key);

    this.map.delete(key);
    this.map.set(key, value);

    return value;
  }

  set(key, value) {
    if (!key) {
      return;
    }

    if (this.map.has(key)) {
      this.map.delete(key);
    }

    this.map.set(key, value);

    while (this.map.size > this.limit) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }

  clear() {
    this.map.clear();
  }
}

const artworkCache = new BoundedCache(100);
const lyricsCache = new BoundedCache(80);

// metadata

function cleanMetadataForLookup(value) {
  return safeString(value)
  .replace(
    /\s*[\[(]\s*(?:feat\.?|ft\.?|with|official(?:\s+video|\s+audio)?|remaster(?:ed)?|deluxe|live|bonus|radio\s+edit|version|video|hq|hd|audio)[^\])]*[\])]/gi,
    ""
    )
    .replace(/\s*[-–]\s*Single\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeArtist(track) {
  if (typeof track?.artist === "string") {
    return track.artist.trim();
  }

  if (track?.artist?.name) {
    return safeString(track.artist.name);
  }

  if (Array.isArray(track?.artists)) {
    return track.artists
    .map((artist) => {
      if (typeof artist === "string") {
        return artist;
      }

      return artist?.name;
    })
    .filter(Boolean)
    .join(", ")
    .trim();
  }

  return safeString(
    track?.albumArtist ||
    track?.album?.artist ||
    track?.channel
  );
}

function normalizeArtwork(track) {
  const candidates = [
    track?.artwork,
    track?.artworkUrl,
    track?.artwork_url,
    track?.thumbnail,
    track?.image,
    track?.cover,
    track?.coverUrl,
    track?.album?.artwork,
    track?.album?.cover,
    track?.album?.coverUrl,
    track?.album?.images?.[0]?.url
  ];

  const artwork = candidates.find(
    (value) => typeof value === "string" && value.trim()
  );

  if (!artwork || artwork.startsWith("data:image/svg")) {
    return "";
  }

  return artwork;
}

function normalizeTrack(rawTrack) {
  if (!rawTrack) {
    return null;
  }

  // already normalized: re-reading it would lose title and artist
  if (rawTrack.raw && "lookupTitle" in rawTrack) {
    return rawTrack;
  }

  const track = rawTrack.track || rawTrack;

  let title = safeString(
    track.title ||
    track.name ||
    track.song?.title
  );

  let artist = normalizeArtist(track);

  if (!artist && title.includes(" - ")) {
    const parts = title.split(" - ");

    artist = parts.shift().trim();
    title = parts.join(" - ").trim();
  }

  const id = safeString(
    track.id ||
    track.trackId ||
    track.songId ||
    track.uuid ||
    track._id
  );

  const duration = Number(
    track.duration ??
    track.durationSeconds ??
    track.length ??
    0
  );

  return {
    id,
    displayTitle: title || text("unknownTrack"),
    displayArtist: artist || text("unknownArtist"),
    lookupTitle: cleanMetadataForLookup(title),
    lookupArtist: cleanMetadataForLookup(artist),
    artwork: normalizeArtwork(track),
    duration: Number.isFinite(duration) ? duration : 0,
    raw: track
  };
}

function trackKey(track) {
  const normalized = normalizeTrack(track);

  if (!normalized) {
    return "";
  }

  if (normalized.id) {
    return `id:${normalized.id}`;
  }

  return `${normalized.lookupArtist}::${normalized.lookupTitle}`.toLowerCase();
}

// HTTP

async function fetchJson(url, options = {}) {
  try {
    // Nuclear's Tauri HTTP bridge rejects the AbortSignal option,
    // so strip it for host fetches (stale-request guards still apply).
    const response = api?.Http?.fetch
    ? await api.Http.fetch(url, (({ signal, ...rest }) => rest)(options))
    : await fetch(url, options);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (options.signal?.aborted) {
      throw error;
    }

    log("HTTP request failed", url, error);
    return null;
  }
}

// artwork

async function resolveArtwork(track) {
  if (!track) {
    return "";
  }

  if (track.artwork) {
    return track.artwork;
  }

  const key = trackKey(track);
  const cached = artworkCache.get(key);

  if (cached) {
    return cached;
  }

  if (!track.lookupArtist && !track.lookupTitle) {
    return "";
  }

  const term = encodeURIComponent(
    `${track.lookupArtist} ${track.lookupTitle}`
  );

  const data = await fetchJson(
    `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`
  );

  const artwork = data?.results?.[0]?.artworkUrl100
  ?.replace("100x100", "600x600");

  if (artwork) {
    artworkCache.set(key, artwork);
  }

  return artwork || "";
}

async function updateArtwork(track) {
  const requestId = ++state.artwork.requestId;
  const artwork = await resolveArtwork(track);

  if (requestId !== state.artwork.requestId) {
    return;
  }

  if (!state.track || !sameTrack(state.track, track)) {
    return;
  }

  state.artwork.url = artwork;

  const image = document.getElementById(
    "nuke-mp-art-image"
  );

  if (image) {
    if (artwork) {
      image.src = artwork;
      image.hidden = false;
    } else {
      image.removeAttribute("src");
      image.hidden = true;
    }
  }

  updateBackgroundArtwork();
  updateMediaSession();
  syncDetachedPlayer();
}

function updateBackgroundArtwork() {
  if (!panel) {
    return;
  }

  if (
    state.settings.ambientGlow &&
    state.artwork.url
  ) {
    panel.style.setProperty(
      "--nuke-mp-cover",
      `url("${state.artwork.url.replaceAll('"', '\\"')}")`
    );
  } else {
    panel.style.removeProperty("--nuke-mp-cover");
  }

  const artwork = document.getElementById(
    "nuke-mp-artwork"
  );

  if (!artwork) {
    return;
  }

  if (
    state.settings.showBgColor &&
    state.artwork.url
  ) {
    artwork.style.backgroundImage =
    `url("${state.artwork.url.replaceAll('"', '\\"')}")`;
  } else {
    artwork.style.backgroundImage = "none";
  }
}

// theme

function readAccentColor() {
  const computed = getComputedStyle(
    document.documentElement
  );

  const candidates = [
    computed.getPropertyValue("--primary-color").trim(),
    computed.getPropertyValue("--color-primary").trim(),
    computed.getPropertyValue("--accent-color").trim()
  ];

  return candidates.find(Boolean) || "#1ed760";
}

function updateTheme() {
  if (!state.settings.themeSync || !panel) {
    return;
  }

  const accent = readAccentColor();

  if (accent === state.accent) {
    return;
  }

  state.accent = accent;

  panel.style.setProperty(
    "--nuke-mp-accent",
    accent
  );

  if (queuePanel) {
    queuePanel.style.setProperty(
      "--nuke-mp-accent",
      accent
    );
  }

  syncDetachedPlayer();
}

function startThemeWatcher() {
  const observer = new MutationObserver(() => {
    updateTheme();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"]
  });

  addCleanup(() => observer.disconnect());

  updateTheme();
}

// lyrics

function cleanLyricsText(value) {
  let result = safeString(value)
  .replace(/\r/g, "");

  if (!state.settings.cleanLyrics) {
    return result.trim();
  }

  result = result
  .replace(
    /^\s*\[(?:verse|chorus|bridge|intro|outro|hook|pre-chorus|post-chorus|refrain|couplet|куплет|припев|प्रस्तावना|verso|coro)\][ \t]*$/gim,
           ""
  )
  .replace(
    /^\s*(?:lyrics by|written by|paroles par|letra de|текст:?).*$/gim,
           ""
  );

  return result
  .replace(/\n{3,}/g, "\n\n")
  .trim();
}

function parseLrc(rawText) {
  const textValue = cleanLyricsText(rawText);

  if (!textValue) {
    return [];
  }

  const result = [];
  const timePattern =
  /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g;

  const metadataPattern =
  /^\[(?:ar|ti|al|au|by|length|offset|re|ve):/i;

  for (const rawLine of textValue.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (metadataPattern.test(line)) {
      continue;
    }

    const matches = [...line.matchAll(timePattern)];

    if (!matches.length) {
      result.push({
        time: -1,
        text: line
      });

      continue;
    }

    const lyricText = line
    .replace(timePattern, "")
    .trim();

    if (!lyricText) {
      continue;
    }

    for (const match of matches) {
      const minutes = Number(match[1]);
      const seconds = Number(match[2]);
      const fractionText = match[3] || "0";

      let fraction = 0;

      if (fractionText.length === 1) {
        fraction = Number(fractionText) / 10;
      } else if (fractionText.length === 2) {
        fraction = Number(fractionText) / 100;
      } else {
        fraction =
        Number(fractionText.slice(0, 3)) / 1000;
      }

      result.push({
        time:
        minutes * 60 +
        seconds +
        fraction,
        text: lyricText
      });
    }
  }

  return result.sort(
    (a, b) => a.time - b.time
  );
}

function findCurrentLyric(lines, currentTime) {
  let low = 0;
  let high = lines.length - 1;
  let result = -1;

  while (low <= high) {
    const middle = Math.floor(
      (low + high) / 2
    );

    const time = lines[middle]?.time ?? -1;

    if (time < 0) {
      low = middle + 1;
      continue;
    }

    if (time <= currentTime) {
      result = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return result;
}

async function fetchLyricsProvider(
  provider,
  artist,
  title,
  signal
) {
  if (provider === "lrclib") {
    const params = new URLSearchParams({
      artist_name: artist,
      track_name: title
    });

    const data = await fetchJson(
      `https://lrclib.net/api/get?${params.toString()}`,
                                 { signal }
    );

    if (!data) {
      return null;
    }

    return {
      source: "LRCLIB",
      synced: data.syncedLyrics || "",
      plain: data.plainLyrics || ""
    };
  }

  if (provider === "netease") {
    const params = new URLSearchParams({
      s: `${artist} ${title}`,
      type: "1",
      limit: "1",
      offset: "0"
    });

    const search = await fetchJson(
      `https://music.163.com/api/search/get/web?${params.toString()}`,
                                   { signal }
    );

    const id =
    search?.result?.songs?.[0]?.id;

    if (!id) {
      return null;
    }

    const data = await fetchJson(
      `https://music.163.com/api/song/lyric?id=${id}&lv=-1&kv=-1&tv=-1`,
      { signal }
    );

    const lyric = data?.lrc?.lyric || "";

    return lyric
    ? {
      source: "Netease",
      synced: lyric,
      plain: lyric
    }
    : null;
  }

  if (provider === "kugou") {
    const searchParams = new URLSearchParams({
      keyword: `${artist} ${title}`,
      page: "1",
      pagesize: "1"
    });

    const search = await fetchJson(
      `https://mobileservice.kugou.com/api/v3/search/song?${searchParams.toString()}`,
                                   { signal }
    );

    const song = search?.data?.info?.[0];

    if (!song?.hash) {
      return null;
    }

    const data = await fetchJson(
      `https://www.kugou.com/yy/index.php?r=play/getdata&hash=${encodeURIComponent(song.hash)}`,
                                 { signal }
    );

    const lyric = data?.data?.lyrics || "";

    return lyric
    ? {
      source: "Kugou",
      synced: lyric,
      plain: lyric
    }
    : null;
  }

  if (provider === "genius") {
    const artistPart =
    encodeURIComponent(artist);

    const titlePart =
    encodeURIComponent(title);

    const data = await fetchJson(
      `https://lyrist.vercel.app/api/${artistPart}/${titlePart}`,
      { signal }
    );

    const lyric = data?.lyrics || "";

    return lyric
    ? {
      source: "Genius",
      synced: "",
      plain: lyric
    }
    : null;
  }

  if (provider === "ovh") {
    const data = await fetchJson(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
                                 { signal }
    );

    const lyric = data?.lyrics || "";

    return lyric
    ? {
      source: "Lyrics.ovh",
      synced: "",
      plain: lyric
    }
    : null;
  }

  return null;
}

function clearLyricsState() {
  if (state.lyrics.controller) {
    state.lyrics.controller.abort();
  }

  state.lyrics.controller = null;
  state.lyrics.raw = "";
  state.lyrics.source = "";
  state.lyrics.synced = false;
  state.lyrics.lines = [];
  state.lyrics.activeIndex = -1;
  state.lyrics.loading = false;
  state.lyrics.error = false;
}

async function loadLyrics(track, force = false) {
  if (!track) {
    clearLyricsState();
    renderLyrics();
    return;
  }

  const artist =
  track.lookupArtist ||
  cleanMetadataForLookup(
    track.displayArtist
  );

  const title =
  track.lookupTitle ||
  cleanMetadataForLookup(
    track.displayTitle
  );

  const key =
  `${artist}::${title}`.toLowerCase();

  if (!force && state.lyrics.key === key) {
    return;
  }

  const cached = !force
  ? lyricsCache.get(key)
  : null;

  if (cached) {
    state.lyrics.key = key;
    state.lyrics.raw = cached.text;
    state.lyrics.source = cached.source;
    state.lyrics.synced = cached.synced;
    state.lyrics.lines = parseLrc(
      cached.text
    );
    state.lyrics.activeIndex = -1;
    state.lyrics.loading = false;
    state.lyrics.error = false;

    renderLyrics();
    return;
  }

  if (state.lyrics.controller) {
    state.lyrics.controller.abort();
  }

  const requestId =
  ++state.lyrics.requestId;

  const controller =
  new AbortController();

  state.lyrics.controller = controller;
  state.lyrics.key = key;
  state.lyrics.raw = "";
  state.lyrics.source = "";
  state.lyrics.synced = false;
  state.lyrics.lines = [];
  state.lyrics.activeIndex = -1;
  state.lyrics.loading = true;
  state.lyrics.error = false;

  renderLyrics();

  let selected = null;
  let firstPlain = null;

  try {
    for (const provider of PROVIDER_ORDER) {
      if (
        controller.signal.aborted ||
        requestId !== state.lyrics.requestId
      ) {
        return;
      }

      try {
        const result =
        await fetchLyricsProvider(
          provider,
          artist,
          title,
          controller.signal
        );

        if (!result) {
          continue;
        }

        const hasSynced =
        Boolean(
          result.synced &&
          parseLrc(result.synced).some(
            (line) => line.time >= 0
          )
        );

        if (!selected) {
          const preferred =
          state.settings.preferSynced
          ? result.synced || result.plain
          : result.plain || result.synced;

          if (preferred) {
            selected = {
              source: result.source,
              text: preferred,
              synced: hasSynced &&
              preferred === result.synced
            };
          }
        }

        if (!firstPlain && result.plain) {
          firstPlain = {
            source: result.source,
            text: result.plain,
            synced: false
          };
        }

        if (
          state.settings.preferSynced &&
          hasSynced
        ) {
          selected = {
            source: result.source,
            text: result.synced,
            synced: true
          };

          break;
        }

        if (
          !state.settings.preferSynced &&
          result.plain
        ) {
          selected = {
            source: result.source,
            text: result.plain,
            synced: false
          };

          break;
        }
      } catch (error) {
        if (
          error?.name === "AbortError" ||
          controller.signal.aborted
        ) {
          return;
        }

        log(
          `lyrics provider failed: ${provider}`,
          error
        );
      }
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      return;
    }

    log("lyrics request failed", error);
  }

  if (
    requestId !== state.lyrics.requestId ||
    controller.signal.aborted
  ) {
    return;
  }

  state.lyrics.controller = null;
  state.lyrics.loading = false;

  if (!selected) {
    selected = firstPlain;
  }

  if (!selected) {
    state.lyrics.error = false;
    state.lyrics.raw = "";
    state.lyrics.source = "";
    state.lyrics.lines = [];

    renderLyrics();
    return;
  }

  state.lyrics.raw = selected.text;
  state.lyrics.source = selected.source;
  state.lyrics.synced = Boolean(
    selected.synced
  );
  state.lyrics.lines = parseLrc(
    selected.text
  );
  state.lyrics.activeIndex = -1;
  state.lyrics.error = false;

  lyricsCache.set(key, selected);

  renderLyrics();
}

// settings

async function registerSettings() {
  if (!api?.Settings?.register) {
    throw new Error(
      "Nuclear Settings API is unavailable."
    );
  }

  await api.Settings.register([
    {
      id: SETTINGS_IDS.AMBIENT_GLOW,
      title: "Ambient artwork glow",
      description:
      "Use the current artwork behind the mini player.",
      category: "Mini Player",
      kind: "boolean",
      default: true,
        widget: {
          type: "toggle"
        }
    },

    {
      id: SETTINGS_IDS.CLEAN_LYRICS,
      title: "Clean lyric headers",
      description:
      "Remove common lyric section and credit headers.",
      category: "Lyrics",
      kind: "boolean",
      default: true,
        widget: {
          type: "toggle"
        }
    },

    {
      id: SETTINGS_IDS.SHOW_BG_COLOR,
      title: "Show artwork background",
      description:
      "Use the current artwork inside the player background.",
      category: "Mini Player",
      kind: "boolean",
      default: true,
        widget: {
          type: "toggle"
        }
    },

    {
      id: SETTINGS_IDS.SHOW_QUEUE,
      title: "Show queue button",
      description:
      "Show access to the queue and playlist panel.",
      category: "Mini Player",
      kind: "boolean",
      default: true,
        widget: {
          type: "toggle"
        }
    },

    {
      id: SETTINGS_IDS.AUTOSCROLL,
      title: "Auto-scroll lyrics",
      description:
      "Keep the active synced lyric line in view.",
      category: "Lyrics",
      kind: "boolean",
      default: true,
        widget: {
          type: "toggle"
        }
    },

    {
      id: SETTINGS_IDS.PREFER_SYNCED,
      title: "Prefer synced lyrics",
      description:
      "Prefer timestamped lyrics when available.",
      category: "Lyrics",
      kind: "boolean",
      default: true,
        widget: {
          type: "toggle"
        }
    },

    {
      id: SETTINGS_IDS.THEME_SYNC,
      title: "Sync theme accent",
      description:
      "Match the mini player accent to Nuclear.",
      category: "Mini Player",
      kind: "boolean",
      default: true,
        widget: {
          type: "toggle"
        }
    },

    {
      id: SETTINGS_IDS.FONT_SIZE,
      title: "Lyrics font size",
      description:
      "Set the default size used for lyrics.",
      category: "Lyrics",
      kind: "number",
      default: 16,
        min: 12,
        max: 28,
        step: 1,
        unit: "px",
        widget: {
          type: "slider",
          min: 12,
          max: 28,
          step: 1,
          unit: "px",
          startLabel: "Small",
          endLabel: "Large"
        }
    },

    {
      id: SETTINGS_IDS.LANGUAGE,
      title: "Language",
      description:
      "Change the Mini Player interface language.",
      category: "Mini Player",
      kind: "enum",
      options: LANGUAGE_OPTIONS,
      default: "en",
        widget: {
          type: "select"
        }
    }
  ]);
}

async function getSetting(id, fallback) {
  try {
    const value =
    await api.Settings.get(id);

    if (
      value === undefined ||
      value === null
    ) {
      return fallback;
    }

    return value;
  } catch (error) {
    log(`failed to read setting ${id}`, error);
    return fallback;
  }
}

async function loadSettings() {
  state.settings.ambientGlow =
  Boolean(
    await getSetting(
      SETTINGS_IDS.AMBIENT_GLOW,
      DEFAULT_SETTINGS.ambientGlow
    )
  );

  state.settings.cleanLyrics =
  Boolean(
    await getSetting(
      SETTINGS_IDS.CLEAN_LYRICS,
      DEFAULT_SETTINGS.cleanLyrics
    )
  );

  state.settings.showBgColor =
  Boolean(
    await getSetting(
      SETTINGS_IDS.SHOW_BG_COLOR,
      DEFAULT_SETTINGS.showBgColor
    )
  );

  state.settings.showQueue =
  Boolean(
    await getSetting(
      SETTINGS_IDS.SHOW_QUEUE,
      DEFAULT_SETTINGS.showQueue
    )
  );

  state.settings.autoscroll =
  Boolean(
    await getSetting(
      SETTINGS_IDS.AUTOSCROLL,
      DEFAULT_SETTINGS.autoscroll
    )
  );

  state.settings.preferSynced =
  Boolean(
    await getSetting(
      SETTINGS_IDS.PREFER_SYNCED,
      DEFAULT_SETTINGS.preferSynced
    )
  );

  state.settings.themeSync =
  Boolean(
    await getSetting(
      SETTINGS_IDS.THEME_SYNC,
      DEFAULT_SETTINGS.themeSync
    )
  );

  state.settings.fontSize = clamp(
    Number(
      await getSetting(
        SETTINGS_IDS.FONT_SIZE,
        DEFAULT_SETTINGS.fontSize
      )
    ) || DEFAULT_SETTINGS.fontSize,
    12,
    28
  );

  const language =
  await getSetting(
    SETTINGS_IDS.LANGUAGE,
    DEFAULT_SETTINGS.language
  );

  state.settings.language =
  TEXT[language]
  ? language
  : DEFAULT_SETTINGS.language;
}

function subscribeSetting(id, callback) {
  if (!api?.Settings?.subscribe) {
    return;
  }

  const unsubscribe =
  api.Settings.subscribe(
    id,
    callback
  );

  addCleanup(unsubscribe);
}

function setupSettingSubscriptions() {
  subscribeSetting(
    SETTINGS_IDS.AMBIENT_GLOW,
    (value) => {
      state.settings.ambientGlow =
      Boolean(value);

      applySettings();
    }
  );

  subscribeSetting(
    SETTINGS_IDS.CLEAN_LYRICS,
    (value) => {
      state.settings.cleanLyrics =
      Boolean(value);

      if (state.lyrics.raw) {
        state.lyrics.lines =
        parseLrc(state.lyrics.raw);

        renderLyrics();
      }
    }
  );

  subscribeSetting(
    SETTINGS_IDS.SHOW_BG_COLOR,
    (value) => {
      state.settings.showBgColor =
      Boolean(value);

      applySettings();
    }
  );

  subscribeSetting(
    SETTINGS_IDS.SHOW_QUEUE,
    (value) => {
      state.settings.showQueue =
      Boolean(value);

      if (!state.settings.showQueue) {
        closeQueue();
      }

      applySettings();
    }
  );

  subscribeSetting(
    SETTINGS_IDS.AUTOSCROLL,
    (value) => {
      state.settings.autoscroll =
      Boolean(value);
    }
  );

  subscribeSetting(
    SETTINGS_IDS.PREFER_SYNCED,
    (value) => {
      const changed =
      state.settings.preferSynced !==
      Boolean(value);

      state.settings.preferSynced =
      Boolean(value);

      if (changed && state.track) {
        loadLyrics(
          state.track,
          true
        );
      }
    }
  );

  subscribeSetting(
    SETTINGS_IDS.THEME_SYNC,
    (value) => {
      state.settings.themeSync =
      Boolean(value);

      applySettings();

      if (state.settings.themeSync) {
        updateTheme();
      }
    }
  );

  subscribeSetting(
    SETTINGS_IDS.FONT_SIZE,
    (value) => {
      state.settings.fontSize = clamp(
        Number(value) || 16,
                                      12,
                                      28
      );

      applySettings();
      renderLyrics();
    }
  );

  subscribeSetting(
    SETTINGS_IDS.LANGUAGE,
    (value) => {
      if (!TEXT[value]) {
        return;
      }

      state.settings.language = value;

      renderInterfaceText();
      renderQueuePanel();
      renderLyrics();
      syncDetachedPlayer();
    }
  );
}

function applySettings() {
  if (!panel) {
    return;
  }

  panel.classList.toggle(
    "nuke-mp-no-glow",
    !state.settings.ambientGlow
  );

  panel.classList.toggle(
    "nuke-mp-no-background",
    !state.settings.showBgColor
  );

  panel.style.setProperty(
    "--nuke-mp-lyrics-size",
    `${state.settings.fontSize}px`
  );

  panel.style.setProperty(
    "--nuke-mp-accent",
    state.accent
  );

  if (queuePanel) {
    queuePanel.style.setProperty(
      "--nuke-mp-accent",
      state.accent
    );
  }

  const queueButton =
  document.getElementById(
    "nuke-mp-queue-button"
  );

  if (queueButton) {
    queueButton.hidden =
    !state.settings.showQueue;
  }

  updateBackgroundArtwork();
}

// player

const ICONS = {
  queue: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M8 6h13"/>
  <path d="M8 12h13"/>
  <path d="M8 18h13"/>
  <path d="M3 6h.01"/>
  <path d="M3 12h.01"/>
  <path d="M3 18h.01"/>
  </svg>
  `,

  lyrics: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
  <path d="M14 2v6h6"/>
  <path d="M8 13h8"/>
  <path d="M8 17h6"/>
  </svg>
  `,

  copy: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <rect x="9" y="9" width="12" height="12" rx="2"/>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
  `,

  refresh: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M21 12a9 9 0 1 1-3-6.7"/>
  <path d="M21 4v6h-6"/>
  </svg>
  `,

  fullscreen: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
  <path d="M16 3h3a2 2 0 0 1 2 2v3"/>
  <path d="M21 16v3a2 2 0 0 1-2 2h-3"/>
  <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
  </svg>
  `,

  close: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M18 6 6 18"/>
  <path d="m6 6 12 12"/>
  </svg>
  `,

  detach: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M14 5h5v5"/>
  <path d="m19 5-7 7"/>
  <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>
  </svg>
  `,

  play: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path
  d="m8 5 11 7-11 7V5Z"
  fill="currentColor"
  stroke="none"
  />
  </svg>
  `,

  pause: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M7 5v14"/>
  <path d="M17 5v14"/>
  </svg>
  `,

  previous: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="m18 5-9 7 9 7V5Z"/>
  <path d="M5 5v14"/>
  </svg>
  `,

  next: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="m6 5 9 7-9 7V5Z"/>
  <path d="M19 5v14"/>
  </svg>
  `,

  volume: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M3 10v4h4l5 4V6l-5 4H3Z"/>
  <path d="M16 9a5 5 0 0 1 0 6"/>
  <path d="M19 6a9 9 0 0 1 0 12"/>
  </svg>
  `,

  mute: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M3 10v4h4l5 4V6l-5 4H3Z"/>
  <path d="m17 9 4 4"/>
  <path d="m21 9-4 4"/>
  </svg>
  `,

  back: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="m15 18-6-6 6-6"/>
  </svg>
  `,

  remove: `
  <svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M5 7h14"/>
  <path d="M10 11v6"/>
  <path d="M14 11v6"/>
  <path d="m9 7 1-2h4l1 2"/>
  <path d="M7 7l1 14h8l1-14"/>
  </svg>
  `
};

function buildPlayer() {
  document.getElementById(
    "nuke-mp-panel"
  )?.remove();

  panel = createElement(
    "section",
    "nuke-mp-panel"
  );

  panel.id = "nuke-mp-panel";
  panel.setAttribute(
    "aria-label",
    "Nuclear Mini Player"
  );

  const header = createElement(
    "div",
    "nuke-mp-header"
  );

  const brand = createElement(
    "div",
    "nuke-mp-brand"
  );

  const brandName = createElement(
    "span",
    "nuke-mp-brand-name",
    "nuclear"
  );

  const separator = createElement(
    "span",
    "nuke-mp-brand-separator",
    "|"
  );

  const brandMode = createElement(
    "span",
    "nuke-mp-brand-mode"
  );

  brandMode.id =
  "nuke-mp-brand-mode";

    brand.append(
      brandName,
      separator,
      brandMode
    );

    const headerActions = createElement(
      "div",
      "nuke-mp-header-actions"
    );

    const detach = createButton(
      "nuke-mp-icon-button",
      text("detach"),
                                ICONS.detach
    );

    detach.id =
    "nuke-mp-detach-button";

      const fullscreen = createButton(
        "nuke-mp-icon-button",
        text("fullscreen"),
                                      ICONS.fullscreen
      );

      fullscreen.id =
      "nuke-mp-fullscreen-button";

        const close = createButton(
          "nuke-mp-icon-button",
          text("close"),
                                   ICONS.close
        );

        close.id =
        "nuke-mp-close-button";

          headerActions.append(
            detach,
            fullscreen,
            close
          );

          header.append(
            brand,
            headerActions
          );

          const body = createElement(
            "div",
            "nuke-mp-body"
          );

          const artwork = createElement(
            "div",
            "nuke-mp-artwork"
          );

          artwork.id =
          "nuke-mp-artwork";

            const image = createElement(
              "img",
              "nuke-mp-art-image"
            );

            image.id =
            "nuke-mp-art-image";

              image.alt = "";
              image.draggable = false;
              image.hidden = true;

              const placeholder = createElement(
                "div",
                "nuke-mp-art-placeholder",
                "N"
              );

              artwork.append(
                image,
                placeholder
              );

              const metadata = createElement(
                "div",
                "nuke-mp-metadata"
              );

              const title = createElement(
                "div",
                "nuke-mp-title"
              );

              title.id =
              "nuke-mp-title";

                const artist = createElement(
                  "div",
                  "nuke-mp-artist"
                );

                artist.id =
                "nuke-mp-artist";

                  metadata.append(
                    title,
                    artist
                  );

                  const controls = createElement(
                    "div",
                    "nuke-mp-controls"
                  );

                  const previous = createButton(
                    "nuke-mp-control-button",
                    text("previous"),
                                                ICONS.previous
                  );

                  previous.id =
                  "nuke-mp-previous-button";

                    const play = createButton(
                      "nuke-mp-play-button",
                      text("play"),
                                              ICONS.play
                    );

                    play.id =
                    "nuke-mp-play-button";

                      const next = createButton(
                        "nuke-mp-control-button",
                        text("next"),
                                                ICONS.next
                      );

                      next.id =
                      "nuke-mp-next-button";

                        controls.append(
                          previous,
                          play,
                          next
                        );

                        const progress = createElement(
                          "div",
                          "nuke-mp-progress"
                        );

                        const currentTime = createElement(
                          "span",
                          "nuke-mp-time",
                          "0:00"
                        );

                        currentTime.id =
                        "nuke-mp-current-time";

                          const seek = createElement(
                            "input",
                            "nuke-mp-seek"
                          );

                          seek.id =
                          "nuke-mp-seek";

                            seek.type = "range";
                            seek.min = "0";
                            seek.max = "0";
                            seek.value = "0";
                            seek.step = "0.01";
                            seek.setAttribute(
                              "aria-label",
                              "Seek"
                            );

                            const duration = createElement(
                              "span",
                              "nuke-mp-time",
                              "0:00"
                            );

                            duration.id =
                            "nuke-mp-duration";

                              progress.append(
                                currentTime,
                                seek,
                                duration
                              );

                              body.append(
                                artwork,
                                metadata,
                                controls,
                                progress
                              );

                              const footer = createElement(
                                "div",
                                "nuke-mp-footer"
                              );

                              const footerLeft = createElement(
                                "div",
                                "nuke-mp-footer-left"
                              );

                              const footerRight = createElement(
                                "div",
                                "nuke-mp-footer-right"
                              );

                              const volume = createButton(
                                "nuke-mp-icon-button",
                                text("mute"),
                                                          ICONS.volume
                              );

                              volume.id =
                              "nuke-mp-volume-button";

                                const lyrics = createButton(
                                  "nuke-mp-icon-button",
                                  text("lyrics"),
                                                            ICONS.lyrics
                                );

                                lyrics.id =
                                "nuke-mp-lyrics-button";

                                  const queue = createButton(
                                    "nuke-mp-icon-button",
                                    text("queue"),
                                                             ICONS.queue
                                  );

                                  queue.id =
                                  "nuke-mp-queue-button";

                                    footerLeft.append(volume);
                                    footerRight.append(
                                      lyrics,
                                      queue
                                    );

                                    footer.append(
                                      footerLeft,
                                      footerRight
                                    );

                                    const lyricsPanel =
                                    buildLyricsPanel();

                                    panel.append(
                                      header,
                                      body,
                                      footer,
                                      lyricsPanel
                                    );

                                    document.body.appendChild(panel);

                                    bindPlayerEvents();
                                    applySettings();
                                    renderInterfaceText();
}

function buildLyricsPanel() {
  const wrapper = createElement(
    "section",
    "nuke-mp-lyrics-panel"
  );

  wrapper.id =
  "nuke-mp-lyrics-panel";

    const toolbar = createElement(
      "div",
      "nuke-mp-lyrics-toolbar"
    );

    const heading = createElement(
      "div",
      "nuke-mp-lyrics-heading"
    );

    const title = createElement(
      "span",
      "nuke-mp-lyrics-title",
      text("lyrics")
    );

    title.id =
    "nuke-mp-lyrics-title";

      const source = createElement(
        "span",
        "nuke-mp-lyrics-source"
      );

      source.id =
      "nuke-mp-lyrics-source";

        heading.append(
          title,
          source
        );

        const actions = createElement(
          "div",
          "nuke-mp-lyrics-actions"
        );

        const decrease = createButton(
          "nuke-mp-icon-button",
          text("decreaseText"),
                                      `<span class="nuke-mp-text-button">A−</span>`
        );

        decrease.id =
        "nuke-mp-lyrics-decrease";

          const increase = createButton(
            "nuke-mp-icon-button",
            text("increaseText"),
                                        `<span class="nuke-mp-text-button">A+</span>`
          );

          increase.id =
          "nuke-mp-lyrics-increase";

            const copy = createButton(
              "nuke-mp-icon-button",
              text("copy"),
                                      ICONS.copy
            );

            copy.id =
            "nuke-mp-lyrics-copy";

              const refresh = createButton(
                "nuke-mp-icon-button",
                text("refresh"),
                                           ICONS.refresh
              );

              refresh.id =
              "nuke-mp-lyrics-refresh";

                const close = createButton(
                  "nuke-mp-icon-button",
                  text("close"),
                                           ICONS.close
                );

                close.id =
                "nuke-mp-lyrics-close";

                  actions.append(
                    decrease,
                    increase,
                    copy,
                    refresh,
                    close
                  );

                  toolbar.append(
                    heading,
                    actions
                  );

                  const body = createElement(
                    "div",
                    "nuke-mp-lyrics-body"
                  );

                  body.id =
                  "nuke-mp-lyrics-body";

                    wrapper.append(
                      toolbar,
                      body
                    );

                    return wrapper;
}

function bindPlayerEvents() {
  document
  .getElementById(
    "nuke-mp-previous-button"
  )
  ?.addEventListener(
    "click",
    playPrevious
  );

  document
  .getElementById(
    "nuke-mp-play-button"
  )
  ?.addEventListener(
    "click",
    togglePlayback
  );

  document
  .getElementById(
    "nuke-mp-next-button"
  )
  ?.addEventListener(
    "click",
    playNext
  );

  document
  .getElementById(
    "nuke-mp-volume-button"
  )
  ?.addEventListener(
    "click",
    toggleMute
  );

  document
  .getElementById(
    "nuke-mp-queue-button"
  )
  ?.addEventListener(
    "click",
    toggleQueue
  );

  document
  .getElementById(
    "nuke-mp-lyrics-button"
  )
  ?.addEventListener(
    "click",
    toggleLyrics
  );

  document
  .getElementById(
    "nuke-mp-close-button"
  )
  ?.addEventListener(
    "click",
    hidePlayer
  );

  document
  .getElementById(
    "nuke-mp-fullscreen-button"
  )
  ?.addEventListener(
    "click",
    toggleFullscreen
  );

  document
  .getElementById(
    "nuke-mp-detach-button"
  )
  ?.addEventListener(
    "click",
    toggleDetachedPlayer
  );

  document
  .getElementById(
    "nuke-mp-lyrics-close"
  )
  ?.addEventListener(
    "click",
    closeLyrics
  );

  document
  .getElementById(
    "nuke-mp-lyrics-copy"
  )
  ?.addEventListener(
    "click",
    copyLyrics
  );

  document
  .getElementById(
    "nuke-mp-lyrics-refresh"
  )
  ?.addEventListener(
    "click",
    refreshLyrics
  );

  document
  .getElementById(
    "nuke-mp-lyrics-decrease"
  )
  ?.addEventListener(
    "click",
    () => changeFontSize(-1)
  );

  document
  .getElementById(
    "nuke-mp-lyrics-increase"
  )
  ?.addEventListener(
    "click",
    () => changeFontSize(1)
  );

  const seek =
  document.getElementById(
    "nuke-mp-seek"
  );

  seek?.addEventListener(
    "pointerdown",
    () => {
      seek.dataset.dragging = "true";
    }
  );

  seek?.addEventListener(
    "pointerup",
    () => {
      seek.dataset.dragging = "false";
    }
  );

  seek?.addEventListener(
    "change",
    () => {
      seek.dataset.dragging = "false";
    }
  );

  seek?.addEventListener(
    "input",
    async () => {
      const value = Number(
        seek.value
      );

      if (!Number.isFinite(value)) {
        return;
      }

      await seekTo(value);
    }
  );

  const header =
  panel?.querySelector(
    ".nuke-mp-header"
  );

  header?.addEventListener(
    "dblclick",
    (event) => {
      if (
        event.target.closest("button")
      ) {
        return;
      }

      toggleFullscreen();
    }
  );

  header?.addEventListener(
    "pointerdown",
    startDragging
  );

  header?.addEventListener(
    "pointermove",
    moveDragging
  );

  header?.addEventListener(
    "pointerup",
    stopDragging
  );

  header?.addEventListener(
    "pointercancel",
    stopDragging
  );

  const outsideClickHandler =
  (event) => {
    if (!state.queueOpen) {
      return;
    }

    if (
      queuePanel?.contains(event.target) ||
      panel?.contains(event.target)
    ) {
      return;
    }

    closeQueue();
  };

  document.addEventListener(
    "pointerdown",
    outsideClickHandler,
    true
  );

  addCleanup(() =>
  document.removeEventListener(
    "pointerdown",
    outsideClickHandler,
    true
  )
  );

  const keyboardHandler =
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (state.queueOpen) {
      closeQueue();
      return;
    }

    if (state.lyricsOpen) {
      closeLyrics();
      return;
    }

    if (state.fullscreen) {
      state.fullscreen = false;
      applyFullscreen();
    }
  };

  window.addEventListener(
    "keydown",
    keyboardHandler
  );

  addCleanup(() =>
  window.removeEventListener(
    "keydown",
    keyboardHandler
  )
  );
}

function startDragging(event) {
  if (
    event.button !== 0 ||
    event.target.closest("button")
  ) {
    return;
  }

  state.dragging = true;
  state.dragStartX =
  event.clientX -
  state.dragOffsetX;

  state.dragStartY =
  event.clientY -
  state.dragOffsetY;

  event.currentTarget.setPointerCapture(
    event.pointerId
  );
}

function moveDragging(event) {
  if (!state.dragging) {
    return;
  }

  state.dragOffsetX =
  event.clientX -
  state.dragStartX;

  state.dragOffsetY =
  event.clientY -
  state.dragStartY;

  panel.style.translate =
  `${state.dragOffsetX}px ${state.dragOffsetY}px`;
}

function stopDragging(event) {
  if (!state.dragging) {
    return;
  }

  state.dragging = false;

  try {
    event.currentTarget.releasePointerCapture(
      event.pointerId
    );
  } catch (_) {}
}

function updateTrackUI() {
  const title =
  document.getElementById(
    "nuke-mp-title"
  );

  const artist =
  document.getElementById(
    "nuke-mp-artist"
  );

  if (!title || !artist) {
    return;
  }

  const hasTrack =
  Boolean(state.track);

  title.textContent =
  hasTrack
  ? state.track.displayTitle
  : text("nothingPlaying");

  artist.textContent =
  hasTrack
  ? state.track.displayArtist
  : text("pickTrack");

  panel?.classList.toggle(
    "nuke-mp-idle",
    !hasTrack
  );

  const image =
  document.getElementById(
    "nuke-mp-art-image"
  );

  if (image) {
    image.alt =
    state.track?.displayTitle || "";
  }

  updateBackgroundArtwork();
}

function updatePlaybackUI() {
  const play =
  document.getElementById(
    "nuke-mp-play-button"
  );

  if (play) {
    play.innerHTML =
    state.playback.status === "playing"
    ? ICONS.pause
    : ICONS.play;

    const label =
    state.playback.status === "playing"
    ? text("pause")
    : text("play");

    play.setAttribute(
      "aria-label",
      label
    );
  }

  updateProgressUI();

  const volume =
  document.getElementById(
    "nuke-mp-volume-button"
  );

  if (!volume) {
    return;
  }

  const audio =
  getAudioElement();

  const muted =
  Boolean(
    audio?.muted ||
    audio?.volume === 0
  );

  volume.innerHTML =
  muted
  ? ICONS.mute
  : ICONS.volume;

  const label =
  muted
  ? text("unmute")
  : text("mute");

  volume.setAttribute(
    "aria-label",
    label
  );
}

function updateProgressUI() {
  const seek =
  document.getElementById(
    "nuke-mp-seek"
  );

  const current =
  document.getElementById(
    "nuke-mp-current-time"
  );

  const duration =
  document.getElementById(
    "nuke-mp-duration"
  );

  if (!seek || !current || !duration) {
    return;
  }

  const total =
  state.playback.duration ||
  state.track?.duration ||
  0;

  seek.max = String(total);

  if (
    seek.dataset.dragging !== "true"
  ) {
    seek.value = String(
      clamp(
        state.playback.seek,
        0,
        total || state.playback.seek
      )
    );
  }

  current.textContent =
  formatTime(state.playback.seek);

  duration.textContent =
  formatTime(total);

  const percentage =
  total > 0
  ? clamp(
    (state.playback.seek / total) * 100,
          0,
          100
  )
  : 0;

  seek.style.setProperty(
    "--nuke-mp-progress",
    `${percentage}%`
  );
}

function renderInterfaceText() {
  if (!panel) {
    return;
  }

  const mapping = [
    [
      "nuke-mp-detach-button",
      text("detach")
    ],
    [
      "nuke-mp-fullscreen-button",
      state.fullscreen
      ? text("exitFullscreen")
      : text("fullscreen")
    ],
    [
      "nuke-mp-close-button",
      text("close")
    ],
    [
      "nuke-mp-previous-button",
      text("previous")
    ],
    [
      "nuke-mp-next-button",
      text("next")
    ],
    [
      "nuke-mp-volume-button",
      text("mute")
    ],
    [
      "nuke-mp-lyrics-button",
      text("lyrics")
    ],
    [
      "nuke-mp-queue-button",
      text("queue")
    ],
    [
      "nuke-mp-lyrics-decrease",
      text("decreaseText")
    ],
    [
      "nuke-mp-lyrics-increase",
      text("increaseText")
    ],
    [
      "nuke-mp-lyrics-copy",
      text("copy")
    ],
    [
      "nuke-mp-lyrics-refresh",
      text("refresh")
    ],
    [
      "nuke-mp-lyrics-close",
      text("close")
    ]
  ];

  for (const [id, label] of mapping) {
    const element =
    document.getElementById(id);

    if (!element) {
      continue;
    }

    element.setAttribute(
      "aria-label",
      label
    );
  }

  const mode =
  document.getElementById(
    "nuke-mp-brand-mode"
  );

  if (mode) {
    mode.textContent =
    text("player");
  }

  const lyricsTitle =
  document.getElementById(
    "nuke-mp-lyrics-title"
  );

  if (lyricsTitle) {
    lyricsTitle.textContent =
    text("lyrics");
  }

  renderInterfaceSource();
  updatePlaybackUI();
}

function renderInterfaceSource() {
  const source =
  document.getElementById(
    "nuke-mp-lyrics-source"
  );

  if (!source) {
    return;
  }

  source.textContent =
  state.lyrics.source
  ? `${text("source")}: ${state.lyrics.source}`
  : "";
}

function hidePlayer() {
  state.hidden = true;
  panel?.classList.add(
    "nuke-mp-hidden"
  );
  closeQueue();
  closeLyrics();
}

function showPlayer() {
  state.hidden = false;
  panel?.classList.remove(
    "nuke-mp-hidden"
  );
}

function toggleFullscreen() {
  state.fullscreen =
  !state.fullscreen;

  applyFullscreen();
}

function applyFullscreen() {
  panel?.classList.toggle(
    "nuke-mp-fullscreen",
    state.fullscreen
  );

  const fullscreen =
  document.getElementById(
    "nuke-mp-fullscreen-button"
  );

  if (fullscreen) {
    const label =
    state.fullscreen
    ? text("exitFullscreen")
    : text("fullscreen");

    fullscreen.setAttribute(
      "aria-label",
      label
    );
  }
}

async function togglePlayback() {
  if (api?.Playback?.toggle) {
    try {
      await api.Playback.toggle();
      return;
    } catch (error) {
      log(
        "playback toggle failed",
        error
      );
    }
  }

  const audio =
  getAudioElement();

  if (audio) {
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (_) {}

    updatePlaybackUI();
  }
}

async function playPrevious() {
  if (api?.Queue?.goToPrevious) {
    try {
      await api.Queue.goToPrevious();
      return;
    } catch (error) {
      log(
        "previous track failed",
        error
      );
    }
  }

  if (api?.Playback?.previousTrack) {
    try {
      await api.Playback.previousTrack();
      return;
    } catch (error) {
      log(
        "previous track fallback failed",
        error
      );
    }
  }

  log(
    "Queue.goToPrevious is unavailable"
  );
}

async function playNext() {
  if (api?.Queue?.goToNext) {
    try {
      await api.Queue.goToNext();
      return;
    } catch (error) {
      log(
        "next track failed",
        error
      );
    }
  }

  if (api?.Playback?.nextTrack) {
    try {
      await api.Playback.nextTrack();
      return;
    } catch (error) {
      log(
        "next track fallback failed",
        error
      );
    }
  }

  log(
    "Queue.goToNext is unavailable"
  );
}

function toggleMute() {
  const audio =
  getAudioElement();

  if (!audio) {
    return;
  }

  if (
    audio.muted ||
    audio.volume === 0
  ) {
    audio.muted = false;

    if (audio.volume === 0) {
      audio.volume =
      state.lastVolume || 0.8;
    }

    return;
  }

  state.lastVolume =
  audio.volume || 0.8;

  audio.muted = true;

  updatePlaybackUI();
}

async function refreshLyrics() {
  if (!state.track) {
    return;
  }

  await loadLyrics(
    state.track,
    true
  );
}

async function changeFontSize(delta) {
  const next = clamp(
    state.settings.fontSize + delta,
    12,
    28
  );

  try {
    await api.Settings.set(
      SETTINGS_IDS.FONT_SIZE,
      next
    );
  } catch (error) {
    log(
      "font size update failed",
      error
    );
  }
}

// lyrics UI

function toggleLyrics() {
  state.lyricsOpen =
  !state.lyricsOpen;

  if (state.lyricsOpen) {
    closeQueue();
  }

  panel?.classList.toggle(
    "nuke-mp-lyrics-open",
    state.lyricsOpen
  );

  renderLyrics();
}

function closeLyrics() {
  state.lyricsOpen = false;

  panel?.classList.remove(
    "nuke-mp-lyrics-open"
  );

  renderLyrics();
}

async function copyLyrics() {
  if (!state.lyrics.raw) {
    return;
  }

  try {
    await navigator.clipboard.writeText(
      state.lyrics.raw.trim()
    );

    showToast(
      text("copied")
    );
  } catch (error) {
    log(
      "clipboard failed",
      error
    );
  }
}

function renderLyricsStatus(message) {
  const body =
  document.getElementById(
    "nuke-mp-lyrics-body"
  );

  if (!body) {
    return;
  }

  body.replaceChildren();

  const status = createElement(
    "div",
    "nuke-mp-lyrics-status",
    message
  );

  body.appendChild(status);
}

function renderLyrics() {
  const lyricsPanel =
  document.getElementById(
    "nuke-mp-lyrics-panel"
  );

  const body =
  document.getElementById(
    "nuke-mp-lyrics-body"
  );

  if (!lyricsPanel || !body) {
    return;
  }

  lyricsPanel.hidden =
  !state.lyricsOpen;

  renderInterfaceSource();

  body.replaceChildren();

  if (!state.track) {
    renderLyricsStatus(
      text("waitingPlayback")
    );

    return;
  }

  if (state.lyrics.loading) {
    renderLyricsStatus(
      text("searchingLyrics")
    );

    return;
  }

  if (state.lyrics.error) {
    renderLyricsStatus(
      text("lyricsUnavailable")
    );

    return;
  }

  if (
    !state.lyrics.raw &&
    !state.lyrics.lines.length
  ) {
    renderLyricsStatus(
      text("noLyrics")
    );

    return;
  }

  if (!state.lyrics.lines.length) {
    const plain = createElement(
      "div",
      "nuke-mp-lyrics-plain",
      state.lyrics.raw
    );

    body.appendChild(plain);
    return;
  }

  const list = createElement(
    "div",
    "nuke-mp-lyrics-list"
  );

  list.style.setProperty(
    "--nuke-mp-lyrics-size",
    `${state.settings.fontSize}px`
  );

  state.lyrics.lines.forEach(
    (line, index) => {
      const element =
      createElement(
        state.lyrics.synced
        ? "button"
        : "div",
        "nuke-mp-lyric-line"
      );

      if (state.lyrics.synced) {
        element.type = "button";
      }

      element.dataset.index =
      String(index);

      element.textContent =
      line.text;

      if (
        index ===
        state.lyrics.activeIndex
      ) {
        element.classList.add(
          "active"
        );
      }

      if (
        state.lyrics.synced &&
        line.time >= 0
      ) {
        element.classList.add(
          "clickable"
        );

        element.addEventListener(
          "click",
          () => {
            seekTo(line.time);
          }
        );
      }

      list.appendChild(
        element
      );
    }
  );

  body.appendChild(list);

  if (
    state.lyrics.synced &&
    state.lyrics.activeIndex >= 0 &&
    state.settings.autoscroll
  ) {
    requestAnimationFrame(
      () => {
        const active =
        list.querySelector(
          ".nuke-mp-lyric-line.active"
        );

        active?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    );
  }
}

function updateActiveLyric() {
  if (
    !state.lyrics.synced ||
    !state.lyrics.lines.length
  ) {
    return;
  }

  const nextIndex =
  findCurrentLyric(
    state.lyrics.lines,
    state.playback.seek
  );

  if (
    nextIndex ===
    state.lyrics.activeIndex
  ) {
    return;
  }

  state.lyrics.activeIndex =
  nextIndex;

  const lines =
  panel?.querySelectorAll(
    ".nuke-mp-lyric-line"
  );

  lines?.forEach(
    (element) => {
      element.classList.toggle(
        "active",
        Number(element.dataset.index) ===
        nextIndex
      );
    }
  );

  if (
    !state.lyricsOpen ||
    !state.settings.autoscroll ||
    nextIndex < 0
  ) {
    return;
  }

  const active =
  panel?.querySelector(
    `.nuke-mp-lyric-line[data-index="${nextIndex}"]`
  );

  active?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

async function seekTo(seconds) {
  const target = Number(
    seconds
  );

  if (!Number.isFinite(target)) {
    return;
  }

  const duration =
  state.playback.duration ||
  state.track?.duration ||
  0;

  const value = clamp(
    target,
    0,
    duration || target
  );

  state.playback.seek =
  value;

  state.playback.updatedAt =
  performance.now();

  let seekDone = false;

  try {
    if (api?.Playback?.seekTo) {
      await api.Playback.seekTo(
        value
      );

      seekDone = true;
    }
  } catch (error) {
    log(
      "seek failed",
      error
    );
  }

  if (!seekDone) {
    const audio =
    getAudioElement();

    if (
      audio &&
      Number.isFinite(audio.duration)
    ) {
      audio.currentTime = clamp(
        value,
        0,
        audio.duration
      );
    }
  }

  updateProgressUI();
  updateActiveLyric();
  syncDetachedPlayer();
}

// queue

function normalizeQueue(queue) {
  if (!queue) {
    return {
      items: [],
      currentIndex: -1
    };
  }

  return {
    items: Array.isArray(queue.items)
    ? queue.items
    : [],
    currentIndex:
    Number.isInteger(
      queue.currentIndex
    )
    ? queue.currentIndex
    : -1
  };
}

function renderQueuePanel() {
  if (!queuePanel) {
    return;
  }

  queuePanel.hidden =
  !state.queueOpen;

  if (!state.queueOpen) {
    return;
  }

  const title =
  queuePanel.querySelector(
    ".nuke-mp-queue-title"
  );

  if (title) {
    title.textContent =
    state.queueView === "queue"
    ? text("queue")
    : state.selectedPlaylist
    ? state.selectedPlaylist.name
    : text("playlists");
  }

  const queueTab =
  queuePanel.querySelector(
    '[data-nuke-mp-tab="queue"]'
  );

  const playlistTab =
  queuePanel.querySelector(
    '[data-nuke-mp-tab="playlists"]'
  );

  queueTab?.classList.toggle(
    "active",
    state.queueView === "queue"
  );

  playlistTab?.classList.toggle(
    "active",
    state.queueView === "playlists"
  );

  const content =
  queuePanel.querySelector(
    ".nuke-mp-queue-content"
  );

  if (!content) {
    return;
  }

  if (
    state.queueView === "playlists"
  ) {
    if (state.selectedPlaylist) {
      renderPlaylistDetails(
        content
      );
    } else {
      renderPlaylistList(
        content
      );
    }

    return;
  }

  renderQueueItems(content);
}

function renderQueueItems(content) {
  content.replaceChildren();

  if (!state.queue.items.length) {
    renderQueueEmpty(
      content,
      text("noQueue")
    );

    return;
  }

  const list = createElement(
    "div",
    "nuke-mp-list"
  );

  state.queue.items.forEach(
    (item, index) => {
      const track =
      normalizeTrack(
        item.track
      );

      if (!track) {
        return;
      }

      const row = createElement(
        "div",
        "nuke-mp-queue-row"
      );

      const main = createElement(
        "button",
        "nuke-mp-queue-main"
      );

      main.type = "button";

      const number = createElement(
        "span",
        "nuke-mp-list-number",
        String(index + 1).padStart(
          2,
          "0"
        )
      );

      const info = createElement(
        "span",
        "nuke-mp-list-info"
      );

      const title = createElement(
        "span",
        "nuke-mp-list-title",
        track.displayTitle
      );

      const artist = createElement(
        "span",
        "nuke-mp-list-artist",
        track.displayArtist
      );

      info.append(
        title,
        artist
      );

      if (
        index ===
        state.queue.currentIndex
      ) {
        row.classList.add(
          "current"
        );

        const current =
        createElement(
          "span",
          "nuke-mp-current-badge",
          text("current")
        );

        info.appendChild(
          current
        );
      }

      main.append(
        number,
        info
      );

      main.addEventListener(
        "click",
        async () => {
          try {
            await api.Queue.goToIndex(
              index
            );

            closeQueue();
          } catch (error) {
            log(
              "queue navigation failed",
              error
            );
          }
        }
      );

      const remove =
      createButton(
        "nuke-mp-remove-button",
        text("remove"),
                   ICONS.remove
      );

      remove.addEventListener(
        "click",
        async (event) => {
          event.stopPropagation();

          try {
            if (
              item?.id &&
              api.Queue.removeByIds
            ) {
              await api.Queue.removeByIds(
                [item.id]
              );
            } else if (
              api.Queue.removeByIndices
            ) {
              await api.Queue.removeByIndices(
                [index]
              );
            }
          } catch (error) {
            log(
              "queue removal failed",
              error
            );
          }
        }
      );

      row.append(
        main,
        remove
      );

      list.appendChild(row);
    }
  );

  content.appendChild(list);

  const footer = createElement(
    "div",
    "nuke-mp-queue-footer"
  );

  const clear = createElement(
    "button",
    "nuke-mp-clear-button",
    text("clearQueue")
  );

  clear.type = "button";

  clear.addEventListener(
    "click",
    async () => {
      try {
        await api.Queue.clearQueue();
      } catch (error) {
        log(
          "clear queue failed",
          error
        );
      }
    }
  );

  footer.appendChild(clear);
  content.appendChild(footer);
}

function renderQueueEmpty(
  content,
  message
) {
  const empty = createElement(
    "div",
    "nuke-mp-queue-empty",
    message
  );

  content.appendChild(empty);
}

function renderPlaylistList(content) {
  content.replaceChildren();

  if (state.playlistsLoading) {
    renderQueueEmpty(
      content,
      text("loading")
    );

    return;
  }

  if (!state.playlists.length) {
    renderQueueEmpty(
      content,
      text("noPlaylists")
    );

    return;
  }

  const list = createElement(
    "div",
    "nuke-mp-list"
  );

  state.playlists.forEach(
    (playlist) => {
      const button =
      createElement(
        "button",
        "nuke-mp-playlist-row"
      );

      button.type =
      "button";

    const artwork =
    createElement(
      "div",
      "nuke-mp-playlist-art"
    );

    if (
      typeof playlist.artwork ===
      "string" &&
      playlist.artwork
    ) {
      artwork.style.backgroundImage =
      `url("${playlist.artwork.replaceAll('"', '\\"')}")`;
    }

    const info =
    createElement(
      "span",
      "nuke-mp-playlist-info"
    );

    const name =
    createElement(
      "span",
      "nuke-mp-playlist-name",
      playlist.name ||
      "Untitled"
    );

    const count =
    createElement(
      "span",
      "nuke-mp-playlist-count",
      String(
        playlist.itemCount ??
        playlist.items?.length ??
        ""
      )
    );

    info.append(
      name,
      count
    );

    button.append(
      artwork,
      info
    );

    button.addEventListener(
      "click",
      () =>
      openPlaylist(
        playlist.id
      )
    );

    list.appendChild(
      button
    );
    }
  );

  content.appendChild(list);
}

async function loadPlaylists() {
  if (
    !api?.Playlists?.getIndex
  ) {
    return;
  }

  state.playlistsLoading =
  true;

  renderQueuePanel();

  try {
    const index =
    await api.Playlists.getIndex();

    state.playlists =
    Array.isArray(index)
    ? index
    : [];
  } catch (error) {
    log(
      "playlist index failed",
      error
    );

    state.playlists = [];
  } finally {
    state.playlistsLoading =
    false;

    renderQueuePanel();
  }
}

async function openPlaylist(
  playlistId
) {
  if (
    !api?.Playlists?.getPlaylist
  ) {
    return;
  }

  state.playlistsLoading =
  true;

  renderQueuePanel();

  try {
    const playlist =
    await api.Playlists.getPlaylist(
      playlistId
    );

    state.selectedPlaylist =
    playlist;
  } catch (error) {
    log(
      "playlist load failed",
      error
    );

    state.selectedPlaylist =
    null;
  } finally {
    state.playlistsLoading =
    false;

    renderQueuePanel();
  }
}

function renderPlaylistDetails(
  content
) {
  content.replaceChildren();

  if (!state.selectedPlaylist) {
    return;
  }

  const header =
  createElement(
    "div",
    "nuke-mp-playlist-header"
  );

  const back =
  createButton(
    "nuke-mp-back-button",
    text("back"),
               ICONS.back
  );

  const name =
  createElement(
    "span",
    "nuke-mp-playlist-detail-name",
    state.selectedPlaylist.name ||
    "Untitled"
  );

  back.addEventListener(
    "click",
    () => {
      state.selectedPlaylist =
      null;

      renderQueuePanel();
    }
  );

  header.append(
    back,
    name
  );

  content.appendChild(
    header
  );

  const items =
  Array.isArray(
    state.selectedPlaylist.items
  )
  ? state.selectedPlaylist.items
  : [];

  if (!items.length) {
    renderQueueEmpty(
      content,
      text("playlistEmpty")
    );

    return;
  }

  const list =
  createElement(
    "div",
    "nuke-mp-list"
  );

  items.forEach(
    (item, index) => {
      const track =
      normalizeTrack(
        item?.track || item
      );

      if (!track) {
        return;
      }

      const button =
      createElement(
        "button",
        "nuke-mp-playlist-track"
      );

      button.type =
      "button";

    const number =
    createElement(
      "span",
      "nuke-mp-list-number",
      String(index + 1).padStart(
        2,
        "0"
      )
    );

    const info =
    createElement(
      "span",
      "nuke-mp-list-info"
    );

    const title =
    createElement(
      "span",
      "nuke-mp-list-title",
      track.displayTitle
    );

    const artist =
    createElement(
      "span",
      "nuke-mp-list-artist",
      track.displayArtist
    );

    info.append(
      title,
      artist
    );

    button.append(
      number,
      info
    );

    button.addEventListener(
      "click",
      async () => {
        try {
          await api.Queue.addNext(
            [track.raw]
          );

          showToast(
            text("added")
          );
        } catch (error) {
          log(
            "playlist add failed",
            error
          );
        }
      }
    );

    list.appendChild(
      button
    );
    }
  );

  content.appendChild(list);
}

function buildQueuePanel() {
  document.getElementById(
    "nuke-mp-queue-panel"
  )?.remove();

  queuePanel =
  createElement(
    "aside",
    "nuke-mp-queue-panel"
  );

  queuePanel.id =
  "nuke-mp-queue-panel";

    queuePanel.hidden =
    true;

    const header =
    createElement(
      "div",
      "nuke-mp-queue-header"
    );

    const title =
    createElement(
      "span",
      "nuke-mp-queue-title",
      text("queue")
    );

    const close =
    createButton(
      "nuke-mp-icon-button",
      text("close"),
                 ICONS.close
    );

    close.addEventListener(
      "click",
      closeQueue
    );

    header.append(
      title,
      close
    );

    const tabs =
    createElement(
      "div",
      "nuke-mp-tabs"
    );

    const queueTab =
    createElement(
      "button",
      "nuke-mp-tab",
      text("queue")
    );

    queueTab.type =
    "button";

      queueTab.dataset.nukeMpTab =
      "queue";

    const playlistTab =
    createElement(
      "button",
      "nuke-mp-tab",
      text("playlists")
    );

    playlistTab.type =
    "button";

      playlistTab.dataset.nukeMpTab =
      "playlists";

    queueTab.addEventListener(
      "click",
      () => {
        state.queueView =
        "queue";

      state.selectedPlaylist =
      null;

      renderQueuePanel();
      }
    );

    playlistTab.addEventListener(
      "click",
      async () => {
        state.queueView =
        "playlists";

      state.selectedPlaylist =
      null;

      renderQueuePanel();

      if (
        !state.playlists.length
      ) {
        await loadPlaylists();
      }
      }
    );

    tabs.append(
      queueTab,
      playlistTab
    );

    const content =
    createElement(
      "div",
      "nuke-mp-queue-content"
    );

    queuePanel.append(
      header,
      tabs,
      content
    );

    queuePanel.style.setProperty(
      "--nuke-mp-accent",
      state.accent
    );

    document.body.appendChild(
      queuePanel
    );
}

function toggleQueue() {
  if (!state.settings.showQueue) {
    return;
  }

  if (state.queueOpen) {
    closeQueue();
    return;
  }

  closeLyrics();

  state.queueOpen =
  true;

  state.queueView =
  "queue";

  state.selectedPlaylist =
  null;

  panel?.classList.add(
    "nuke-mp-queue-active"
  );

  renderQueuePanel();
}

function closeQueue() {
  state.queueOpen =
  false;

  state.selectedPlaylist =
  null;

  panel?.classList.remove(
    "nuke-mp-queue-active"
  );

  renderQueuePanel();
}

// playback subscriptions

function handlePlaybackState(
  playback
) {
  if (!playback) {
    return;
  }

  state.playback = {
    status:
    playback.status ||
    "stopped",
    seek:
    Number(playback.seek) || 0,
    duration:
    Number(playback.duration) || 0,
    updatedAt:
    performance.now()
  };

  updatePlaybackUI();
  updateActiveLyric();
  syncDetachedPlayer();
}

function handleQueueState(
  queue
) {
  const normalized =
  normalizeQueue(queue);

  state.queue =
  normalized;

  const currentItem =
  state.queue.items[
    state.queue.currentIndex
  ];

  state.queue.currentItemId =
  currentItem?.id || "";

  if (currentItem?.track) {
    const track =
    normalizeTrack(
      currentItem.track
    );

    if (
      !state.track ||
      !sameTrack(
        state.track,
        track
      )
    ) {
      handleTrackChange(
        currentItem.track
      );
    }
  }

  renderQueuePanel();
}

async function handleCurrentItem(
  item
) {
  if (!item?.track) {
    return;
  }

  const track =
  normalizeTrack(
    item.track
  );

  if (!track) {
    return;
  }

  const currentIndex =
  state.queue.items.findIndex(
    (queueItem) =>
    queueItem?.id ===
    item.id
  );

  if (
    currentIndex >= 0
  ) {
    state.queue.currentIndex =
    currentIndex;
  }

  state.queue.currentItemId =
  item.id || "";

  if (
    state.track &&
    sameTrack(
      state.track,
      track
    )
  ) {
    return;
  }

  handleTrackChange(
    item.track
  );
}

function handleTrackChange(
  rawTrack
) {
  const track =
  normalizeTrack(
    rawTrack
  );

  if (!track) {
    return;
  }

  const oldKey =
  trackKey(state.track);

  const newKey =
  trackKey(track);

  state.track =
  track;

  state.hidden =
  false;

  showPlayer();

  updateTrackUI();
  renderLyrics();
  updateArtwork(track);

  if (oldKey !== newKey) {
    loadLyrics(track);
  }

  updateMediaSession();
  syncDetachedPlayer();
}

async function initializeCurrentState() {
  try {
    const queue =
    await api.Queue.getQueue();

    if (queue) {
      handleQueueState(
        queue
      );
    }
  } catch (error) {
    log(
      "initial queue read failed",
      error
    );
  }

  try {
    const currentItem =
    await api.Queue.getCurrentItem();

    if (currentItem) {
      await handleCurrentItem(
        currentItem
      );
    }
  } catch (error) {
    log(
      "initial current item failed",
      error
    );
  }

  try {
    const playback =
    await api.Playback.getState();

    if (playback) {
      handlePlaybackState(
        playback
      );
    }
  } catch (error) {
    log(
      "initial playback read failed",
      error
    );
  }
}

function setupSubscriptions() {
  if (api.Events?.on) {
    addCleanup(
      api.Events.on(
        "trackStarted",
        (track) => {
          handleTrackChange(track);
        }
      )
    );
  }

  if (api.Playback?.subscribe) {
    addCleanup(
      api.Playback.subscribe(
        (playback) => {
          handlePlaybackState(
            playback
          );
        }
      )
    );
  }

  if (api.Queue?.subscribe) {
    addCleanup(
      api.Queue.subscribe(
        (queue) => {
          handleQueueState(
            queue
          );
        }
      )
    );
  }

  if (
    api.Queue?.subscribeToCurrentItem
  ) {
    addCleanup(
      api.Queue.subscribeToCurrentItem(
        (item) => {
          handleCurrentItem(
            item
          );
        }
      )
    );
  }

  if (
    api.Playlists?.subscribe
  ) {
    addCleanup(
      api.Playlists.subscribe(
        () => {
          state.playlists = [];

          if (
            state.queueView ===
            "playlists" &&
            state.queueOpen
          ) {
            loadPlaylists();
          }
        }
      )
    );
  }
}

// media session

function updateMediaSession() {
  if (
    !("mediaSession" in navigator) ||
    !state.track
  ) {
    return;
  }

  try {
    navigator.mediaSession.metadata =
    new MediaMetadata({
      title:
      state.track.displayTitle,
      artist:
      state.track.displayArtist,
      album:
      "Nuclear",
      artwork:
      state.artwork.url
      ? [
        {
          src:
          state.artwork.url,
          sizes:
          "600x600",
          type:
          "image/jpeg"
        }
      ]
      : []
    });
  } catch (error) {
    log(
      "media session metadata failed",
      error
    );
  }
}

function setupMediaSession() {
  if (
    !("mediaSession" in navigator)
  ) {
    return;
  }

  const handlers = {
    play: () => {
      return api?.Playback?.play?.();
    },

    pause: () => {
      return api?.Playback?.pause?.();
    },

    previoustrack: () => {
      return playPrevious();
    },

    nexttrack: () => {
      return playNext();
    },

    seekbackward: async () => {
      await seekTo(
        state.playback.seek - 10
      );
    },

    seekforward: async () => {
      await seekTo(
        state.playback.seek + 10
      );
    },

    seekto: async (details) => {
      if (
        Number.isFinite(
          details?.seekTime
        )
      ) {
        await seekTo(
          details.seekTime
        );
      }
    }
  };

  for (
    const [action, handler]
    of Object.entries(handlers)
  ) {
    try {
      navigator.mediaSession.setActionHandler(
        action,
        handler
      );
    } catch (_) {}
  }

  addCleanup(() => {
    for (
      const action
      of Object.keys(handlers)
    ) {
      try {
        navigator.mediaSession.setActionHandler(
          action,
          null
        );
      } catch (_) {}
    }

    try {
      navigator.mediaSession.metadata =
      null;
    } catch (_) {}
  });
}

// detached player

function detachedWindowHtml() {
  return `<!doctype html>
  <html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Nuclear Mini Player</title>
  <style>
  :root {
    color-scheme: dark;
    font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    background: #0c0c0e;
    color: #fff;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .player {
    width: 100%;
    height: 100%;
    min-height: 180px;
    padding: 18px;
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    grid-template-rows: auto auto auto;
    gap: 12px;
    background:
    linear-gradient(
      145deg,
      rgba(30,30,34,.96),
                    rgba(10,10,12,.98)
    );
  }

  .cover {
    width: 72px;
    height: 72px;
    overflow: hidden;
    border-radius: 12px;
    background: rgba(255,255,255,.06);
    background-position: center;
    background-size: cover;
  }

  .cover img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .meta {
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title,
  .artist {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title {
    font-size: 14px;
    font-weight: 700;
  }

  .artist {
    margin-top: 4px;
    color: rgba(255,255,255,.55);
    font-size: 12px;
  }

  .progress {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 38px minmax(0,1fr) 38px;
    gap: 7px;
    align-items: center;
  }

  .time {
    color: rgba(255,255,255,.45);
    font-size: 9px;
    font-variant-numeric: tabular-nums;
  }

  .time:last-child {
    text-align: right;
  }

  input[type="range"] {
    width: 100%;
    accent-color: var(--accent, #1ed760);
  }

  .controls {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 22px;
  }

  button {
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0;
    border-radius: 9px;
    display: grid;
    place-items: center;
    color: #fff;
    background: transparent;
    cursor: pointer;
  }

  button:hover {
    background: rgba(255,255,255,.07);
  }

  button svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.1;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .play {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    color: #050505;
    background: var(--accent, #1ed760);
  }
  </style>
  </head>
  <body>
  <div class="player">
  <div class="cover">
  <img id="cover" alt="">
  </div>

  <div class="meta">
  <div id="title" class="title"></div>
  <div id="artist" class="artist"></div>
  </div>

  <div class="progress">
  <span id="current" class="time">0:00</span>
  <input id="seek" type="range" min="0" max="0" value="0" step="0.01">
  <span id="duration" class="time">0:00</span>
  </div>

  <div class="controls">
  <button id="previous" aria-label="Previous"></button>
  <button id="play" class="play" aria-label="Play"></button>
  <button id="next" aria-label="Next"></button>
  </div>
  </div>

  <script>
  const ICONS = {
    play:
    '<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/></svg>',

    pause:
    '<svg viewBox="0 0 24 24"><path d="M7 5v14M17 5v14"/></svg>',

    previous:
    '<svg viewBox="0 0 24 24"><path d="m18 5-9 7 9 7V5Z"/><path d="M5 5v14"/></svg>',

    next:
    '<svg viewBox="0 0 24 24"><path d="m6 5 9 7-9 7V5Z"/><path d="M19 5v14"/></svg>'
  };

  const channel =
  "BroadcastChannel" in window
  ? new BroadcastChannel("nuclear-mini-player-detached")
  : null;

  const title =
  document.getElementById("title");

  const artist =
  document.getElementById("artist");

  const cover =
  document.getElementById("cover");

  const current =
  document.getElementById("current");

  const duration =
  document.getElementById("duration");

  const seek =
  document.getElementById("seek");

  const play =
  document.getElementById("play");

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }

    const value =
    Math.floor(seconds);

    const minutes =
    Math.floor(value / 60);

    const remainder =
    String(value % 60)
    .padStart(2, "0");

    return minutes + ":" + remainder;
  }

  function send(action, value) {
    channel?.postMessage({
      type: "command",
      action,
      value
    });
  }

  document.getElementById(
    "previous"
  ).innerHTML =
  ICONS.previous;

  play.innerHTML =
  ICONS.play;

  document.getElementById(
    "next"
  ).innerHTML =
  ICONS.next;

  document.getElementById(
    "previous"
  ).addEventListener(
    "click",
    () => send("previous")
  );

  play.addEventListener(
    "click",
    () => send("toggle")
  );

  document.getElementById(
    "next"
  ).addEventListener(
    "click",
    () => send("next")
  );

  seek.addEventListener(
    "input",
    () => {
      send(
        "seek",
        Number(seek.value)
      );
    }
  );

  channel?.addEventListener(
    "message",
    (event) => {
      const message =
      event.data;

      if (
        message?.type !==
        "state"
      ) {
        return;
      }

      const data =
      message.state;

      if (
        data.title !==
        undefined
      ) {
        title.textContent =
        data.title;
      }

      if (
        data.artist !==
        undefined
      ) {
        artist.textContent =
        data.artist;
      }

      if (data.artwork) {
        cover.src =
        data.artwork;
      } else {
        cover.removeAttribute(
          "src"
        );
      }

      if (data.accent) {
        document.documentElement
        .style
        .setProperty(
          "--accent",
          data.accent
        );
      }

      if (
        Number.isFinite(
          data.duration
        )
      ) {
        seek.max =
        String(data.duration);

        duration.textContent =
        formatTime(
          data.duration
        );
      }

      if (
        Number.isFinite(
          data.seek
        )
      ) {
        seek.value =
        String(data.seek);

        current.textContent =
        formatTime(
          data.seek
        );
      }

      play.innerHTML =
      data.status === "playing"
      ? ICONS.pause
      : ICONS.play;
    }
  );

  send("ready");
  </script>
  </body>
  </html>`;
}

function getDetachedState() {
  return {
    title:
    state.track?.displayTitle ||
    text("waitingPlayback"),

    artist:
    state.track?.displayArtist ||
    "",

    artwork:
    state.artwork.url || "",

    seek:
    state.playback.seek,

    duration:
    state.playback.duration ||
    state.track?.duration ||
    0,

    status:
    state.playback.status,

    accent:
    state.accent
  };
}

function syncDetachedPlayer() {
  if (
    !state.detachedWindow ||
    state.detachedWindow.closed
  ) {
    state.detachedWindow = null;
    return;
  }

  const message = {
    type: "state",
    state: getDetachedState()
  };

  try {
    state.detachedWindow.postMessage(
      message,
      "*"
    );
  } catch (_) {}

  try {
    state.detachedChannel?.postMessage(
      message
    );
  } catch (_) {}
}

function openDetachedPlayer() {
  if (
    state.detachedWindow &&
    !state.detachedWindow.closed
  ) {
    state.detachedWindow.focus();
    syncDetachedPlayer();
    return;
  }

  let detachedWindow;

  try {
    detachedWindow =
    window.open(
      "",
      "nuclear-mini-player",
      "popup=yes,width=430,height=230,resizable=yes"
    );
  } catch (error) {
    log(
      "detached window failed",
      error
    );
    return;
  }

  if (!detachedWindow) {
    showToast(
      text("popupBlocked")
    );

    return;
  }

  state.detachedWindow =
  detachedWindow;

  detachedWindow.document.open();
  detachedWindow.document.write(
    detachedWindowHtml()
  );
  detachedWindow.document.close();

  state.detachedChannel =
  "BroadcastChannel" in window
  ? new BroadcastChannel(
    "nuclear-mini-player-detached"
  )
  : null;

  const receiveCommand =
  async (event) => {
    if (
      event.data?.type !==
      "command"
    ) {
      return;
    }

    switch (
      event.data.action
    ) {
      case "ready":
        syncDetachedPlayer();
        break;

      case "previous":
        await playPrevious();
        break;

      case "next":
        await playNext();
        break;

      case "toggle":
        await togglePlayback();
        break;

      case "seek":
        await seekTo(
          Number(
            event.data.value
          )
        );
        break;
    }
  };

  state.detachedChannel?.addEventListener(
    "message",
    receiveCommand
  );

  detachedWindow.addEventListener(
    "beforeunload",
    () => {
      state.detachedWindow =
      null;

      state.detachedChannel?.close();
      state.detachedChannel =
      null;
    }
  );

  addCleanup(() => {
    state.detachedChannel?.removeEventListener(
      "message",
      receiveCommand
    );

    state.detachedChannel?.close();
    state.detachedChannel =
    null;
  });

  addCleanup(() => {
    try {
      if (state.detachedWindow) {
        state.detachedWindow = null;
      }
    } catch (_) {}
  });

  syncDetachedPlayer();
}

function closeDetachedPlayer() {
  try {
    if (
      state.detachedWindow &&
      !state.detachedWindow.closed
    ) {
      state.detachedWindow.close();
    }
  } catch (_) {}

  state.detachedWindow =
  null;

  state.detachedChannel?.close();
  state.detachedChannel =
  null;
}

function toggleDetachedPlayer() {
  if (
    state.detachedWindow &&
    !state.detachedWindow.closed
  ) {
    closeDetachedPlayer();
    return;
  }

  openDetachedPlayer();
}

// queue + playback animation

function startPlaybackAnimation() {
  if (state.animationFrame) {
    cancelAnimationFrame(
      state.animationFrame
    );
  }

  const tick = () => {
    if (
      state.playback.status ===
      "playing"
    ) {
      const elapsed =
      (performance.now() -
      state.playback.updatedAt) /
      1000;

      let estimated =
      state.playback.seek +
      elapsed;

      if (
        state.playback.duration >
        0
      ) {
        estimated =
        clamp(
          estimated,
          0,
          state.playback.duration
        );
      }

      state.playback.seek =
      estimated;

      updateProgressUI();
      updateActiveLyric();
      syncDetachedPlayer();
    }

    state.animationFrame =
    requestAnimationFrame(
      tick
    );
  };

  state.animationFrame =
  requestAnimationFrame(
    tick
  );
}

// toast

function showToast(message) {
  const toast =
  document.getElementById(
    "nuke-mp-toast"
  );

  if (!toast) {
    return;
  }

  toast.textContent =
  message;

  toast.classList.add(
    "visible"
  );

  clearTimeout(
    state.toastTimer
  );

  state.toastTimer =
  setTimeout(
    () => {
      toast.classList.remove(
        "visible"
      );
    },
    1600
  );
}

// CSS

const CSS = `
#nuke-mp-panel {
--nuke-mp-accent: #1ed760;
--nuke-mp-lyrics-size: 16px;

position: fixed;
right: 25px;
bottom: 96px;

z-index: 99999;

width: min(
  430px,
  calc(100vw - 28px)
);

min-height: 188px;

color: #fff;

border:
1px solid
rgba(255,255,255,.10);

border-radius: 17px;

overflow: hidden;

background:
linear-gradient(
  135deg,
  rgba(27,27,30,.96),
                rgba(10,10,12,.99)
);

box-shadow:
0 22px 65px
rgba(0,0,0,.68);

backdrop-filter:
blur(30px)
saturate(1.2);

-webkit-backdrop-filter:
blur(30px)
saturate(1.2);

user-select: none;

transition:
width .22s ease,
opacity .18s ease,
transform .18s ease;
}

#nuke-mp-panel::before {
content: "";

position: absolute;
inset: -40px;

z-index: -1;

pointer-events: none;

background:
var(--nuke-mp-cover, none)
center /
cover
no-repeat;

filter:
blur(60px)
brightness(.28)
saturate(1.2);

opacity: .55;

transform:
scale(1.08);
}

#nuke-mp-panel.nuke-mp-no-glow::before {
display: none;
}

#nuke-mp-panel.nuke-mp-no-background {
background:
linear-gradient(
  135deg,
  rgba(27,27,30,.97),
                rgba(10,10,12,.99)
);
}

#nuke-mp-panel.nuke-mp-hidden {
opacity: 0;
transform:
translateY(10px);
pointer-events: none;
}

#nuke-mp-panel.nuke-mp-fullscreen {
inset: 16px;
right: 16px;
bottom: 16px;

width: auto;
height: auto;

min-height: 0;

border-radius: 16px;
}

.nuke-mp-header {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding:
  8px 10px
  7px 13px;

  opacity: .55;

  transform:
  translateY(0);

  transition:
  opacity .18s ease,
  transform .18s ease;
}

#nuke-mp-panel:hover
.nuke-mp-header,
#nuke-mp-panel.nuke-mp-queue-active
.nuke-mp-header,
#nuke-mp-panel.nuke-mp-lyrics-open
.nuke-mp-header {
  opacity: 1;

  transform:
  translateY(0);
}

.nuke-mp-brand {
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 10px;
}

.nuke-mp-brand-name {
  font-weight: 700;
  color:
  rgba(255,255,255,.88);
}

.nuke-mp-brand-separator {
  color:
  rgba(255,255,255,.28);
}

.nuke-mp-brand-mode {
  color:
  var(--nuke-mp-accent);

  font-weight: 700;
}

.nuke-mp-header-actions,
.nuke-mp-footer,
.nuke-mp-footer-left,
.nuke-mp-footer-right,
.nuke-mp-lyrics-actions {
  display: flex;
  align-items: center;
}

.nuke-mp-header-actions {
  gap: 2px;
}

.nuke-mp-footer {
  justify-content: space-between;
  padding:
  0 8px
  7px;
}

.nuke-mp-footer-left,
.nuke-mp-footer-right {
  gap: 2px;
}

.nuke-mp-icon-button,
.nuke-mp-control-button,
.nuke-mp-play-button {
  border: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  color:
  rgba(255,255,255,.62);

  background: transparent;

  transition:
  color .15s ease,
  background .15s ease,
  transform .15s ease;
}

.nuke-mp-icon-button {
  width: 28px;
  height: 28px;

  border-radius: 8px;
}

.nuke-mp-control-button {
  width: 38px;
  height: 38px;

  border-radius: 10px;
}

.nuke-mp-play-button {
  width: 34px;
  height: 34px;

  border-radius: 50%;

  color: #050505;
  background:
  var(--nuke-mp-accent);
}

.nuke-mp-icon-button:hover,
.nuke-mp-control-button:hover {
  color: #fff;

  background:
  rgba(255,255,255,.08);
}

.nuke-mp-play-button:hover {
  color: #050505;

  filter:
  brightness(1.06);
}

.nuke-mp-icon-button:active,
.nuke-mp-control-button:active,
.nuke-mp-play-button:active {
  transform:
  scale(.95);
}

#nuke-mp-panel.nuke-mp-idle .nuke-mp-control-button,
#nuke-mp-panel.nuke-mp-idle .nuke-mp-play-button {
  opacity: .45;
}

.nuke-mp-icon-button svg,
.nuke-mp-control-button svg,
.nuke-mp-play-button svg {
  width: 15px;
  height: 15px;

  fill: none;

  stroke:
  currentColor;

  stroke-width: 2.1;

  stroke-linecap:
  round;

  stroke-linejoin:
  round;
}

.nuke-mp-body {
  position: relative;

  display: grid;

  grid-template-columns:
  72px
  minmax(0,1fr);

  grid-template-rows:
  auto
  auto
  auto;

  column-gap: 12px;

  align-items: center;

  padding:
  2px 14px
  8px;
}

.nuke-mp-artwork {
  grid-row:
  1 / span 3;

  position: relative;

  width: 72px;
  height: 72px;

  overflow: hidden;

  border-radius: 11px;

  background:
  rgba(255,255,255,.05);

  background-position:
  center;

  background-size:
  cover;

  box-shadow:
  0 8px 24px
  rgba(0,0,0,.28);
}

.nuke-mp-art-image {
  position: relative;
  z-index: 1;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
}

.nuke-mp-art-image[hidden] {
  display: none;
}

.nuke-mp-art-placeholder {
  position: absolute;
  inset: 0;

  z-index: 0;

  display: grid;
  place-items: center;

  color:
  rgba(255,255,255,.35);

  font-size: 28px;
  font-weight: 800;
}

.nuke-mp-metadata {
  min-width: 0;
}

.nuke-mp-title,
.nuke-mp-artist {
  overflow: hidden;

  white-space: nowrap;

  text-overflow:
  ellipsis;
}

.nuke-mp-title {
  font-size: 14px;
  font-weight: 700;

  color:
  rgba(255,255,255,.96);
}

.nuke-mp-artist {
  margin-top: 2px;

  color:
  rgba(255,255,255,.53);

  font-size: 11px;
}

.nuke-mp-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;

  padding-top: 6px;
}

.nuke-mp-progress {
  display: grid;

  grid-template-columns:
  31px
  minmax(0,1fr)
  31px;

  gap: 7px;

  align-items:
  center;

  padding-top: 6px;
}

.nuke-mp-time {
  color:
  rgba(255,255,255,.43);

  font-size: 9px;

  font-variant-numeric:
  tabular-nums;
}

.nuke-mp-time:last-child {
  text-align: right;
}

.nuke-mp-seek {
  --nuke-mp-progress: 0%;

  width: 100%;
  height: 3px;

  margin: 0;

  appearance: none;

  border: 0;

  outline: none;

  border-radius: 100px;

  background:
  linear-gradient(
    to right,
    var(--nuke-mp-accent) 0%,
                  var(--nuke-mp-accent)
                  var(--nuke-mp-progress),
                  rgba(255,255,255,.19)
                  var(--nuke-mp-progress),
                  rgba(255,255,255,.19) 100%
  );

  cursor: pointer;
}

.nuke-mp-seek::-webkit-slider-thumb {
  appearance: none;

  width: 9px;
  height: 9px;

  border: 0;

  border-radius: 50%;

  background:
  var(--nuke-mp-accent);
}

.nuke-mp-seek::-moz-range-thumb {
  width: 9px;
  height: 9px;

  border: 0;

  border-radius: 50%;

  background:
  var(--nuke-mp-accent);
}

.nuke-mp-lyrics-panel {
  display: block;

  max-height: 0;

  overflow: hidden;

  opacity: 0;

  border-top:
  1px solid
  rgba(255,255,255,.05);

  transition:
  max-height .25s ease,
  opacity .18s ease;
}

#nuke-mp-panel.nuke-mp-lyrics-open {
width:
min(
  520px,
  calc(100vw - 28px)
);
}

#nuke-mp-panel.nuke-mp-lyrics-open
.nuke-mp-lyrics-panel {
  max-height: 550px;
  opacity: 1;
}

.nuke-mp-lyrics-toolbar {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 8px;

  padding:
  9px 10px
  8px 13px;

  border-bottom:
  1px solid
  rgba(255,255,255,.05);
}

.nuke-mp-lyrics-heading {
  min-width: 0;

  display: flex;
  align-items: baseline;

  gap: 7px;
}

.nuke-mp-lyrics-title {
  font-size: 11px;
  font-weight: 700;
}

.nuke-mp-lyrics-source {
  overflow: hidden;

  max-width: 130px;

  white-space: nowrap;

  text-overflow:
  ellipsis;

  color:
  var(--nuke-mp-accent);

  font-size: 8px;
  font-weight: 700;

  letter-spacing:
  .5px;

  text-transform:
  uppercase;
}

.nuke-mp-text-button {
  font-size: 10px;
  font-weight: 700;
}

.nuke-mp-lyrics-body {
  max-height: 390px;
  min-height: 0;

  overflow:
  auto;

  overscroll-behavior:
  contain;

  scrollbar-width:
  thin;

  padding:
  13px 14px
  20px;
}

.nuke-mp-lyrics-list {
  display: flex;

  flex-direction:
  column;

  align-items:
  stretch;

  gap: 3px;
}

.nuke-mp-lyric-line {
  width: 100%;

  padding:
  6px 7px;

  border: 0;

  border-radius: 7px;

  color:
  rgba(255,255,255,.43);

  background:
  transparent;

  font-size:
  var(--nuke-mp-lyrics-size);

  line-height:
  1.5;

  text-align:
  center;

  transition:
  color .16s ease,
  transform .16s ease,
  background .16s ease;
}

button.nuke-mp-lyric-line {
  cursor: pointer;
}

.nuke-mp-lyric-line.clickable:hover {
  color:
  rgba(255,255,255,.78);

  background:
  rgba(255,255,255,.045);
}

.nuke-mp-lyric-line.active {
  color: #fff;

  transform:
  scale(1.015);
}

.nuke-mp-lyrics-plain {
  color:
  rgba(255,255,255,.82);

  font-size:
  var(--nuke-mp-lyrics-size);

  line-height:
  1.6;

  text-align:
  center;

  white-space:
  pre-wrap;
}

.nuke-mp-lyrics-status,
.nuke-mp-queue-empty {
  min-height: 170px;

  display: grid;

  place-items: center;

  padding: 16px;

  color:
  rgba(255,255,255,.40);

  font-size: 11px;

  text-align:
  center;
}

.nuke-mp-lyrics-status {
  min-height: 120px;
}

#nuke-mp-queue-panel {
--nuke-mp-accent: #1ed760;

position: fixed;

right: 25px;

bottom: 300px;

z-index: 99998;

width:
min(
  390px,
  calc(100vw - 28px)
);

max-height:
min(
  550px,
  calc(100vh - 120px)
);

overflow: hidden;

display: flex;

flex-direction:
column;

color: #fff;

border:
1px solid
rgba(255,255,255,.10);

border-radius: 16px;

background:
linear-gradient(
  135deg,
  rgba(20,20,23,.96),
                rgba(9,9,11,.985)
);

box-shadow:
0 22px 60px
rgba(0,0,0,.65);

backdrop-filter:
blur(28px);

-webkit-backdrop-filter:
blur(28px);
}

#nuke-mp-queue-panel[hidden] {
display: none;
}

.nuke-mp-queue-header {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding:
  11px 10px
  8px 14px;

  border-bottom:
  1px solid
  rgba(255,255,255,.05);
}

.nuke-mp-queue-title {
  max-width: 260px;

  overflow:
  hidden;

  white-space:
  nowrap;

  text-overflow:
  ellipsis;

  font-size:
  12px;

  font-weight:
  700;
}

.nuke-mp-tabs {
  display: grid;

  grid-template-columns:
  1fr 1fr;

  gap: 3px;

  padding: 7px;

  border-bottom:
  1px solid
  rgba(255,255,255,.05);
}

.nuke-mp-tab {
  border: 0;

  padding:
  7px 8px;

  border-radius: 8px;

  color:
  rgba(255,255,255,.43);

  background:
  transparent;

  font-size: 10px;

  font-weight: 700;

  cursor: pointer;
}

.nuke-mp-tab:hover {
  color: #fff;

  background:
  rgba(255,255,255,.05);
}

.nuke-mp-tab.active {
  color: #fff;

  background:
  rgba(255,255,255,.08);
}

.nuke-mp-queue-content {
  min-height: 100px;

  overflow:
  auto;

  scrollbar-width:
  thin;
}

.nuke-mp-list {
  display: flex;

  flex-direction:
  column;

  gap: 2px;

  padding: 5px;
}

.nuke-mp-queue-row {
  display: grid;

  grid-template-columns:
  minmax(0,1fr)
  30px;

  align-items:
  center;

  border-radius:
  9px;
}

.nuke-mp-queue-row.current {
  background:
  rgba(255,255,255,.05);
}

.nuke-mp-queue-main,
.nuke-mp-playlist-track,
.nuke-mp-playlist-row {
  min-width: 0;

  border: 0;

  background:
  transparent;

  color: #fff;

  cursor: pointer;

  text-align: left;
}

.nuke-mp-queue-main,
.nuke-mp-playlist-track {
  display: grid;

  grid-template-columns:
  31px
  minmax(0,1fr);

  gap: 3px;

  align-items:
  center;

  padding:
  8px 7px;

  border-radius:
  8px;
}

.nuke-mp-queue-main:hover,
.nuke-mp-playlist-track:hover,
.nuke-mp-playlist-row:hover {
  background:
  rgba(255,255,255,.045);
}

.nuke-mp-list-number {
  color:
  rgba(255,255,255,.28);

  font-size: 9px;

  font-variant-numeric:
  tabular-nums;
}

.nuke-mp-list-info {
  min-width: 0;

  display: flex;

  flex-direction:
  column;

  gap: 2px;
}

.nuke-mp-list-title,
.nuke-mp-list-artist,
.nuke-mp-playlist-name,
.nuke-mp-playlist-count,
.nuke-mp-playlist-detail-name {
  overflow:
  hidden;

  white-space:
  nowrap;

  text-overflow:
  ellipsis;
}

.nuke-mp-list-title {
  font-size: 10px;

  font-weight:
  650;
}

.nuke-mp-list-artist {
  color:
  rgba(255,255,255,.43);

  font-size: 9px;
}

.nuke-mp-current-badge {
  margin-top: 2px;

  color:
  var(--nuke-mp-accent);

  font-size: 7px;

  font-weight:
  700;

  letter-spacing:
  .5px;

  text-transform:
  uppercase;
}

.nuke-mp-remove-button {
  width: 26px;
  height: 26px;

  border: 0;

  border-radius: 7px;

  color:
  rgba(255,255,255,.30);

  background:
  transparent;

  cursor: pointer;
}

.nuke-mp-remove-button:hover {
  color:
  rgba(255,110,110,.95);

  background:
  rgba(255,255,255,.05);
}

.nuke-mp-remove-button svg {
  width: 13px;
  height: 13px;

  fill: none;

  stroke:
  currentColor;

  stroke-width:
  2;
}

.nuke-mp-queue-footer {
  padding: 6px;

  border-top:
  1px solid
  rgba(255,255,255,.05);
}

.nuke-mp-clear-button {
  width: 100%;

  padding: 8px;

  border: 0;

  border-radius: 8px;

  color:
  rgba(255,255,255,.66);

  background:
  rgba(255,255,255,.05);

  font-size: 9px;

  cursor: pointer;
}

.nuke-mp-clear-button:hover {
  color: #fff;

  background:
  rgba(255,255,255,.08);
}

.nuke-mp-playlist-row {
  width: 100%;

  display: grid;

  grid-template-columns:
  42px
  minmax(0,1fr);

  gap: 9px;

  align-items:
  center;

  padding: 8px;

  border-radius: 9px;
}

.nuke-mp-playlist-art {
  width: 42px;
  height: 42px;

  border-radius: 7px;

  background:
  linear-gradient(
    135deg,
    rgba(255,255,255,.11),
                  rgba(255,255,255,.03)
  );

  background-position:
  center;

  background-size:
  cover;
}

.nuke-mp-playlist-info {
  min-width: 0;

  display: flex;

  flex-direction:
  column;

  gap: 3px;
}

.nuke-mp-playlist-name {
  font-size: 10px;

  font-weight:
  650;
}

.nuke-mp-playlist-count {
  color:
  rgba(255,255,255,.40);

  font-size: 8px;
}

.nuke-mp-playlist-header {
  display: flex;

  align-items:
  center;

  gap: 5px;

  padding: 5px;

  border-bottom:
  1px solid
  rgba(255,255,255,.05);
}

.nuke-mp-back-button {
  width: 28px;
  height: 28px;

  border: 0;

  border-radius: 8px;

  color:
  rgba(255,255,255,.62);

  background:
  transparent;

  cursor: pointer;
}

.nuke-mp-playlist-detail-name {
  min-width: 0;

  font-size: 10px;

  font-weight:
  700;
}

#nuke-mp-toast {
position: fixed;

left: 50%;
bottom: 25px;

z-index: 100001;

transform:
translate(
  -50%,
  12px
);

padding:
8px 11px;

border:
1px solid
rgba(255,255,255,.10);

border-radius:
9px;

color: #fff;

background:
rgba(12,12,14,.90);

font-size: 9px;

opacity: 0;

pointer-events: none;

transition:
opacity .18s ease,
transform .18s ease;

backdrop-filter:
blur(14px);
}

#nuke-mp-toast.visible {
opacity: 1;

transform:
translate(
  -50%,
  0
);
}

@media (max-width: 600px) {
  #nuke-mp-panel {
  right: 14px;
  bottom: 96px;
  }

  #nuke-mp-queue-panel {
  right: 14px;
  bottom: 300px;
  }

  #nuke-mp-panel.nuke-mp-lyrics-open {
  width:
  calc(100vw - 28px);
  }
}
`;

function installStyles() {
  styleNode?.remove();

  styleNode =
  document.createElement(
    "style"
  );

  styleNode.id =
  "nuke-mp-styles";

    styleNode.textContent =
    CSS;

    document.head.appendChild(
      styleNode
    );

    addCleanup(() =>
    styleNode?.remove()
    );
}

function buildToast() {
  document.getElementById(
    "nuke-mp-toast"
  )?.remove();

  const toast =
  createElement(
    "div",
    "nuke-mp-toast"
  );

  toast.id =
  "nuke-mp-toast";

    document.body.appendChild(
      toast
    );
}

// lifecycle

async function onLoad(pluginApi) {
  api = pluginApi;

  await registerSettings();
}

async function onEnable(pluginApi) {
  api = pluginApi;
  state.api = pluginApi;

  await loadSettings();

  installStyles();
  buildPlayer();
  buildQueuePanel();
  buildToast();

  setupSettingSubscriptions();
  setupSubscriptions();
  setupMediaSession();

  startThemeWatcher();
  startPlaybackAnimation();

  await initializeCurrentState();

  updateTrackUI();

  showPlayer();
  updateTheme();
  renderInterfaceText();
  renderLyrics();
  renderQueuePanel();
  syncDetachedPlayer();
}

async function onDisable() {
  for (
    const cleanup
    of state.cleanup.splice(0)
  ) {
    try {
      cleanup();
    } catch (error) {
      log(
        "cleanup failed",
        error
      );
    }
  }

  if (
    state.lyrics.controller
  ) {
    state.lyrics.controller.abort();
    state.lyrics.controller =
    null;
  }

  if (
    state.animationFrame
  ) {
    cancelAnimationFrame(
      state.animationFrame
    );

    state.animationFrame =
    null;
  }

  closeDetachedPlayer();

  document
  .getElementById(
    "nuke-mp-panel"
  )
  ?.remove();

  document
  .getElementById(
    "nuke-mp-queue-panel"
  )
  ?.remove();

  document
  .getElementById(
    "nuke-mp-toast"
  )
  ?.remove();

  styleNode?.remove();

  styleNode =
  null;

  panel =
  null;

  queuePanel =
  null;

  artworkCache.clear();
  lyricsCache.clear();

  state.track =
  null;

  state.queue = {
    items: [],
    currentIndex: -1,
    currentItemId: ""
  };

  state.playlists =
  [];

  state.selectedPlaylist =
  null;

  state.queueOpen =
  false;

  state.lyricsOpen =
  false;

  clearLyricsState();

  state.api =
  null;

  api =
  null;
}

module.exports = {
  onLoad,
  onEnable,
  onDisable
};
