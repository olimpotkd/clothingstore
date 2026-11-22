# CRWN Clothing

An e-commerce storefront built with React: browse clothing collections, add items to a cart, sign in with email or Google, and check out.

Originally written in 2020 and since modernized end to end: migrated from Create React App to Vite, upgraded to React 18 and React Router 7, and refactored from Redux to React Context and hooks, with fewer dependencies and less code.

## Features

- **Shop by collection**: hats, jackets, sneakers, womens and mens, loaded from a database
- **Cart**: add, remove and change quantities; the cart is saved in the browser so it survives a page reload
- **Accounts**: sign up and sign in with email/password or Google
- **Checkout**: order summary with a running total

## Tech stack

| Area | Tools |
|---|---|
| UI | React 18, styled-components, Sass |
| Routing | React Router 7 |
| State | React Context + `useReducer` (no Redux) |
| Backend | Firebase Authentication and Cloud Firestore |
| Payments | Stripe (legacy Checkout, see [Known limitations](#known-limitations)) |
| Tooling | Vite, Vitest, React Testing Library |

## Engineering highlights

- **Build tooling migration.** Moved off the deprecated Create React App to Vite and Vitest, replacing the unmaintained `node-sass` with Dart Sass. Resolved CommonJS/ESM interop issues in older packages that only surfaced at runtime, not at build time.
- **Right-sized state management.** The app's real global state is just the signed-in user and the cart, so Redux (plus thunk, persist, logger and reselect) was replaced with two focused contexts and a data-fetching hook. Runtime dependencies went from 12 to 7.
- **Incremental, verifiable upgrades.** Each upgrade (Vite, React 18, React Router 7, Context) landed as its own branch and merge, verified with tests, a production build and a click-through of every route.
- **Robustness fixes along the way.** Unknown collection URLs show a "not found" state instead of crashing, and the auth listener guards against a sign-out race while the user profile is loading.
- **Tested logic.** Cart helpers and the cart context (derived totals, persistence and restore, provider guard) are covered by unit tests.

## Getting started

Requires **Node.js 20.19+ or 22.12+**.

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
|---|---|
| `npm start` / `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production into `build/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the tests in watch mode (`npx vitest run` for a single run) |

## Project structure

```
src/
├── components/   Reusable UI components (header, cart dropdown, collection items, …)
├── pages/        Route-level pages (home, shop, collection, checkout, sign in)
├── contexts/     UserContext (auth state) and CartContext (cart state + persistence)
├── hooks/        useCollections – fetches the shop catalog
├── data/         Static data, such as the home page sections
├── utils/        Pure cart helpers, unit tested
├── firebase/     Firebase setup and helpers
└── asset/        SVG icons
```

### How state is organized

- **`UserContext`** listens to Firebase Auth and exposes the signed-in user's profile.
- **`CartContext`** holds the cart in a reducer, derives the item count and total, and persists items to `localStorage`.
- **`useCollections`** fetches the catalog once when the shop opens; the shop page passes it down to the overview and collection pages.

## Firebase setup

The app is wired to an existing Firebase project (config in `src/firebase/firebase.utils.js`). To run it against your own:

1. Create a Firebase project and enable **Authentication** (Email/Password and Google providers) and **Cloud Firestore**.
2. Replace the `config` object in `src/firebase/firebase.utils.js` with your project's web config.
3. Add a Firestore collection named `collections` with one document per category, each shaped like:
   ```json
   { "title": "Hats", "items": [{ "id": 1, "name": "Brown Brim", "price": 25, "imageUrl": "https://…" }] }
   ```

## Known limitations

- **Stripe payments don't complete.** The checkout button uses Stripe's legacy Checkout, which Stripe has retired. It will be replaced with Stripe Checkout Sessions backed by a small serverless function.
- **The Contact link has no page yet.**

## Roadmap

- [x] Migrate from Create React App to Vite
- [x] Upgrade to React 18
- [x] Upgrade to React Router 7
- [x] Replace Redux with React Context and hooks
- [ ] Move the backend from Firebase to AWS (Cognito, DynamoDB, Lambda, API Gateway), defined with AWS CDK
- [ ] Replace legacy Stripe Checkout with Checkout Sessions on Lambda
- [ ] Upgrade to React 19
- [ ] Convert the remaining class components (sign in, sign up) to hooks
