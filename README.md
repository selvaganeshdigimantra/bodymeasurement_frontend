<<<<<<< HEAD
# bodymeasurement
=======
# Mobile PWA Clone (React + Vite + MUI + Tailwind + MUI Icons)

Mobile-first PWA scaffold with common UI/flow (splash → login → home with bottom nav, list/detail, search sheet, create/edit, notifications, profile). Uses mock data.

## Run
```bash
npm install
npm run dev
```

## Build PWA
```bash
npm run build
npm run preview
```

Install to Home Screen from mobile browser menu (supports Android Chrome, iOS Safari to "Add to Home Screen").

## Tech
- React 18 + Vite
- MUI v5 + TailwindCSS utilities
- @mui/icons-material
- vite-plugin-pwa (Workbox auto caching)
- React Router v6

## Notes
- Tailwind and MUI coexist: Tailwind for layout/spacing, MUI for components.
- The UI targets mobile width and centers to `max-w-sm` (like a phone). Remove the wrapper if you want full width.
- Replace the mock data in `src/data/mock.js` with real APIs.
- Update icons in `public/` with your own PNGs.
- To mirror your MP4 exactly, map each screen in `/src/screens` to your video sections and tweak components/styles.
>>>>>>> 75d7067 (Setup Firebase Hosting and GitHub workflow)
