/* Kenya in Numbers — all figures with source + year.
   Every number below was checked against a published source in
   November 2026. No figure is invented. See data.html for the
   full source list and methodology. */
(function () {
  "use strict";

  var KENYA = {
    meta: {
      country: "Kenya",
      capital: "Nairobi",
      counties: 47,
      currency: "Kenyan shilling (KSh)",
      updated: "26 November 2026",
      note: "Figures are the latest published value available at the time of writing. Census counts are exact; later years are estimates or projections."
    },

    kpis: [
      { label: "Population", value: "56.43 million", detail: "2024 · World Bank", id: "pop" },
      { label: "GDP", value: "$120.34 billion", detail: "2024 · World Bank", id: "gdp" },
      { label: "GDP per person", value: "$2,132", detail: "2024 · World Bank", id: "gdppc" },
      { label: "Real GDP growth", value: "4.7%", detail: "2024 · KNBS Economic Survey 2025", id: "growth" },
      { label: "Life expectancy", value: "63.8 years", detail: "2024 · World Bank", id: "life" },
      { label: "Urban population", value: "31.9%", detail: "2024 · World Bank", id: "urban" },
      { label: "Mobile money moved", value: "KSh 8.7 trillion", detail: "2024 · Central Bank of Kenya", id: "mm" },
      { label: "Made tea produced", value: "598,500 tonnes", detail: "2024 · KNBS Economic Survey 2025", id: "tea" }
    ],

    /* Population: census counts (KNBS) + World Bank estimates. */
    populationTrend: [
      { year: 2009, value: 38610097, kind: "Census (KNBS)" },
      { year: 2019, value: 47564296, kind: "Census (KNBS)" },
      { year: 2023, value: 55339003, kind: "World Bank estimate" },
      { year: 2024, value: 56432944, kind: "World Bank estimate" }
    ],
    populationFacts: [
      { label: "Census total, 2019", value: "47,564,296", source: "KNBS, 2019 Kenya Population and Housing Census" },
      { label: "Annual growth, 2024", value: "2.0%", source: "World Bank, World Development Indicators 2024" },
      { label: "Aged 0–14", value: "36.8% of population", source: "World Bank, 2024" },
      { label: "Aged 65+", value: "3.0% of population", source: "World Bank, 2024" },
      { label: "Median age", value: "20.8 years", source: "UN World Population Prospects via World Bank, 2024" },
      { label: "Female share, 2019 census", value: "50.5%", source: "KNBS, 2019 census" },
      { label: "Households, 2019 census", value: "12,143,913", source: "KNBS, 2019 census" },
      { label: "Life expectancy, women / men", value: "66.1 / 61.6 years", source: "World Bank, 2024" }
    ],

    /* Top 12 counties by 2019 census population (KNBS). Density shown
       only where the census volume publishes it. */
    counties: [
      { rank: 1, name: "Nairobi", pop: 4397073, density: 6247, capital: "Nairobi", zone: "Capital highlands", lead: "Services & trade" },
      { rank: 2, name: "Kiambu", pop: 2417735, density: 952, capital: "Kiambu", zone: "Central highlands", lead: "Tea, coffee & dairy" },
      { rank: 3, name: "Nakuru", pop: 2162202, density: 288, capital: "Nakuru", zone: "Rift Valley", lead: "Maize & wheat" },
      { rank: 4, name: "Kakamega", pop: 1867579, density: null, capital: "Kakamega", zone: "Western highlands", lead: "Sugarcane & maize" },
      { rank: 5, name: "Bungoma", pop: 1670570, density: null, capital: "Bungoma", zone: "Western highlands", lead: "Sugarcane & maize" },
      { rank: 6, name: "Meru", pop: 1545714, density: null, capital: "Meru", zone: "Eastern highlands", lead: "Coffee & tea" },
      { rank: 7, name: "Kilifi", pop: 1453787, density: null, capital: "Kilifi", zone: "Coast", lead: "Cashew, coconut & fishing" },
      { rank: 8, name: "Machakos", pop: 1421932, density: null, capital: "Machakos", zone: "Eastern plateau", lead: "Maize & horticulture" },
      { rank: 9, name: "Kisii", pop: 1266860, density: null, capital: "Kisii", zone: "Western highlands", lead: "Tea & bananas" },
      { rank: 10, name: "Mombasa", pop: 1208333, density: 5495, capital: "Mombasa", zone: "Coast", lead: "Port, trade & tourism" },
      { rank: 11, name: "Uasin Gishu", pop: 1163186, density: null, capital: "Eldoret", zone: "Rift Valley", lead: "Maize & wheat" },
      { rank: 12, name: "Kitui", pop: 1136187, density: null, capital: "Kitui", zone: "Eastern plateau", lead: "Livestock & sorghum" }
    ],

    /* Real GDP growth, KNBS Economic Survey cycle. */
    gdpGrowth: [
      { year: 2021, value: 7.6 },
      { year: 2022, value: 4.9 },
      { year: 2023, value: 5.7 },
      { year: 2024, value: 4.7 }
    ],
    gdpLevels: [
      { label: "GDP, current US$", value: "$120.34 billion", year: "2024", source: "World Bank" },
      { label: "GDP per capita, current US$", value: "$2,132.40", year: "2024", source: "World Bank" },
      { label: "GDP, current prices", value: "KSh 16.22 trillion", year: "2024", source: "KNBS Economic Survey 2025" },
      { label: "Inflation (consumer prices)", value: "4.5%", year: "2024", source: "World Bank" },
      { label: "Agriculture share of GDP", value: "22.5%", year: "2024", source: "KNBS Economic Survey 2025" },
      { label: "Services share of GDP", value: "55.3%", year: "2024", source: "KNBS Economic Survey 2025" },
      { label: "Industry share of GDP", value: "16.5%", year: "2024", source: "KNBS Economic Survey 2025" }
    ],
    sectorShares: [
      { label: "Services", value: 55.3 },
      { label: "Agriculture, forestry & fishing", value: 22.5 },
      { label: "Industry", value: 16.5 },
      { label: "Other", value: 5.8 }
    ],

    /* Crop production, KNBS Economic Survey 2025 (2023 vs 2024). */
    crops: [
      { crop: "Tea (made tea)", unit: "000 tonnes", y2023: 570.3, y2024: 598.5, change: "+4.9%" },
      { crop: "Coffee", unit: "000 tonnes", y2023: 48.7, y2024: 49.5, change: "+1.6%" },
      { crop: "Maize", unit: "million bags", y2023: 47.6, y2024: 44.7, change: "−6.1%" },
      { crop: "Sugarcane", unit: "000 tonnes", y2023: 5550.7, y2024: 9365.3, change: "+68.7%" },
      { crop: "Rice", unit: "000 tonnes", y2023: 229.1, y2024: 282.2, change: "+23.2%" },
      { crop: "Wheat", unit: "000 tonnes", y2023: 309.5, y2024: 312.2, change: "+0.9%" }
    ],
    teaTrade: [
      { label: "Tea exports, 2024", value: "594,500 tonnes", source: "Tea Board of Kenya" },
      { label: "Tea export earnings, 2024", value: "KSh 181.69 billion (≈ $1.4bn)", source: "Tea Board of Kenya" },
      { label: "Coffee export earnings, 2023/24", value: "KSh 37.7 billion", source: "Agriculture and Food Authority, Coffee Yearbook 2023/24" },
      { label: "Agriculture GDP, 2024", value: "KSh 3.6 trillion", source: "KNBS Economic Survey 2025" }
    ],

    /* Mobile money: Central Bank of Kenya (agent transactions) +
       Safaricom FY2025 results (M-Pesa platform totals). */
    mobileMoney: [
      { year: 2023, value: 7.95, note: "KSh trillion, CBK" },
      { year: 2024, value: 8.70, note: "KSh trillion, CBK (+9.4%)" }
    ],
    mobileFacts: [
      { label: "Value moved via agents, 2024", value: "KSh 8.7 trillion", source: "Central Bank of Kenya, 2024" },
      { label: "Value moved via agents, 2023", value: "KSh 7.95 trillion", source: "Central Bank of Kenya, 2023" },
      { label: "Registered mobile money accounts", value: "82.43 million", source: "Communications Authority / CBK, end-2024" },
      { label: "Adults using mobile money", value: "82.3%", source: "Central Bank of Kenya, 2024" },
      { label: "M-Pesa market share", value: "92.3%", source: "CBK / Communications Authority, Sep 2024" },
      { label: "M-Pesa one-month active customers", value: "35.82 million", source: "Safaricom FY2025 results (year to Mar 2025)" },
      { label: "M-Pesa transaction value, FY2025", value: "KSh 38.29 trillion", source: "Safaricom FY2025 results" },
      { label: "M-Pesa transactions, FY2025", value: "37.15 billion", source: "Safaricom FY2025 results" },
      { label: "M-Pesa revenue, FY2025", value: "KSh 161.1 billion", source: "Safaricom FY2025 results" }
    ],

    /* Climate: long-term station means (University of Nairobi
       climatology repository; KMD normals via WMO). */
    climateStations: [
      { station: "Nairobi", elevation: "1,798 m", rainMm: 879, maxC: 23.6, minC: 11.6, note: "Highland capital; long rains Mar–May, short rains Oct–Dec" },
      { station: "Mombasa", elevation: "16 m", rainMm: 1204, maxC: 30.1, minC: 23.4, note: "Tropical coast; wettest in May" },
      { station: "Kisumu", elevation: "1,146 m", rainMm: null, maxC: 29.4, minC: 17.1, note: "Lake Victoria basin; warm and humid" },
      { station: "Nakuru", elevation: "1,836 m", rainMm: null, maxC: 26.4, minC: 10.1, note: "Rift Valley floor; mild days, cool nights" },
      { station: "Lodwar", elevation: "506 m", rainMm: null, maxC: 34.9, minC: 23.7, note: "Hot, arid north-west; maxima often above 35 °C" },
      { station: "Lamu", elevation: "30 m", rainMm: null, maxC: 29.2, minC: 24.1, note: "Northern coast; warm year-round" }
    ],
    climateFacts: [
      { label: "National rainfall range", value: "250–2,500 mm a year", source: "University of Nairobi climatology (KMD station data)" },
      { label: "Nairobi mean annual rainfall", value: "879 mm", source: "KMD station means" },
      { label: "Mombasa mean annual rainfall", value: "1,204 mm", source: "KMD station means" },
      { label: "Temperature range nationwide", value: "Below 10 °C to above 40 °C", source: "KMD station means" },
      { label: "Nairobi, May (KMD/WMO normal)", value: "High 22.6 °C · low 13.2 °C · 176.6 mm rain", source: "Kenya Meteorological Department via WMO" }
    ],

    sources: [
      { org: "World Bank — World Development Indicators", what: "Population 2024 (56,432,944); GDP 2024 ($120.34bn); GDP per capita ($2,132.40); life expectancy 63.8 years; urban share 31.9%; inflation 4.5%; population growth 2.0%; age structure.", year: "2024" },
      { org: "Kenya National Bureau of Statistics (KNBS) — 2019 Kenya Population and Housing Census, Vol. I", what: "Census total 47,564,296; county populations and densities; 12,143,913 households; female share 50.5%.", year: "2019" },
      { org: "KNBS — Economic Survey 2025 (Popular Version)", what: "Real GDP growth 4.7% (2024); GDP KSh 16.22 trillion; sector shares (services 55.3%, agriculture 22.5%, industry 16.5%); crop production 2023–2024 (tea, coffee, maize, sugarcane, rice, wheat); agriculture GDP KSh 3.6 trillion.", year: "2025 (data 2024)" },
      { org: "Tea Board of Kenya", what: "Tea exports 2024: 594,500 tonnes earning KSh 181.69 billion (≈ $1.4bn).", year: "2024" },
      { org: "Agriculture and Food Authority — Coffee Yearbook 2023/24", what: "Coffee export earnings KSh 37.7 billion in 2023/24; national coffee production 49,501 tonnes.", year: "2024" },
      { org: "Central Bank of Kenya", what: "Mobile money value via agents: KSh 8.7 trillion in 2024 (KSh 7.95 trillion in 2023); 82.3% of adults use mobile money; registered accounts 82.43 million at end-2024.", year: "2024" },
      { org: "Safaricom — FY2025 results (year to 31 March 2025)", what: "M-Pesa: 35.82 million one-month active customers; KSh 38.29 trillion transacted; 37.15 billion transactions; KSh 161.1 billion revenue; 92.3% market share (Sep 2024).", year: "2025" },
      { org: "Kenya Meteorological Department (via WMO) & University of Nairobi climatology", what: "Station means: Nairobi 879 mm rain, 23.6/11.6 °C; Mombasa 1,204 mm, 30.1/23.4 °C; national rainfall range 250–2,500 mm; Nairobi May normal 22.6/13.2 °C, 176.6 mm.", year: "Long-term means" },
      { org: "UN World Population Prospects 2024 (via World Bank)", what: "Median age 20.8 years; population 2050 projection 83.6 million (context only).", year: "2024" }
    ]
  };

  window.KENYA_DATA = KENYA;
})();
