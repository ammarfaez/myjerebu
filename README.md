# Malaysia Haze Tracker (Penjejak Jerebu Malaysia)

A modern web app that tracks the real-time **Air Pollutant Index (API)** / **Indeks Pencemaran Udara (IPU)** for Malaysia's 68 Department of Environment (DOE) monitoring stations.

Bilingual — English 🇬🇧 & Bahasa Malaysia 🇲🇾.

**Live site:** https://myjerebu.netlify.app
**Source:** https://github.com/ammarfaez/myjerebu

## Features

- 📊 **Dashboard** — Live IPU readings, worst/best stations, summary stats & alert banner
- 🗺️ **Interactive Map** — Leaflet map with color-coded station markers
- 📍 **Station Details** — IPU gauge, pollutant breakdown, health advisory
- 🔔 **Alerts** — Visual alerts when stations exceed unhealthy levels
- 📈 **Live Data** — Hourly-updated readings from the WAQI API (powered by Malaysian DOE / JAS)

## Tech Stack

- **React 19 + Vite 8 + TypeScript**
- **Tailwind CSS v4**
- **TanStack Query** (data fetching & caching)
- **React Leaflet** (interactive map)
- **i18next** (EN/BM language switching)
- **React Router v7**

## Getting Started

### 1. Get a WAQI API token (free)

1. Go to https://aqicn.org/data-platform/token/
2. Register for a free token
3. Copy it to your `.env` file:

```bash
# .env
VITE_WAQI_TOKEN=your_token_here
```

> **Note:** The default `demo` token only returns sample data (Shanghai). You need your own token to see real Malaysian IPU readings. For production, do not commit the `.env` file — set it as an environment variable on your host.

### 2. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

### 3. Build for production

```bash
npm run build
npm run preview
```

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo in the [Vercel dashboard](https://vercel.com/new). Add `VITE_WAQI_TOKEN` in **Project → Settings → Environment Variables**.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

Build command: `npm run build`  
Publish directory: `dist`  
Add `VITE_WAQI_TOKEN` under **Site settings → Environment Variables**.

Deployed at: **https://myjerebu.netlify.app**

## Project Structure

```
src/
├── components/
│   ├── alerts/       # Alert banner
│   ├── layout/       # Header, Footer, Language toggle
│   └── ui/           # IPU badge, gauge, station cards, legend
├── hooks/            # React Query data hooks
├── i18n/             # EN / BM translations
├── pages/            # Dashboard, Map, Station, Health
├── services/         # WAQI API client
├── utils/            # IPU logic, station constants
└── types/            # TypeScript types
```

## IPU Scale

| IPU Range | Category | Color |
|-----------|----------|-------|
| 0–50 | Good / Baik | Green |
| 51–100 | Moderate / Sederhana | Yellow |
| 101–200 | Unhealthy / Tidak Sihat | Orange |
| 201–300 | Very Unhealthy / Sangat Tidak Sihat | Red |
| 301+ | Hazardous / Berbahaya | Purple |

## Data Source

Original data is published hourly by the **Malaysian Department of Environment (Jabatan Alam Sekitar)** via the Air Pollutant Index Management System (APIMS) and accessed through the **World Air Quality Index project**.

This project is independent and not affiliated with or endorsed by the DOE.

## Disclaimer

Information is provided for general guidance only. Follow official DOE / Ministry of Health directives during a haze episode.