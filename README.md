# CRM Client

## Start

1. Copy `.env.example` to `.env` and set the API address.
2. Run `npm install`.
3. Run `npm run dev`.

## Feature contract

Each feature owns `api`, `components`, `hooks`, `pages`, `validations`, `constants`, and (when needed) its Redux slice. Keep feature exports explicit through an `index.js` when shared externally. Cross-feature code belongs in `components`, `api`, `hooks`, or `utils`, never duplicated in a feature.

## Architecture decisions

- **MUI + Tailwind:** MUI handles accessible controls, theming, grids and drawers; Tailwind is limited to fast, responsive layout composition. Do not style the same property in both systems.
- **State:** use Redux Toolkit only for app-wide/server-cache-worthy state (session, permissions, filters shared across screens). Keep form and transient UI state local.
- **Tables:** each table owns a feature slice holding `items`, `status`, `error`, and `pagination`. Reuse `components/table/ServerTablePagination.jsx`; all APIs receive 1-based `page` and `limit` values, and must return `data` plus pagination `meta`.
- **Security:** the sample sign-in is deliberately a development stub. Replace it with an HTTP-only, secure, SameSite cookie session from your Express API. Never persist access tokens in localStorage. Enforce permissions in the backend and use the client guard only for user experience.
- **Performance:** pages are route-lazy-loaded, feature code is isolated, and tables should use server pagination/filtering. Add React Query/RTK Query once API endpoints are available to deduplicate requests and cache responses.
