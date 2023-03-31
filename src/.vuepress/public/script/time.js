function show_runtime() {
    window.setTimeout("show_runtime()", 1000);
    X = new Date("8/24/2016 10:28:00");
    Y = new Date();
    T = Y.getTime() - X.getTime();
    M = 24 * 60 * 60 * 1000;
    a = T / M;
    A = Math.floor(a);
    b = (a - A) * 24;
    B = Math.floor(b);
    c = (b - B) * 60;
    C = Math.floor((b - B) * 60);
    D = Math.floor((c - C) * 60);
    const el = document.getElementById("runtime_span")
    el && (el.innerHTML =
        "本小站已苟延残喘: " + A + "天" + B + "小时" + C + "分" + D + "秒")
}
show_runtime();

(function log() {
    console.log(
        `%c ✨上冬十二的博客 v2.1.0✨ %c https://oragekk.me %c\n
    你，对，你，就是你\n
                - ( ゜- ゜)つロ 乾杯~\n
                        ---- 最是春风留不住，徒留我孤直。\n
                                欲寄彩笺兼尺素，山长水阔知何处？\n`,
        `color: #f9f4dc; background: #ee3f4d; padding:5px; font-size:12px;`,
        `background: #00ffc0; padding:5px; font-size:12px; color:#34a3ff;`,
        `color: #51c4d3; font-size:12px;`
    );
})();