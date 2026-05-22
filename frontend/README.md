# L'Essence Frontend

A Vite + React + Tailwind frontend for the L'Essence fragrance marketplace. It connects to the REST API at `http://localhost:4000` by default.

## Requirements

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Environment

Create a `.env` file to override the API base URL:

```
VITE_API_URL=http://localhost:4000
```

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` serves the build locally
