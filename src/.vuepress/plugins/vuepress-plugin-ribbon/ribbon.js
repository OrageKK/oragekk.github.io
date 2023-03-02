/*jshint -W030 */
function ribbon(type = "home", zIndex = -1, alpha = 0.6, size = 90) {
  var config = {
    z: zIndex, // z-index
    a: alpha, // alpha
    s: size, // size
  };

  var canvas = deWeight(),
    g2d = canvas.getContext('2d'),
    pr = window.devicePixelRatio || 1,
    width = window.innerWidth,
    height = window.innerHeight,
    f = config.s,
    q, t,
    m = Math,
    r = 0,
    pi = m.PI * 2,
    cos = m.cos,
    random = m.random;
  canvas.width = width * pr;
  canvas.height = height * pr;
  g2d.scale(pr, pr);
  g2d.globalAlpha = config.a;

  canvas.id = "ribbon";
  canvas.style.cssText = 'position:fixed;top:0;left:0;z-index: ' + config.z + ';width:100%;height:100%;pointer-events:none;';
  // create canvas
  // document.getElementsByTagName('body')[0].appendChild(canvas);
  // document.getElementsByClassName('page')[0].appendChild(canvas)
  function select() {
    if (type == "home") {
      document.getElementsByClassName('page')[0].appendChild(canvas)
    } else {
      document.getElementsByClassName('theme-container')[0].appendChild(canvas)
    }
  }
  select()
  function redraw() {
    g2d.clearRect(0, 0, width, height);
    q = [{ x: 0, y: height * 0.7 + f }, { x: 0, y: height * 0.7 - f }];
    while (q[1].x < width + f) draw(q[0], q[1]);
  }
  function draw(i, j) {
    g2d.beginPath();
    g2d.moveTo(i.x, i.y);
    g2d.lineTo(j.x, j.y);
    var k = j.x + (random() * 2 - 0.25) * f, n = line(j.y);
    g2d.lineTo(k, n);
    g2d.closePath();
    r -= pi / -50;
    g2d.fillStyle = '#' + (cos(r) * 127 + 128 << 16 | cos(r + pi / 3) * 127 + 128 << 8 | cos(r + pi / 3 * 2) * 127 + 128).toString(16);
    g2d.fill();
    q[0] = q[1];
    q[1] = { x: k, y: n };
  }
  function line(p) {
    t = p + (random() * 2 - 1.1) * f;
    return (t > height || t < 0) ? line(p) : t;
  }

  document.onclick = redraw;
  // document.ontouchstart = redraw;
  redraw();
};
function deWeight() {
  if (document.getElementById("ribbon") != null) {
    return document.getElementById("ribbon")
  } else {
    return document.createElement('canvas')
  }
}
function remove() {
  var el = document.querySelector("#ribbon")
  el && (el.remove())
}
var script = {
  ribbon,
  remove
};
export default script