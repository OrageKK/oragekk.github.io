import{M as i}from"./app-LXt6v6qG.js";var o={provider:"Waline",dark:'html[data-theme="dark"]',serverURL:"https://talk.oragekk.me/",reaction:!0,requiredMeta:["nick"],wordLimit:300,emoji:["https://unpkg.com/@waline/emojis@1.1.0/tieba","https://unpkg.com/@waline/emojis@1.1.0/weibo","https://emoji.shojo.cn/bili/src/tv_小电视_动图","https://emoji.shojo.cn/bili/src/罗小黑战记","https://emoji.shojo.cn/bili/src/剑网3·侠肝义胆沈剑心","https://emoji.shojo.cn/bili/src/装扮小姐姐梦幻冬季","https://emoji.shojo.cn/bili/src/装扮小姐姐·秋日午后","https://emoji.shojo.cn/bili/src/天涯明月刀真武"]};const s=async()=>{try{const{pageviewCount:e}=await i(()=>import("./app-LXt6v6qG.js").then(t=>t.X),__vite__mapDeps([]));return e({serverURL:o.serverURL})}catch{console.error("@waline/client is not installed!");return}};export{s as updatePageview};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}