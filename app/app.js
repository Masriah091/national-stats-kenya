/* Kenya in Numbers — page behaviour: KPI cards, charts, sortable
   tables, filters and tabs. Every control on the site is wired here
   and works without network. */
(function () {
  "use strict";

  var D = window.KENYA_DATA;
  var C = window.KENYA_CHARTS;

  function fmt(n) { return n.toLocaleString("en-US"); }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text !== undefined) { n.textContent = text; }
    return n;
  }

  /* ---- shared: mark the current page in the nav ---- */
  function markNav() {
    var page = document.body.getAttribute("data-page") || "home";
    document.querySelectorAll(".nav a").forEach(function (a) {
      if (a.getAttribute("data-nav") === page) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
    });
  }

  /* ---- shared: render the 8 KPI cards wherever .kpi-grid exists ---- */
  function renderKpis() {
    var grid = document.querySelector(".kpi-grid");
    if (!grid) { return; }
    D.kpis.forEach(function (k) {
      var card = el("article", "kpi");
      card.appendChild(el("div", "kpi-label", k.label));
      card.appendChild(el("div", "kpi-value", k.value));
      card.appendChild(el("div", "kpi-detail", k.detail));
      grid.appendChild(card);
    });
  }

  /* ---- sortable tables: click a th[data-sort] to sort ---- */
  function makeSortable(table) {
    if (!table) { return; }
    var tbody = table.querySelector("tbody");
    var ths = table.querySelectorAll("th[data-sort]");
    ths.forEach(function (th) {
      th.setAttribute("tabindex", "0");
      th.setAttribute("role", "button");
      th.title = "Click to sort";
      function sort() {
        var key = th.getAttribute("data-sort");
        var dir = th.getAttribute("data-dir") === "asc" ? -1 : 1;
        ths.forEach(function (t) { t.removeAttribute("data-dir"); t.classList.remove("sorted"); });
        th.setAttribute("data-dir", dir === 1 ? "asc" : "desc");
        th.classList.add("sorted");
        var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr"));
        rows.sort(function (a, b) {
          var av = a.querySelector("[data-v-" + key + "]");
          var bv = b.querySelector("[data-v-" + key + "]");
          var an = av ? parseFloat(av.getAttribute("data-v-" + key)) : 0;
          var bn = bv ? parseFloat(bv.getAttribute("data-v-" + key)) : 0;
          if (!isNaN(an) && !isNaN(bn)) { return (an - bn) * dir; }
          var at = av ? av.textContent : "", bt = bv ? bv.textContent : "";
          return at.localeCompare(bt) * dir;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      }
      th.addEventListener("click", sort);
      th.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sort(); } });
    });
  }

  /* ---- text filter for a table: input[data-filter-for] ---- */
  function wireFilter(input) {
    if (!input) { return; }
    var table = document.getElementById(input.getAttribute("data-filter-for"));
    if (!table) { return; }
    var count = document.querySelector("[data-filter-count]");
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      table.querySelectorAll("tbody tr").forEach(function (tr) {
        var hit = tr.textContent.toLowerCase().indexOf(q) !== -1;
        tr.style.display = hit ? "" : "none";
        if (hit) { shown++; }
      });
      if (count) { count.textContent = shown + " of " + table.querySelectorAll("tbody tr").length + " rows shown"; }
    });
  }

  /* ---- tabs: buttons[data-tab] switch panels[data-panel] ---- */
  function wireTabs() {
    var tabs = document.querySelectorAll("[data-tab]");
    if (!tabs.length) { return; }
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-tab");
        tabs.forEach(function (b) { b.classList.toggle("active", b === btn); b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
        document.querySelectorAll("[data-panel]").forEach(function (p) {
          p.hidden = p.getAttribute("data-panel") !== name;
        });
      });
    });
  }

  /* ---- per-page chart + table builders ---- */
  function buildHome() {
    C.line("hero-pop-chart", D.populationTrend.map(function (p) {
      return { x: p.year, y: p.value };
    }), { h: 220, aria: "Population of Kenya, census 2009 and 2019 and World Bank estimates 2023 and 2024",
      yfmt: function (v) { return (v / 1e6).toFixed(0) + "m"; } });
    C.hbar("home-sector-chart", D.sectorShares.map(function (s) {
      return { label: s.label, value: s.value };
    }), { rowH: 30, aria: "Share of GDP by sector, 2024", yfmt: function (v) { return v.toFixed(1) + "%"; } });
    var list = document.getElementById("home-county-list");
    if (list) {
      D.counties.slice(0, 5).forEach(function (c) {
        var li = el("li", "");
        li.innerHTML = "<strong>#" + c.rank + " " + c.name + "</strong> — " + fmt(c.pop) +
          " people <span class='muted'>(2019 census)</span>";
        list.appendChild(li);
      });
    }
  }

  function buildPopulation() {
    C.line("pop-trend-chart", D.populationTrend.map(function (p) {
      return { x: p.year, y: p.value };
    }), { aria: "Population trend 2009 to 2024", yfmt: function (v) { return (v / 1e6).toFixed(1) + "m"; } });
    C.bar("pop-age-chart", [
      { label: "Aged 0–14", value: 36.8 },
      { label: "Aged 15–64", value: 60.2 },
      { label: "Aged 65+", value: 3.0 }
    ], { aria: "Age structure, 2024, percent of population", yfmt: function (v) { return v.toFixed(1) + "%"; } });
    var tbody = document.querySelector("#county-table tbody");
    if (tbody) {
      D.counties.forEach(function (c) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td data-v-rank='" + c.rank + "'>" + c.rank + "</td>" +
          "<td data-v-name='" + c.name + "'><strong>" + c.name + "</strong></td>" +
          "<td data-v-pop='" + c.pop + "'>" + fmt(c.pop) + "</td>" +
          "<td data-v-density='" + (c.density || 0) + "'>" + (c.density ? fmt(c.density) : "—") + "</td>" +
          "<td>" + c.capital + "</td>";
        tbody.appendChild(tr);
      });
    }
    var facts = document.getElementById("pop-facts");
    if (facts) {
      D.populationFacts.forEach(function (f) {
        var li = el("li", "");
        li.innerHTML = "<strong>" + f.value + "</strong> — " + f.label +
          " <span class='muted'>(" + f.source + ")</span>";
        facts.appendChild(li);
      });
    }
  }

  function buildEconomy() {
    C.bar("gdp-growth-chart", D.gdpGrowth.map(function (g) {
      return { label: String(g.year), value: g.value };
    }), { aria: "Real GDP growth 2021 to 2024, percent", yfmt: function (v) { return v.toFixed(1) + "%"; } });
    C.hbar("sector-chart", D.sectorShares.map(function (s) {
      return { label: s.label, value: s.value };
    }), { aria: "Share of GDP by sector, 2024", yfmt: function (v) { return v.toFixed(1) + "%"; } });
    C.bar("mm-chart", D.mobileMoney.map(function (m) {
      return { label: String(m.year), value: m.value };
    }), { aria: "Mobile money value moved via agents, KSh trillion", yfmt: function (v) { return v.toFixed(2); } });
    var tbody = document.querySelector("#crop-table tbody");
    if (tbody) {
      D.crops.forEach(function (c) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td data-v-crop='" + c.crop + "'><strong>" + c.crop + "</strong></td>" +
          "<td>" + c.unit + "</td>" +
          "<td data-v-y2023='" + c.y2023 + "'>" + fmt(c.y2023) + "</td>" +
          "<td data-v-y2024='" + c.y2024 + "'>" + fmt(c.y2024) + "</td>" +
          "<td data-v-change='" + c.change + "'>" + c.change + "</td>";
        tbody.appendChild(tr);
      });
    }
    var facts = document.getElementById("mm-facts");
    if (facts) {
      D.mobileFacts.forEach(function (f) {
        var li = el("li", "");
        li.innerHTML = "<strong>" + f.value + "</strong> — " + f.label +
          " <span class='muted'>(" + f.source + ")</span>";
        facts.appendChild(li);
      });
    }
    var gdp = document.getElementById("gdp-levels");
    if (gdp) {
      D.gdpLevels.forEach(function (g) {
        var li = el("li", "");
        li.innerHTML = "<strong>" + g.value + "</strong> — " + g.label +
          " <span class='muted'>(" + g.year + " · " + g.source + ")</span>";
        gdp.appendChild(li);
      });
    }
  }

  function buildRegions() {
    C.hbar("county-pop-chart", D.counties.slice(0, 8).map(function (c) {
      return { label: c.name, value: c.pop / 1e6 };
    }), { aria: "Largest counties by 2019 census population, millions",
      yfmt: function (v) { return v.toFixed(2) + "m"; }, labelW: 110 });
    var tbody = document.querySelector("#region-table tbody");
    if (tbody) {
      D.counties.forEach(function (c) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td data-v-rank='" + c.rank + "'>" + c.rank + "</td>" +
          "<td data-v-name='" + c.name + "'><strong>" + c.name + "</strong></td>" +
          "<td data-v-pop='" + c.pop + "'>" + fmt(c.pop) + "</td>" +
          "<td data-v-density='" + (c.density || 0) + "'>" + (c.density ? fmt(c.density) : "—") + "</td>" +
          "<td>" + c.zone + "</td><td>" + c.lead + "</td>";
        tbody.appendChild(tr);
      });
    }
    var ct = document.querySelector("#climate-table tbody");
    if (ct) {
      D.climateStations.forEach(function (s) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td><strong>" + s.station + "</strong></td>" +
          "<td data-v-elev='" + s.elevation + "'>" + s.elevation + "</td>" +
          "<td data-v-rain='" + (s.rainMm || 0) + "'>" + (s.rainMm ? fmt(s.rainMm) + " mm" : "—") + "</td>" +
          "<td data-v-max='" + s.maxC + "'>" + s.maxC.toFixed(1) + " °C</td>" +
          "<td data-v-min='" + s.minC + "'>" + s.minC.toFixed(1) + " °C</td>" +
          "<td>" + s.note + "</td>";
        ct.appendChild(tr);
      });
    }
    var facts = document.getElementById("climate-facts");
    if (facts) {
      D.climateFacts.forEach(function (f) {
        var li = el("li", "");
        li.innerHTML = "<strong>" + f.value + "</strong> — " + f.label +
          " <span class='muted'>(" + f.source + ")</span>";
        facts.appendChild(li);
      });
    }
  }

  function buildData() {
    var list = document.getElementById("source-list");
    if (list) {
      D.sources.forEach(function (s) {
        var li = el("li", "");
        li.innerHTML = "<strong>" + s.org + "</strong> <span class='muted'>(" + s.year + ")</span><br>" + s.what;
        list.appendChild(li);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    markNav();
    renderKpis();
    document.querySelectorAll("table.sortable").forEach(makeSortable);
    document.querySelectorAll("input[data-filter-for]").forEach(wireFilter);
    wireTabs();
    var page = document.body.getAttribute("data-page") || "home";
    if (page === "home") { buildHome(); }
    if (page === "population") { buildPopulation(); }
    if (page === "economy") { buildEconomy(); }
    if (page === "regions") { buildRegions(); }
    if (page === "data") { buildData(); }
  });
})();
