/**
 * 文章封面图容错：
 * 1. 配置了 cover 但加载失败 -> 捕获 error 事件，随机替换为本地兜底图
 * 2. 未配置 cover（ArticleItem 不渲染 img） -> 主动向 .vp-article-item 注入随机兜底图
 *
 * 封面由 vuepress-theme-hope 的 ArticleItem 渲染为
 * `<img class="vp-article-cover" src="withBase(cover)" />`，
 * 由于其内部为硬编码引用，无法通过插槽注入，故采用事件委托 + DOM 注入方式处理。
 * 注意：img 的 `error` 事件不冒泡，必须在捕获阶段监听。
 */

// 本地兜底封面，路径与 public 目录约定一致（base 为 `/`）
const FALLBACK_COVERS: string[] = [
  "/assets/images/cover/wallhaven-6lw7v6.jpg",
  "/assets/images/cover/wallhaven-ex8j2k.jpg",
  "/assets/images/cover/wallhaven-k82p6d.png",
  "/assets/images/cover/wallhaven-og2re5.jpg",
  "/assets/images/cover/wallhaven-vp51z3.jpg",
];

const HANDLED_FLAG = "data-cover-fallback";
const COVER_CLASS = "vp-article-cover";
const ITEM_SELECTOR = ".vp-article-item";

const getRandomCover = (): string =>
  FALLBACK_COVERS[Math.floor(Math.random() * FALLBACK_COVERS.length)];

// 创建一张兜底封面 img，结构与 ArticleItem 渲染的保持一致
const createFallbackCover = (): HTMLImageElement => {
  const img = new Image();
  img.className = COVER_CLASS;
  img.src = getRandomCover();
  img.alt = "";
  img.loading = "lazy";
  img.setAttribute(HANDLED_FLAG, "true");
  return img;
};

// 1. 配置了 cover 但加载失败：捕获 error 事件，随机替换为本地兜底图
const handleError = (event: Event): void => {
  const target = event.target as HTMLElement | null;

  // 仅处理文章封面图
  if (!(target instanceof HTMLImageElement)) return;
  if (!target.classList.contains(COVER_CLASS)) return;

  // 避免兜底图再次失败时死循环
  if (target.hasAttribute(HANDLED_FLAG)) return;
  target.setAttribute(HANDLED_FLAG, "true");

  target.src = getRandomCover();
};

// 2. 未配置 cover：向无封面的 .vp-article-item 注入随机兜底图
const injectMissingCovers = (): void => {
  document.querySelectorAll<HTMLElement>(ITEM_SELECTOR).forEach((item) => {
    if (item.querySelector(`.${COVER_CLASS}`)) return;
    item.prepend(createFallbackCover());
  });
};

// 用 rAF 批量合并 DOM 变更回调，避免频繁扫描
let scheduled = false;
const scheduleInject = (): void => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    injectMissingCovers();
  });
};

export const setupCoverFallback = (): void => {
  // error 事件不冒泡，使用捕获阶段在 document 上统一拦截
  document.addEventListener("error", handleError, true);

  // 首次注入（已在博客首页时）
  injectMissingCovers();

  // 监听文章列表 DOM 变化（分页 / 路由切换后新渲染的条目），自动注入
  new MutationObserver(scheduleInject).observe(document.body, {
    childList: true,
    subtree: true,
  });
};
