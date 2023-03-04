function figure() {
  const div = document.createElement("div");
  div.className = "figure-bg";
  div.style.cssText =
    "position:fixed;top:0;left:0;z-index:1;width:100%;height:100%;pointer-events:none;background: url(/assets/bg.svg) center/cover no-repeat;";
  document.body.appendChild(div);
}
export default figure;
