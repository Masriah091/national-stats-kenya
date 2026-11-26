# national-stats-kenya

[![Best National Statistics Site](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Masriah091/national-stats-kenya/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Masriah091/national-stats-kenya/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

**Kenya in Numbers** — a national statistics portal for Kenya: people, economy,
agriculture, mobile money, counties and climate. Every figure names the institution
that published it and the year it describes. Nothing is invented.

## What is inside

- **Home** (`app/index.html`) — 8 key indicators, population trend chart, GDP sector mix.
- **Population** (`app/population.html`) — census counts and World Bank estimates,
  age structure, and the 12 largest counties in a sortable table.
- **Economy** (`app/economy.html`) — GDP and growth, crop production 2023 vs 2024,
  and the M-Pesa / mobile-money story, in switchable tabs.
- **Counties & Climate** (`app/regions.html`) — county table with live search and
  sorting, plus long-term climate station data for Nairobi, Mombasa and more.
- **Data & Sources** (`app/data.html`) — every source, with year and methodology.

Headline figures (all sourced, see `app/data.html` for the full list):

| Figure | Value | Source |
| --- | --- | --- |
| Population | 56,432,944 | World Bank, 2024 |
| GDP | $120.34 billion | World Bank, 2024 |
| Real GDP growth | 4.7% | KNBS Economic Survey 2025 |
| Life expectancy | 63.8 years | World Bank, 2024 |
| Mobile money moved | KSh 8.7 trillion | Central Bank of Kenya, 2024 |
| Made tea produced | 598,500 tonnes | KNBS Economic Survey 2025 |
| Nairobi (2019 census) | 4,397,073 people | KNBS 2019 census |

## How to run it

Static files only — no build step, no network, no external fonts.

```sh
# Serve the site locally and open http://localhost:8000/
python3 -m http.server 8000 --directory app
```

Or open `app/index.html` directly in a browser.

## How to hand it in

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-stats-maseiah990-a node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
into the output directory and writes `dossier.json` with the kit's
`buildDossier` helper. Run it twice into two different directories — every
output byte must be identical.

## Design

Original design, system fonts only, no copied branding: a dense green/amber
"dashboard" front page (the duel-test winner over an editorial variant, which
kept its hero chart below the fold). All charts are hand-drawn SVG rendered in
the browser from the figures in `app/data.js`; every control — sortable tables,
county search, economy tabs — works offline.

## License

MIT — see [LICENSE](LICENSE).
