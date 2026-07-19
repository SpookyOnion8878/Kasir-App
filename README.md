# Kasir App

A modern, lightweight **point-of-sale (POS)** demo built with **Vite + React 18 + TypeScript** and **React-Bootstrap**. It uses [json-server](https://github.com/typicode/json-server) as a mock REST backend so the whole app runs locally with zero external services.

> Modernized from the original Create React App (CRA) + Bootstrap demo. The codebase was fully rewritten in TypeScript with function components, a typed cart context, and an English UI/codebase.

## ✨ Features

- Browse products grouped by category (Food / Drink / Snack).
- Add products to a cart; quantities can be **increased, decreased, or removed**.
- Live order summary with a grand total formatted in Indonesian Rupiah (IDR).
- Checkout flow that posts the order and shows a success screen.
- Responsive layout powered by React-Bootstrap.
- Type-safe API client, cart context, and shared types.
- Linting (ESLint flat config), formatting (Prettier), and unit tests (Vitest).
- GitHub Actions CI (lint → type-check → test → build) on Node 20 & 22.

## 🧱 Tech Stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Build tool     | Vite 6                                  |
| UI library     | React 18 + React-Bootstrap 2            |
| Language       | TypeScript 5                            |
| Routing        | React Router 6                          |
| HTTP client    | Axios                                   |
| Mock backend   | json-server                             |
| Alerts         | SweetAlert2                             |
| Tests          | Vitest + Testing Library                |
| Lint / Format  | ESLint 9 (flat) + Prettier 3            |

## 📁 Project Structure

```
kasir-app/
├── .github/workflows/ci.yml   # CI pipeline
├── data/db.json               # mock database (json-server)
├── public/assets/images/      # product & success images
├── src/
│   ├── api/                   # axios client + POS endpoints
│   ├── components/            # presentational components
│   ├── context/               # CartContext (state management)
│   ├── pages/                 # route pages
│   ├── types/                 # shared TypeScript types
│   ├── utils/                 # formatting + helpers
│   ├── test/                  # test setup & specs
│   ├── App.tsx                # router + providers
│   ├── main.tsx               # entry point
│   └── index.css              # global styles
├── .env.example               # environment template
├── eslint.config.js
├── vite.config.ts
└── tsconfig*.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- npm 10+

### Install

```bash
npm install
```

### Run the mock backend

```bash
npm run server
# json-server serves data/db.json at http://localhost:3004
```

### Run the app (dev)

In a second terminal:

```bash
npm run dev
# Vite dev server proxies /api -> http://localhost:3004
# open http://localhost:3000
```

> The Vite dev server proxies `/api/*` to the json-server target declared in
> `VITE_API_TARGET` (see `.env`), so the browser only talks to same-origin URLs.

### Build for production

```bash
npm run build      # tsc type-check + vite build -> dist/
npm run preview    # preview the production build
```

## 🧪 Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start Vite dev server                    |
| `npm run build`      | Type-check and build for production      |
| `npm run preview`    | Preview the production build             |
| `npm run lint`       | Lint with ESLint                         |
| `npm run format`     | Format source with Prettier             |
| `npm run test`       | Run unit tests with Vitest               |
| `npm run type-check` | Run `tsc --noEmit`                       |
| `npm run server`     | Start json-server mock backend           |

## 🔐 Environment Variables

Copy `.env.example` to `.env` and adjust if needed:

| Variable          | Default               | Description                              |
| ----------------- | --------------------- | ---------------------------------------- |
| `VITE_API_TARGET` | `http://localhost:3004` | Base URL of the json-server mock backend |
| `API_PORT`        | `3004`                | Port used by `npm run server`            |

## 📝 Notes

- All UI text, code identifiers, comments, and docs are in **English**.
- Product images live under `public/assets/images/<category>/`.
- This is a demo; there is no real authentication, payments, or persistence
  beyond the local `data/db.json` file used by json-server.
