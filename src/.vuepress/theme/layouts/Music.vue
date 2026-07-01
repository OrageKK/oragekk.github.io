<template>
  <SkipLink />
  <CommonWrapper>
    <template #default>
      <main class="vp-page music-page" id="main-content">
        <DropTransition appear :delay="0.16">
          <div class="music-shell">
            <audio
              ref="audioRef"
              :src="currentSong?.url"
              preload="metadata"
              @loadedmetadata="handleMetadata"
              @timeupdate="handleTimeUpdate"
              @ended="nextSong"
              @play="isPlaying = true"
              @pause="isPlaying = false"
            />

            <img v-if="currentSong?.pic" class="music-bg-cover" :src="currentSong.pic" alt="" />

            <section class="music-stage" aria-label="音乐播放器">
              <div class="turntable-wrap" :class="{ 'is-playing': isPlaying }">
                <button
                  class="turntable"
                  :class="{ playing: isPlaying }"
                  type="button"
                  :aria-label="isPlaying ? '暂停' : '播放'"
                  @click="togglePlay"
                >
                  <span class="record" :class="{ spinning: isPlaying }">
                    <img v-if="currentSong?.pic" :src="currentSong.pic" :alt="currentSong.name" />
                  </span>
                  <span class="tonearm" aria-hidden="true"></span>
                  <span class="status-dot" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
                <h1>{{ currentSongTitle }}</h1>
              </div>

              <div class="lyric-panel" aria-live="polite">
                <p
                  v-for="(line, index) in visibleLyrics"
                  :key="`${line.time}-${index}`"
                  :class="{ active: line.index === activeLyricIndex }"
                >
                  {{ line.text }}
                </p>
                <p v-if="!visibleLyrics.length" class="active">{{ loadingText }}</p>
              </div>
            </section>

            <section class="music-controls" aria-label="播放控制">
              <div class="progress-row">
                <span>{{ formatTime(currentTime) }}</span>
                <input
                  type="range"
                  min="0"
                  :max="duration || 0"
                  step="1"
                  :value="currentTime"
                  :style="progressStyle"
                  aria-label="播放进度"
                  @input="seek"
                />
                <span>{{ formatTime(duration) }}</span>
              </div>

              <div class="button-row">
                <button type="button" title="随机播放" @click="shuffleSong">
                  <i class="anzhiyufont anzhiyu-icon-shuffle"></i>
                </button>
                <button type="button" title="静音" :class="{ muted: isMuted }" @click="toggleMuted">
                  <i class="anzhiyufont anzhiyu-icon-music"></i>
                </button>
                <button type="button" title="上一首" @click="prevSong">
                  <i class="anzhiyufont anzhiyu-icon-backward"></i>
                </button>
                <button class="play-button" type="button" :title="isPlaying ? '暂停' : '播放'" @click="togglePlay">
                  <i class="anzhiyufont" :class="isPlaying ? 'anzhiyu-icon-pause' : 'anzhiyu-icon-play'"></i>
                </button>
                <button type="button" title="下一首" @click="nextSong">
                  <i class="anzhiyufont anzhiyu-icon-forward"></i>
                </button>
                <button type="button" title="播放列表" @click="showPlaylist = true">
                  <i class="anzhiyufont anzhiyu-icon-list-ul"></i>
                </button>
                <button type="button" :title="playlistMode === 'default' ? '切换到自定义歌单' : '切换到默认歌单'" @click="switchPlaylist">
                  <i class="anzhiyufont anzhiyu-icon-repeat"></i>
                </button>
              </div>
            </section>

          </div>
        </DropTransition>

        <div v-if="showPlaylist" class="playlist-mask" @click="showPlaylist = false"></div>
        <aside v-if="showPlaylist" class="playlist-panel" aria-label="当前播放列表">
          <header class="playlist-header">
            <div>
              <h2>当前播放</h2>
              <p>{{ songs.length }} 首歌曲</p>
            </div>
            <button type="button" aria-label="关闭播放列表" @click="showPlaylist = false">×</button>
          </header>

          <div class="playlist-list">
            <button
              v-for="(song, index) in songs"
              :key="`${song.name}-${song.artist}`"
              type="button"
              :class="{ active: index === currentIndex }"
              @click="selectSong(index)"
            >
              <span class="playlist-index">{{ index === currentIndex && isPlaying ? "Ⅱ" : formatIndex(index) }}</span>
              <span class="playlist-info">
                <strong>{{ song.name }}</strong>
                <small>{{ song.artist }}</small>
              </span>
              <img :src="song.pic" :alt="song.name" />
            </button>
          </div>
        </aside>
      </main>
    </template>
  </CommonWrapper>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import SkipLink from "@theme-hope/components/SkipLink";
import { DropTransition } from "@theme-hope/components/transitions/DropTransition";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

type Song = {
  name: string;
  artist: string;
  url: string;
  pic: string;
  lrc: string;
};

type LyricLine = {
  time: number;
  text: string;
  index: number;
};

type PlaylistMode = "default" | "custom";

const playlistApis: Record<PlaylistMode, string> = {
  default: "https://api.i-meto.com/meting/api?server=tencent&type=playlist&id=851947617",
  custom: "https://api.i-meto.com/meting/api?server=netease&type=playlist&id=8152976493",
};

const audioRef = ref<HTMLAudioElement | null>(null);
const songs = ref<Song[]>([]);
const lyrics = ref<LyricLine[]>([]);
const currentIndex = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
const isMuted = ref(false);
const showPlaylist = ref(false);
const playlistMode = ref<PlaylistMode>("default");
const loadingText = ref("音乐加载中");
const playlistCache = new Map<PlaylistMode, Song[]>();
const { status: themeStatus } = useDarkmode();

const currentSong = computed(() => songs.value[currentIndex.value]);
const currentSongTitle = computed(() =>
  currentSong.value ? `${currentSong.value.name} - ${currentSong.value.artist}` : "音乐馆"
);
const progressPercent = computed(() =>
  duration.value ? Math.min((currentTime.value / duration.value) * 100, 100) : 0
);
const progressStyle = computed<Record<string, string>>(() => ({
  "--progress": `${progressPercent.value}%`,
}));
const activeLyricIndex = computed(() => {
  const index = lyrics.value.findIndex((line, i) => {
    const next = lyrics.value[i + 1];
    return currentTime.value >= line.time && (!next || currentTime.value < next.time);
  });

  return index === -1 ? 0 : index;
});
const visibleLyrics = computed(() => {
  if (!lyrics.value.length) return [];

  const start = Math.max(activeLyricIndex.value - 4, 0);
  return lyrics.value.slice(start, start + 9);
});

const normalizeSong = (song: Partial<Song> & { title?: string; author?: string; cover?: string }): Song | null => {
  const name = song.name || song.title;
  const artist = song.artist || song.author;
  const pic = song.pic || song.cover;
  if (!name || !artist || !song.url) return null;

  return {
    name,
    artist,
    url: song.url,
    pic: pic || "/logo.png",
    lrc: song.lrc || "",
  };
};

const parseLyrics = (raw: string): LyricLine[] =>
  raw
    .split("\n")
    .map((line) => {
      const match = line.match(/^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)$/);
      if (!match) return null;

      const [, minutes, seconds, ms = "0", text] = match;
      const time = Number(minutes) * 60 + Number(seconds) + Number(`0.${ms}`);
      const cleanText = text.trim();

      return cleanText ? { time, text: cleanText, index: 0 } : null;
    })
    .filter((line): line is Omit<LyricLine, "index"> => Boolean(line))
    .map((line, index) => ({ ...line, index }));

const loadSongs = async (mode: PlaylistMode = playlistMode.value) => {
  try {
    if (!playlistCache.has(mode)) {
      const response = await fetch(`${playlistApis[mode]}&r=${Date.now()}`);
      const data = (await response.json()) as unknown;
      if (!Array.isArray(data)) throw new Error("Invalid playlist response");
      playlistCache.set(mode, data.map(normalizeSong).filter((song): song is Song => Boolean(song)));
    }

    songs.value = playlistCache.get(mode) || [];
    playlistMode.value = mode;
    currentIndex.value = 0;
    loadingText.value = songs.value.length ? "歌词加载中" : "歌单为空";
  } catch {
    loadingText.value = "音乐加载失败";
  }
};

const loadLyrics = async () => {
  lyrics.value = [];
  if (!currentSong.value?.lrc) return;

  try {
    const response = await fetch(currentSong.value.lrc);
    lyrics.value = parseLyrics(await response.text());
  } catch {
    lyrics.value = [];
  }
};

const playCurrent = async () => {
  await nextTick();
  await audioRef.value?.play().catch(() => {
    isPlaying.value = false;
  });
};

const togglePlay = async () => {
  const audio = audioRef.value;
  if (!audio || !currentSong.value) return;

  if (audio.paused) {
    await playCurrent();
  } else {
    audio.pause();
  }
};

const selectSong = async (index: number) => {
  currentIndex.value = index;
  currentTime.value = 0;
  await loadLyrics();
  await playCurrent();
};

const nextSong = () => {
  if (!songs.value.length) return;
  void selectSong((currentIndex.value + 1) % songs.value.length);
};

const prevSong = () => {
  if (!songs.value.length) return;
  void selectSong((currentIndex.value - 1 + songs.value.length) % songs.value.length);
};

const shuffleSong = () => {
  if (songs.value.length < 2) return;

  let next = currentIndex.value;
  while (next === currentIndex.value) {
    next = Math.floor(Math.random() * songs.value.length);
  }
  void selectSong(next);
};

const seek = (event: Event) => {
  const audio = audioRef.value;
  if (!audio) return;

  audio.currentTime = Number((event.target as HTMLInputElement).value);
  currentTime.value = audio.currentTime;
};

const handleMetadata = () => {
  duration.value = audioRef.value?.duration || 0;
};

const handleTimeUpdate = () => {
  currentTime.value = audioRef.value?.currentTime || 0;
};

const toggleMuted = () => {
  const audio = audioRef.value;
  if (!audio) return;

  audio.muted = !audio.muted;
  isMuted.value = audio.muted;
};

const switchPlaylist = async () => {
  const wasPlaying = isPlaying.value;
  const nextMode: PlaylistMode = playlistMode.value === "default" ? "custom" : "default";

  showPlaylist.value = false;
  await loadSongs(nextMode);
  await loadLyrics();
  if (wasPlaying) await playCurrent();
};

const formatTime = (time: number): string => {
  if (!Number.isFinite(time) || time <= 0) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const formatIndex = (index: number): string => (index + 1).toString().padStart(2, "0");

watch(currentSong, () => {
  duration.value = 0;
  currentTime.value = 0;
});

onMounted(async () => {
  themeStatus.value = "dark";
  document.documentElement.setAttribute("data-theme", "dark");
  document.body.setAttribute("data-type", "music");
  await loadSongs();
  await loadLyrics();
});

onUnmounted(() => {
  themeStatus.value = "auto";
  document.body.removeAttribute("data-type");
});
</script>

<style lang="scss">
body[data-type="music"] {
  overflow: hidden;
  background: #09090d !important;
}

body[data-type="music"] #app,
body[data-type="music"] .theme-container {
  min-height: 100vh;
  background: transparent !important;
}

body[data-type="music"] .aplayer {
  display: none !important;
}

.music-page {
  position: relative;
  width: 100vw;
  max-width: none;
  min-height: calc(100vh - var(--navbar-height));
  box-sizing: border-box;
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
  padding: 0;
  background: transparent !important;
  backdrop-filter: none !important;
  color: #f7f7f8;
}

.music-shell {
  position: relative;
  width: 100vw;
  min-height: calc(100vh - var(--navbar-height));
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 28%, rgba(98, 82, 77, 0.38), transparent 26rem),
    radial-gradient(circle at 72% 66%, rgba(103, 91, 76, 0.28), transparent 28rem),
    linear-gradient(120deg, #101018 0%, #0b0b0f 50%, #29283a 100%);
  font-family:
    "Noto Sans SC",
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.music-bg-cover {
  position: absolute;
  inset: -8%;
  width: 116%;
  height: 116%;
  object-fit: cover;
  filter: blur(74px) saturate(115%);
  opacity: 0.12;
  transform: scale(1.06);
}

.music-shell::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(180deg, rgba(8, 8, 12, 0.32), rgba(5, 5, 7, 0.56));
  pointer-events: none;
}

.music-stage,
.music-controls,
.playlist-mask,
.playlist-panel {
  position: relative;
  z-index: 1;
}

.music-stage {
  display: grid;
  grid-template-columns: minmax(320px, 520px) minmax(360px, 520px);
  gap: clamp(54px, 7vw, 120px);
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--navbar-height) - 220px);
  padding: 24px 32px 0;
}

.turntable-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.turntable-wrap.is-playing {
  animation: turntable-float 5.6s ease-in-out infinite;
}

.turntable-wrap.is-playing h1 {
  animation: title-breath 2.8s ease-in-out infinite;
}

.turntable {
  position: relative;
  width: min(38vh, 390px);
  aspect-ratio: 1;
  border: 0;
  border-radius: 34px;
  background: linear-gradient(145deg, #ffffff, #ececec);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease;
}

.turntable:hover {
  transform: translateY(-4px);
  box-shadow: 0 34px 82px rgba(0, 0, 0, 0.34);
}

.turntable.playing {
  box-shadow:
    0 34px 82px rgba(0, 0, 0, 0.34),
    0 0 46px rgba(255, 255, 255, 0.1);
}

.turntable::before {
  position: absolute;
  inset: 5%;
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), transparent 42%),
    radial-gradient(circle at 72% 22%, rgba(255, 255, 255, 0.62), transparent 16%);
  content: "";
  pointer-events: none;
}

.record {
  position: absolute;
  inset: 9%;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background:
    repeating-radial-gradient(circle, rgba(255, 255, 255, 0.14) 0 2px, rgba(23, 28, 36, 0.08) 2px 7px),
    conic-gradient(from 20deg, rgba(140, 156, 172, 0.9), rgba(230, 232, 230, 0.55), rgba(92, 104, 119, 0.82), rgba(180, 198, 217, 0.72), rgba(140, 156, 172, 0.9));
  box-shadow:
    inset 0 0 36px rgba(0, 0, 0, 0.25),
    inset 0 0 0 12px rgba(255, 255, 255, 0.1);
}

.record.spinning {
  animation: record-spin 7s linear infinite;
}

.record::after {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(115deg, transparent 22%, rgba(255, 255, 255, 0.34) 35%, transparent 49%);
  content: "";
  mix-blend-mode: screen;
  opacity: 0.58;
}

.record.spinning::after {
  animation: record-light 2.8s ease-in-out infinite;
}

.record img {
  position: relative;
  z-index: 1;
  width: 42%;
  height: 42%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 10px rgba(8, 10, 18, 0.24);
}

.tonearm {
  position: absolute;
  top: -5%;
  right: 4%;
  width: 18%;
  height: 80%;
  transform: rotate(6deg);
  transform-origin: 50% 8%;
  transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.turntable.playing .tonearm {
  transform: rotate(18deg);
  animation: tonearm-playing 3.2s ease-in-out infinite;
}

.tonearm::before {
  position: absolute;
  top: 10%;
  left: 44%;
  width: 10px;
  height: 72%;
  border-radius: 999px;
  background: linear-gradient(90deg, #b9bcc1, #ffffff, #797e83);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
  content: "";
}

.tonearm::after {
  position: absolute;
  right: 8%;
  bottom: 11%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f3f3;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  content: "";
}

.tonearm {
  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.28));
}

.tonearm::before {
  animation: tonearm-glint 3.6s ease-in-out infinite;
}

.status-dot {
  position: absolute;
  right: 18px;
  bottom: 18px;
  display: flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(34, 45, 42, 0.72);
  gap: 3px;
  color: #fff;
}

.status-dot::before {
  content: "▶";
  font-size: 13px;
  font-weight: 900;
}

.status-dot span {
  display: none;
  width: 4px;
  height: 14px;
  border-radius: 999px;
  background: #fff;
}

.turntable.playing .status-dot::before {
  display: none;
}

.turntable.playing .status-dot span {
  display: block;
  animation: equalizer 0.84s ease-in-out infinite;
}

.turntable.playing .status-dot span:nth-child(2) {
  animation-delay: 0.14s;
}

.turntable.playing .status-dot span:nth-child(3) {
  animation-delay: 0.28s;
}

.turntable-wrap h1 {
  margin: 24px 0 0;
  font-size: clamp(28px, 2vw, 40px);
  line-height: 1.1;
  text-align: center;
  text-shadow: 0 12px 34px rgba(255, 255, 255, 0.18);
}

.lyric-panel {
  height: 430px;
  overflow: hidden;
  mask-image: linear-gradient(transparent, #000 18%, #000 72%, transparent);
}

.lyric-panel p {
  margin: 0 0 28px;
  color: rgba(255, 255, 255, 0.18);
  font-size: clamp(22px, 1.72vw, 34px);
  font-weight: 900;
  line-height: 1.35;
  transition: 0.25s ease;
}

.lyric-panel p.active {
  color: #fff;
  filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.34));
  transform: translateX(2px);
}

.music-controls {
  width: min(1120px, calc(100vw - 120px));
  margin: 0 auto 42px;
}

.progress-row {
  display: grid;
  grid-template-columns: 42px 1fr 42px;
  gap: 18px;
  align-items: center;
  color: rgba(255, 255, 255, 0.62);
  font-size: 16px;
  font-weight: 700;
}

.progress-row input {
  width: 100%;
  height: 8px;
  appearance: none;
  border-radius: 999px;
  background:
    linear-gradient(#fff, #fff) 0 / var(--progress) 100% no-repeat,
    rgba(255, 255, 255, 0.35);
  box-shadow: 0 0 14px rgba(255, 255, 255, 0.28);
}

.progress-row input::-webkit-slider-thumb {
  width: 0;
  height: 0;
  appearance: none;
}

.button-row {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: center;
  margin-top: 44px;
}

.button-row button {
  position: relative;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #15151a;
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.button-row button i {
  font-size: 1.05em;
  line-height: 1;
}

.button-row button.muted i {
  opacity: 0.42;
}

.button-row button.muted::after {
  position: absolute;
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  content: "";
  transform: rotate(-38deg);
}

.button-row button:hover {
  transform: translateY(-4px);
  background: #fff;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.32);
}

.button-row button:active {
  transform: translateY(-1px) scale(0.94);
}

.button-row .play-button {
  width: 62px;
  height: 62px;
  font-size: 28px;
}

.playlist-mask {
  position: fixed;
  inset: var(--navbar-height) 0 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.24);
}

.playlist-panel {
  position: fixed;
  top: var(--navbar-height);
  right: 0;
  bottom: 0;
  z-index: 21;
  width: min(520px, calc(100vw - 96px));
  border-left: 1px solid rgba(255, 255, 255, 0.13);
  background: #191a1f;
  box-shadow: -28px 0 80px rgba(0, 0, 0, 0.38);
}

.playlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 96px;
  padding: 0 22px 0 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.playlist-header h2 {
  margin: 0 0 8px;
  color: #fff;
  font-size: 24px;
  line-height: 1.1;
}

.playlist-header p {
  margin: 0;
  color: #9c9daf;
  font-size: 15px;
  font-weight: 800;
}

.playlist-header button {
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: 12px;
  background: #2d303a;
  color: #fff;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
}

.playlist-list {
  height: calc(100% - 96px);
  overflow-y: auto;
  padding: 12px 18px 24px;
}

.playlist-list button {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) 50px;
  gap: 14px;
  align-items: center;
  width: 100%;
  min-height: 70px;
  padding: 8px 10px 8px 14px;
  border: 0;
  border-radius: 14px;
  background: transparent;
  color: #eef0f7;
  text-align: left;
  cursor: pointer;
}

.playlist-list button.active {
  background: rgba(96, 70, 32, 0.32);
  box-shadow: inset 0 0 0 2px rgba(132, 93, 28, 0.58);
}

.playlist-list button:hover {
  background: rgba(255, 255, 255, 0.12);
}

.playlist-list button.active:hover {
  background: rgba(96, 70, 32, 0.38);
}

.playlist-index {
  color: #a5a6ba;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
}

.playlist-info {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.playlist-info strong,
.playlist-info small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playlist-info strong {
  color: #f1f2f8;
  font-size: 18px;
  line-height: 1.2;
}

.playlist-info small {
  color: #9c9daf;
  font-size: 14px;
}

.playlist-list button.active .playlist-info strong {
  color: #f5b82f;
}

.playlist-list img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
  background: #2b2e38;
}

@keyframes record-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes turntable-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes title-breath {
  0%,
  100% {
    text-shadow: 0 12px 34px rgba(255, 255, 255, 0.18);
  }

  50% {
    text-shadow: 0 14px 40px rgba(255, 255, 255, 0.36);
  }
}

@keyframes tonearm-playing {
  0%,
  100% {
    transform: rotate(18deg);
  }

  50% {
    transform: rotate(20deg);
  }
}

@keyframes record-light {
  0%,
  100% {
    opacity: 0.28;
    transform: rotate(0deg);
  }

  50% {
    opacity: 0.7;
    transform: rotate(16deg);
  }
}

@keyframes equalizer {
  0%,
  100% {
    height: 8px;
  }

  50% {
    height: 18px;
  }
}

@keyframes tonearm-glint {
  0%,
  100% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1.22);
  }
}

@media (max-width: 900px) {
  body[data-type="music"] {
    overflow: auto;
  }

  .music-shell {
    width: 100vw;
    min-height: calc(100vh - var(--navbar-height));
    margin: 0 auto;
    background:
      radial-gradient(circle at 48% 40%, rgba(84, 75, 64, 0.24), transparent 20rem),
      linear-gradient(180deg, #151313 0%, #050505 100%);
  }

  .music-stage {
    display: flex;
    min-height: 0;
    padding: 88px 40px 0;
    flex-direction: column;
    gap: 76px;
  }

  .turntable {
    width: min(86vw, 370px);
    border-radius: 28px;
  }

  .turntable-wrap h1 {
    margin-top: 86px;
    font-size: 31px;
  }

  .lyric-panel {
    width: 100%;
    box-sizing: border-box;
    height: 360px;
    padding: 0 58px;
    mask-image: linear-gradient(transparent 0, #000 14%, #000 78%, transparent 100%);
  }

  .lyric-panel p {
    margin-bottom: 30px;
    font-size: 38px;
  }

  .lyric-panel p.active {
    filter: blur(0) drop-shadow(0 0 24px rgba(255, 255, 255, 0.35));
  }

  .music-controls {
    position: sticky;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 28px 28px 46px;
    background: linear-gradient(180deg, rgba(5, 5, 5, 0.74), #050505 38%);
  }

  .progress-row {
    grid-template-columns: 44px minmax(0, 1fr) 44px;
    gap: 10px;
    font-size: 18px;
  }

  .button-row {
    gap: 14px;
    justify-content: center;
    margin-top: 36px;
  }

  .button-row button:nth-child(3) {
    order: 1;
  }

  .button-row button:nth-child(6) {
    order: 2;
  }

  .button-row .play-button {
    order: 3;
  }

  .button-row button:nth-child(5) {
    order: 4;
  }

  .button-row button:nth-child(7) {
    order: 5;
  }

  .button-row button {
    width: 52px;
    height: 52px;
    flex: 0 0 52px;
    font-size: 21px;
  }

  .button-row button:nth-child(1),
  .button-row button:nth-child(2) {
    display: none;
  }

  .button-row .play-button {
    width: 62px;
    height: 62px;
    flex-basis: 62px;
    font-size: 28px;
  }

  .playlist-mask {
    inset: var(--navbar-height) 0 0;
  }

  .playlist-panel {
    left: 0;
    width: 100%;
  }

  .playlist-list button {
    grid-template-columns: 44px minmax(0, 1fr) 48px;
    gap: 12px;
  }
}

@media (max-width: 520px) {
  .music-stage {
    padding: 54px 24px 0;
    gap: 36px;
  }

  .turntable-wrap h1 {
    margin-top: 48px;
    font-size: 26px;
  }

  .lyric-panel {
    height: 270px;
    padding: 0 12px;
  }

  .lyric-panel p {
    margin-bottom: 22px;
    font-size: 24px;
  }

  .music-controls {
    padding: 22px 16px 32px;
  }

  .progress-row {
    grid-template-columns: 38px minmax(0, 1fr) 38px;
    gap: 8px;
    font-size: 16px;
  }

  .button-row {
    gap: 10px;
    margin-top: 28px;
  }

  .button-row button {
    width: 44px;
    height: 44px;
    flex-basis: 44px;
    font-size: 18px;
  }

  .button-row .play-button {
    width: 54px;
    height: 54px;
    flex-basis: 54px;
  }

  .playlist-header {
    min-height: 88px;
    padding: 0 16px 0 20px;
  }

  .playlist-header h2 {
    font-size: 22px;
  }

  .playlist-header p {
    font-size: 14px;
  }

  .playlist-header button {
    width: 42px;
    height: 42px;
    font-size: 28px;
  }

  .playlist-list {
    height: calc(100% - 88px);
    padding: 10px 12px 22px;
  }

  .playlist-list button {
    min-height: 64px;
    padding: 8px;
  }

  .playlist-index {
    font-size: 17px;
  }

  .playlist-info strong {
    font-size: 17px;
  }

  .playlist-info small {
    font-size: 13px;
  }

  .playlist-list img {
    width: 48px;
    height: 48px;
    border-radius: 10px;
  }
}
</style>
