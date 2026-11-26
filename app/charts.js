/* Kenya in Numbers — small SVG chart helpers.
   No libraries, no network. Each function renders into an element
   by id and returns the SVG markup it inserted. */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, text) {
    var n = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    }
    if (text !== undefined && text !== null) { n.textContent = text; }
    return n;
  }

  function fmt(n) {
    return n.toLocaleString("en-US");
  }

  /* Line chart: points = [{x: label, y: number}], opts {w,h,ymin,ymax,
     unit, color, labelEvery}. Y axis starts at 0 unless ymin given. */
  function lineChart(id, points, opts) {
    var host = document.getElementById(id);
    if (!host) { return ""; }
    opts = opts || {};
    var w = opts.w || 720, h = opts.h || 300;
    var padL = 64, padR = 16, padT = 18, padB = 34;
    var ys = points.map(function (p) { return p.y; });
    var ymin = (opts.ymin !== undefined) ? opts.ymin : 0;
    var ymax = Math.max.apply(null, ys) * 1.06;
    if (opts.ymax !== undefined) { ymax = opts.ymax; }
    function X(i) { return padL + (i * (w - padL - padR)) / Math.max(points.length - 1, 1); }
    function Y(v) { return padT + (1 - (v - ymin) / (ymax - ymin)) * (h - padT - padB); }

    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, role: "img",
      "aria-label": opts.aria || "Line chart", "class": "chart-svg" });

    /* gridlines + y labels (3 ticks) */
    [0, 0.5, 1].forEach(function (f) {
      var v = ymin + f * (ymax - ymin);
      var y = Y(v);
      svg.appendChild(el("line", { x1: padL, x2: w - padR, y1: y, y2: y, "class": "grid" }));
      svg.appendChild(el("text", { x: padL - 8, y: y + 4, "class": "axis", "text-anchor": "end" },
        opts.yfmt ? opts.yfmt(v) : fmt(Math.round(v))));
    });

    var d = points.map(function (p, i) {
      return (i === 0 ? "M" : "L") + X(i).toFixed(1) + " " + Y(p.y).toFixed(1);
    }).join(" ");
    svg.appendChild(el("path", { d: d, "class": "line", fill: "none" }));
    /* area under the line */
    var area = d + " L" + X(points.length - 1).toFixed(1) + " " + Y(ymin).toFixed(1) +
      " L" + X(0).toFixed(1) + " " + Y(ymin).toFixed(1) + " Z";
    svg.insertBefore(el("path", { d: area, "class": "area" }), svg.querySelector(".line"));

    points.forEach(function (p, i) {
      svg.appendChild(el("circle", { cx: X(i), cy: Y(p.y), r: 5, "class": "dot" }));
      svg.appendChild(el("text", { x: X(i), y: Y(p.y) - 10, "class": "val", "text-anchor": "middle" },
        opts.yfmt ? opts.yfmt(p.y) : fmt(p.y)));
      svg.appendChild(el("text", { x: X(i), y: h - 10, "class": "axis", "text-anchor": "middle" }, String(p.x)));
    });

    host.innerHTML = "";
    host.appendChild(svg);
    return host.innerHTML;
  }

  /* Vertical bar chart: bars = [{label, value}], opts {w,h,unit,color} */
  function barChart(id, bars, opts) {
    var host = document.getElementById(id);
    if (!host) { return ""; }
    opts = opts || {};
    var w = opts.w || 720, h = opts.h || 300;
    var padL = 56, padR = 12, padT = 26, padB = 40;
    var max = Math.max.apply(null, bars.map(function (b) { return b.value; })) * 1.12;
    var slot = (w - padL - padR) / bars.length;
    var bw = Math.min(64, slot * 0.62);
    function Y(v) { return padT + (1 - v / max) * (h - padT - padB); }

    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, role: "img",
      "aria-label": opts.aria || "Bar chart", "class": "chart-svg" });
    [0, 0.5, 1].forEach(function (f) {
      var y = Y(max * f);
      svg.appendChild(el("line", { x1: padL, x2: w - padR, y1: y, y2: y, "class": "grid" }));
      svg.appendChild(el("text", { x: padL - 8, y: y + 4, "class": "axis", "text-anchor": "end" },
        opts.yfmt ? opts.yfmt(max * f) : fmt(Math.round(max * f))));
    });
    bars.forEach(function (b, i) {
      var x = padL + i * slot + (slot - bw) / 2;
      svg.appendChild(el("rect", { x: x, y: Y(b.value), width: bw, height: h - padB - Y(b.value), "class": "bar", rx: 4 }));
      svg.appendChild(el("text", { x: x + bw / 2, y: Y(b.value) - 8, "class": "val", "text-anchor": "middle" },
        opts.yfmt ? opts.yfmt(b.value) : fmt(b.value)));
      svg.appendChild(el("text", { x: x + bw / 2, y: h - 12, "class": "axis", "text-anchor": "middle" }, b.label));
    });
    host.innerHTML = "";
    host.appendChild(svg);
    return host.innerHTML;
  }

  /* Horizontal bars with labels — good for shares and county ranking. */
  function hbarChart(id, bars, opts) {
    var host = document.getElementById(id);
    if (!host) { return ""; }
    opts = opts || {};
    var w = opts.w || 720, rowH = opts.rowH || 34;
    var h = rowH * bars.length + 16;
    var padL = opts.labelW || 210, padR = 64;
    var max = Math.max.apply(null, bars.map(function (b) { return b.value; })) * 1.08;
    var svg = el("svg", { viewBox: "0 0 " + w + " " + h, role: "img",
      "aria-label": opts.aria || "Horizontal bar chart", "class": "chart-svg" });
    bars.forEach(function (b, i) {
      var y = 8 + i * rowH;
      var bw = (b.value / max) * (w - padL - padR);
      svg.appendChild(el("text", { x: padL - 10, y: y + 17, "class": "axis", "text-anchor": "end" }, b.label));
      svg.appendChild(el("rect", { x: padL, y: y + 4, width: Math.max(bw, 2), height: 18, "class": "bar", rx: 3 }));
      svg.appendChild(el("text", { x: padL + Math.max(bw, 2) + 8, y: y + 18, "class": "val" },
        opts.yfmt ? opts.yfmt(b.value) : fmt(b.value)));
    });
    host.innerHTML = "";
    host.appendChild(svg);
    return host.innerHTML;
  }

  window.KENYA_CHARTS = { line: lineChart, bar: barChart, hbar: hbarChart };
})();
