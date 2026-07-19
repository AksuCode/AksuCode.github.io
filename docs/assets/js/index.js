// Gentle mouse parallax on the scene layers — disabled for reduced-motion / touch.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  if (reduce || !fine) return;

  var layers = Array.prototype.slice.call(document.querySelectorAll("[data-depth]"));
  var tx = 0, ty = 0, cx = 0, cy = 0, ticking = false;

  function onMove(e) {
    var nx = (e.clientX / window.innerWidth) - 0.5;
    var ny = (e.clientY / window.innerHeight) - 0.5;
    tx = nx; ty = ny;
    if (!ticking) { ticking = true; requestAnimationFrame(render); }
  }

  function render() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    layers.forEach(function (el) {
      var d = parseFloat(el.getAttribute("data-depth")) || 0;
      el.style.transform = "translate(" + (cx * d) + "px," + (cy * d * 0.5) + "px)";
    });
    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
      requestAnimationFrame(render);
    } else {
      ticking = false;
    }
  }

  window.addEventListener("mousemove", onMove, { passive: true });
})();