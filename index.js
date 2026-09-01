const SETTING_CATEGORY = "Lyrics Provider";
const SETTING_PREFER_SYNCED = "prefer_synced";

let providerId = null;
let unsubscribeEvents = null;
let storedApi = null;
let currentTrackKey = "";
let currentFontSize = 18;
let lastArtist = "";
let lastTitle = "";
let lastTrackObj = null;
let isCustomView = false;
let isContentVisible = false;
let playbackInterval = null;
let parsedLyrics = [];
let hasSyncedTimestamps = false;

let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;
let rafId = null;

let onMouseMoveHandler = null;
let onMouseUpHandler = null;
let escapeListener = null;
let settingsObserver = null;

function isSystemMenuOpen() {
  const headers = Array.from(document.querySelectorAll('h1, h2, h3, .header')).map(el => el.textContent?.trim());
  const menuKeywords = ["Plugins", "General", "Key Shortcuts", "Themes", "Logs", "What's New", "Preferences"];
  return headers.some(text => menuKeywords.includes(text));
}

function setupSettingsUIWatcher(api) {
  if (settingsObserver) settingsObserver.disconnect();

  settingsObserver = new MutationObserver(() => {
    const labels = Array.from(document.querySelectorAll('div, span, p, label')).filter(
      el => el.textContent?.trim() === "Prefer synced LRC lyrics when available"
    );

    labels.forEach((labelEl) => {
      const container = labelEl.closest('div')?.parentElement || labelEl.parentElement;
      if (!container) return;

      const input = container.querySelector('input');
      if (!input || input.dataset.customCheckboxInjected) return;

      input.dataset.customCheckboxInjected = "true";
      input.style.display = "none";

      const isChecked = input.value === "true" || input.value === true;

      const checkboxWrapper = document.createElement("label");
      checkboxWrapper.style.cssText = `
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      margin-top: 8px;
      gap: 10px;
      font-size: 14px;
      color: #e0e0e0;
      `;

      checkboxWrapper.innerHTML = `
      <div style="
      width: 20px;
      height: 20px;
      border: 2px solid ${isChecked ? "#1ed760" : "#555"};
      background-color: ${isChecked ? "#1ed760" : "transparent"};
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      ">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="opacity: ${isChecked ? "1" : "0"}; transition: opacity 0.2s ease;">
      <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      </div>
      <span>Enabled</span>
      `;

      checkboxWrapper.addEventListener("click", async (e) => {
        e.preventDefault();
        const currentVal = input.value === "true" || input.value === true;
        const newVal = !currentVal;

        input.value = String(newVal);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));

        await api.Settings.set(SETTING_PREFER_SYNCED, newVal);

        const box = checkboxWrapper.querySelector("div");
        const svg = checkboxWrapper.querySelector("svg");
        if (box && svg) {
          box.style.backgroundColor = newVal ? "#1ed760" : "transparent";
          box.style.borderColor = newVal ? "#1ed760" : "#555";
          svg.style.opacity = newVal ? "1" : "0";
        }
      });

      input.parentElement?.appendChild(checkboxWrapper);
    });
  });

  settingsObserver.observe(document.body, { childList: true, subtree: true });
}

function injectUI() {
  if (document.getElementById("custom-lyrics-panel")) return;

  const style = document.createElement("style");
  style.id = "custom-lyrics-styles";
  style.innerHTML = `
  .lyric-line {
    color: #7a7a7a;
    transition: color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    padding: 6px 0;
    text-align: center;
    width: 100%;
    backface-visibility: hidden;
    font-family: Circular, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .lyric-line:hover { color: #ffffff; }
  .lyric-line.active {
    color: #ffffff !important;
    font-weight: 800;
    transform: scale(1.03);
  }
  .lyric-line.unsynced {
    color: #ffffff;
    font-weight: 600;
    cursor: default;
  }
  .lyric-line.unsynced:hover { transform: none; }
  #custom-lyrics-panel {
  contain: layout style;
  resize: both;
  overflow: hidden;
  min-width: 300px;
  transition: opacity 0.25s ease, height 0.25s ease;
  }
  `;
  document.head.appendChild(style);

  const panel = document.createElement("div");
  panel.id = "custom-lyrics-panel";

  Object.assign(panel.style, {
    position: "fixed",
    bottom: "100px",
    right: "24px",
    width: "450px",
    height: "auto",
    backgroundColor: "rgba(18, 18, 18, 0.98)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                zIndex: "9999",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                willChange: "transform, height",
                opacity: "1",
                pointerEvents: "auto"
  });

  panel.innerHTML = `
  <div id="custom-lyrics-header" style="background: rgba(24, 24, 24, 0.95); padding: 12px 16px; cursor: grab; display: flex; justify-content: space-between; align-items: center; font-weight: bold; border-bottom: 1px solid rgba(255, 255, 255, 0.05); user-select: none;">
  <span id="custom-lyrics-title" style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 14px; color: #b3b3b3;">Lyrics</span>
  <div style="display: flex; gap: 12px; align-items: center;">
  <span id="lyrics-font-dec" title="Smaller font" style="cursor: pointer; font-size: 14px; color: #b3b3b3; display: inline;">A-</span>
  <span id="lyrics-font-inc" title="Larger font" style="cursor: pointer; font-size: 16px; color: #b3b3b3; display: inline;">A+</span>
  <span id="lyrics-view-toggle" title="Toggle Fullscreen" style="cursor: pointer; font-size: 14px; color: #b3b3b3; display: inline;">🖵</span>
  <span id="lyrics-refresh" title="Refresh" style="cursor: pointer; font-size: 14px; color: #b3b3b3; display: inline;">🔄</span>
  <span id="custom-lyrics-toggle" style="color: #1ed760; font-size: 13px; cursor: pointer; font-weight: 700;">▼ Close</span>
  </div>
  </div>
  <div id="custom-lyrics-content" style="flex: 1; padding: 24px; overflow-y: auto; font-size: 20px; font-weight: 700; line-height: 1.6; color: #ffffff; min-height: 0; scroll-behavior: smooth; display: block;">
  Waiting for track playback...
  </div>
  `;

  document.body.appendChild(panel);

  const toggleBtn = document.getElementById("custom-lyrics-toggle");
  const content = document.getElementById("custom-lyrics-content");
  const viewToggleBtn = document.getElementById("lyrics-view-toggle");
  const header = document.getElementById("custom-lyrics-header");
  const fontDecBtn = document.getElementById("lyrics-font-dec");
  const fontIncBtn = document.getElementById("lyrics-font-inc");
  const refreshBtn = document.getElementById("lyrics-refresh");

  isContentVisible = true;

  const updateControlsVisibility = () => {
    const display = isContentVisible ? "inline" : "none";
    fontDecBtn.style.display = isCustomView ? "none" : display;
    fontIncBtn.style.display = isCustomView ? "none" : display;
    viewToggleBtn.style.display = display;
    refreshBtn.style.display = display;
  };

  toggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    isContentVisible = !isContentVisible;

    if (isContentVisible) {
      content.style.display = "block";
      panel.style.height = isCustomView ? "100vh" : "520px";
      toggleBtn.innerText = "▼ Close";
    } else {
      content.style.display = "none";
      panel.style.height = "auto";
      toggleBtn.innerText = "▲ Open";
    }
    updateControlsVisibility();
  });

  viewToggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    isCustomView = !isCustomView;

    if (isCustomView) {
      Object.assign(panel.style, {
        position: "fixed", top: "0", left: "0", right: "0", bottom: "0",
        width: "100%", height: isContentVisible ? "100vh" : "auto",
        borderRadius: "0", border: "none", transform: "none", resize: "none"
      });
      content.style.fontSize = "clamp(18px, 2.2vh, 28px)";
      content.style.padding = "40px 10vw";
      viewToggleBtn.innerText = "🗗";
      header.style.background = "transparent";
      header.style.border = "none";
      header.style.cursor = "default";
      applyAlbumBackground(lastTrackObj, panel);
    } else {
      panel.style.backgroundImage = "none";
      Object.assign(panel.style, {
        top: "", left: "",
        bottom: "100px", right: "24px",
        width: "450px", height: isContentVisible ? "520px" : "auto",
        borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)", resize: "both",
                    transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                    backgroundColor: "rgba(18, 18, 18, 0.98)"
      });
      content.style.fontSize = `${currentFontSize}px`;
      content.style.padding = "24px";
      viewToggleBtn.innerText = "🖵";
      header.style.background = "rgba(24, 24, 24, 0.95)";
      header.style.cursor = "grab";
    }
    updateControlsVisibility();
  });

  refreshBtn?.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (lastArtist && lastTitle) {
      const preferSynced = (await storedApi?.Settings.get(SETTING_PREFER_SYNCED)) ?? true;
      await fetchAndDisplay(lastArtist, lastTitle, preferSynced, lastTrackObj);
    }
  });

  fontIncBtn?.addEventListener("click", () => {
    if (!isCustomView && currentFontSize < 36) {
      currentFontSize += 2;
      content.style.fontSize = `${currentFontSize}px`;
    }
  });

  fontDecBtn?.addEventListener("click", () => {
    if (!isCustomView && currentFontSize > 12) {
      currentFontSize -= 2;
      content.style.fontSize = `${currentFontSize}px`;
    }
  });

  header.addEventListener("mousedown", (e) => {
    if (isCustomView) return;
    if (e.target.tagName === 'SPAN' && e.target.id !== 'custom-lyrics-title') return;

    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    header.style.cursor = "grabbing";
  });

  onMouseMoveHandler = (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        panel.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        rafId = null;
      });
    }
  };

  onMouseUpHandler = () => {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = "grab";
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };

  window.addEventListener("mousemove", onMouseMoveHandler);
  window.addEventListener("mouseup", onMouseUpHandler);

  escapeListener = (e) => {
    if (e.key === 'Escape' && isContentVisible) {
      isContentVisible = false;
      content.style.display = "none";
      panel.style.height = "auto";
      toggleBtn.innerText = "▲ Open";
      updateControlsVisibility();
    }
  };
  window.addEventListener('keydown', escapeListener);

  startSyncedPlaybackTracker();
}

function removeUI() {
  if (playbackInterval) {
    clearInterval(playbackInterval);
    playbackInterval = null;
  }
  if (onMouseMoveHandler) window.removeEventListener("mousemove", onMouseMoveHandler);
  if (onMouseUpHandler) window.removeEventListener("mouseup", onMouseUpHandler);
  if (escapeListener) window.removeEventListener("keydown", escapeListener);
  if (settingsObserver) settingsObserver.disconnect();
  if (rafId) cancelAnimationFrame(rafId);

  const panel = document.getElementById("custom-lyrics-panel");
  if (panel) panel.remove();
  const styles = document.getElementById("custom-lyrics-styles");
  if (styles) styles.remove();
}

function updateUI(title, lrcText) {
  const content = document.getElementById("custom-lyrics-content");
  document.getElementById("custom-lyrics-title").innerText = title || "Lyrics";

  if (!content) return;
  content.innerHTML = "";

  const songTitleEl = document.createElement("div");
  songTitleEl.innerText = title || "Lyrics";
  songTitleEl.style.cssText = "text-align: center; font-size: 1.2em; font-weight: 800; color: #ffffff; margin-bottom: 30px;";
  content.appendChild(songTitleEl);

  const wrapperEl = document.createElement("div");
  wrapperEl.style.cssText = "max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; width: 100%;";

  parsedLyrics = parseLrc(lrcText);

  if (parsedLyrics.length === 0) {
    wrapperEl.innerHTML = `<div style="color: #7a7a7a; padding: 20px;">No lyrics available</div>`;
  } else {
    parsedLyrics.forEach((line) => {
      const lineEl = document.createElement("div");
      lineEl.className = "lyric-line" + (hasSyncedTimestamps ? "" : " unsynced");
      lineEl.innerText = line.text;
      lineEl.dataset.time = String(line.time);

      if (hasSyncedTimestamps) {
        lineEl.addEventListener("click", () => {
          if (line.time >= 0) {
            const audio = document.querySelector('audio') || document.querySelector('video');
            if (audio) audio.currentTime = line.time;
          }
        });
      }
      wrapperEl.appendChild(lineEl);
    });
  }

  content.appendChild(wrapperEl);
}

function parseLrc(lrcText) {
  if (!lrcText) return [];
  hasSyncedTimestamps = false;

  const lines = lrcText.split(/\r?\n/);
  const result = [];
  const timeRegex = /\[\s*(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?\s*\]/g;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\[(ar|ti|al|au|length|by|offset|re|ve):/i.test(trimmed)) continue;

    let match;
    const timestamps = [];
    const cleanText = trimmed.replace(/\[\s*\d{1,2}:\d{2}(?:[.,]\d{1,3})?\s*\]/g, '').trim();

    timeRegex.lastIndex = 0;
    while ((match = timeRegex.exec(trimmed)) !== null) {
      const mins = parseInt(match[1], 10);
      const secs = parseInt(match[2], 10);
      const ms = match[3] ? parseInt(match[3].padEnd(3, '0').slice(0, 3), 10) : 0;
      timestamps.push(mins * 60 + secs + ms / 1000);
      hasSyncedTimestamps = true;
    }

    if (timestamps.length > 0) {
      timestamps.forEach(time => result.push({ time, text: cleanText || "♪" }));
    } else if (cleanText) {
      result.push({ time: -1, text: cleanText });
    }
  }

  return result.sort((a, b) => a.time - b.time);
}

function startSyncedPlaybackTracker() {
  if (playbackInterval) clearInterval(playbackInterval);

  playbackInterval = setInterval(() => {
    const panel = document.getElementById("custom-lyrics-panel");
    const content = document.getElementById("custom-lyrics-content");

    if (panel) {
      if (isSystemMenuOpen()) {
        panel.style.opacity = "0";
        panel.style.pointerEvents = "none";
        return;
      } else {
        panel.style.opacity = "1";
        panel.style.pointerEvents = "auto";
      }
    }

    const audio = document.querySelector('audio') || document.querySelector('video');
    if (!content || !hasSyncedTimestamps || parsedLyrics.length === 0 || !audio) return;

    const currentTime = audio.currentTime;
    let activeIndex = -1;
    for (let i = 0; i < parsedLyrics.length; i++) {
      if (parsedLyrics[i].time >= 0 && parsedLyrics[i].time <= currentTime) {
        activeIndex = i;
      } else if (parsedLyrics[i].time > currentTime) {
        break;
      }
    }

    const lineElements = content.querySelectorAll('.lyric-line');
    lineElements.forEach((el, idx) => {
      if (idx === activeIndex) {
        if (!el.classList.contains('active')) {
          el.classList.add('active');
          if (isContentVisible) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else {
        el.classList.remove('active');
      }
    });
  }, 300);
}

function applyAlbumBackground(track, panel) {
  const artUrl = track?.artwork?.large || track?.artwork?.medium || track?.artwork?.small;
  if (!artUrl) {
    panel.style.backgroundColor = "rgba(18, 18, 18, 0.98)";
    return;
  }
  panel.style.backgroundImage = `linear-gradient(to bottom, rgba(18,18,18,0.8), rgba(18,18,18,1)), url(${artUrl})`;
  panel.style.backgroundSize = "cover";
  panel.style.backgroundPosition = "center";
}

async function fetchAndDisplay(artist, title, preferSynced = true, track) {
  lastArtist = artist;
  lastTitle = title;
  updateUI(title, "Searching LRCLIB...");

  try {
    let data = null;
    const strictParams = new URLSearchParams({ artist_name: artist, track_name: title });
    let res = await fetch(`https://lrclib.net/api/get?${strictParams}`);

    if (res.ok) {
      data = await res.json();
    } else {
      const searchParams = new URLSearchParams({ q: `${artist || ""} ${title || ""}`.trim() });
      const searchRes = await fetch(`https://lrclib.net/api/search?${searchParams}`);
      if (searchRes.ok) {
        const results = await searchRes.json();
        if (Array.isArray(results) && results.length > 0) {
          data = results[0];
        }
      }
    }

    if (data) {
      const lyrics = preferSynced ? (data.syncedLyrics || data.plainLyrics) : (data.plainLyrics || data.syncedLyrics);
      updateUI(title, lyrics || "No lyrics found.");
    } else {
      updateUI(title, "Lyrics not found for this track.");
    }
  } catch (err) {
    updateUI(title, "Error connecting to LRCLIB.");
  }
}

module.exports = {
  async onLoad(api) {
    await api.Settings.register([{
      id: SETTING_PREFER_SYNCED,
      title: "Prefer synced LRC lyrics when available",
      category: SETTING_CATEGORY,
      kind: "boolean",
      type: "boolean",
      default: true
    }]);
  },

  async onEnable(api) {
    storedApi = api;
    injectUI();
    setupSettingsUIWatcher(api);

    unsubscribeEvents = api.Events.on('trackStarted', async (track) => {
      if (!track || !track.title) return;
      lastTrackObj = track;
      const key = `${track.artist} - ${track.title}`;
      if (key !== currentTrackKey) {
        currentTrackKey = key;
        const preferSynced = await api.Settings.get(SETTING_PREFER_SYNCED) !== false;
        fetchAndDisplay(track.artist, track.title, preferSynced, track);
      }
    });

    providerId = api.Providers.register({
      id: "lrclib-lyrics-provider",
      kind: "lyrics",
      name: "LRCLIB Lyrics",
      fetchLyrics: () => null
    });
  },

  async onDisable(api) {
    if (unsubscribeEvents) unsubscribeEvents();
    removeUI();
    if (providerId) api.Providers.unregister(providerId);
  },

  async onUnload(api) {
    removeUI();
  }
};
