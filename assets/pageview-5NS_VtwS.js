import{M as i}from"./app-TPRGYcr_.js";var o={provider:"Waline",dark:'html[data-theme="dark"]',serverURL:"https://talk.oragekk.me/",reaction:!0,requiredMeta:["nick"],wordLimit:300,emoji:["https://unpkg.com/@waline/emojis@1.1.0/tieba","https://unpkg.com/@waline/emojis@1.1.0/weibo","https://emoji.shojo.cn/bili/webp/tv_小电视_动图","https://emoji.shojo.cn/bili/webp/罗小黑战记","https://emoji.shojo.cn/bili/webp/2233娘","https://emoji.shojo.cn/bili/webp/装扮小姐姐梦幻冬季","https://emoji.shojo.cn/bili/webp/装扮小姐姐·秋日午后","https://emoji.shojo.cn/bili/webp/星尘","https://emoji.shojo.cn/bili/webp/池年"]};const r=async()=>{try{const{pageviewCount:e}=await i(()=>import("./app-TPRGYcr_.js").then(t=>t.Y),__vite__mapDeps([]));return e({serverURL:o.serverURL})}catch{console.error("@waline/client is not installed!")}};export{r as updatePageview};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
