GRAVEYARD SURVIVORS — ANDROID PWA PACKAGE

Files:
- index.html: original game, packaged as the app entry point
- manifest.webmanifest: install/display settings
- service-worker.js: caches the app shell and external assets after first online load
- icons/icon.svg: app icon

IMPORTANT:
A PWA must be hosted on HTTPS (GitHub Pages works) or localhost. Opening index.html directly from a file manager will not enable installation/service workers.

GitHub Pages setup:
1. Extract this ZIP.
2. Create a new GitHub repository.
3. Upload the CONTENTS of this folder (index.html, manifest.webmanifest, service-worker.js, icons folder) to the repository root.
4. In repository Settings → Pages, choose Deploy from a branch, select main and /(root), then Save.
5. Wait for the Pages URL to appear.
6. On Android, open that HTTPS URL in Chrome while online and wait a few seconds for the service worker to install and external libraries to cache.
7. In Chrome menu, tap "Add to Home screen" or "Install app".
8. Launch from the new home-screen icon. The manifest requests fullscreen display; Android/browser policy may still show system bars on some devices.
9. For the most immersive view, tap the in-game "Fullscreen" button once after launch. Android can restrict hiding system bars; a web PWA cannot guarantee kiosk-level immersive mode.

OFFLINE NOTES:
- Visit the hosted app once while online before relying on offline use.
- The game uses Tailwind from cdn.tailwindcss.com, Google Fonts, and Firebase module imports. The service worker caches these resources as they are requested during the online visit. Cloud saves require internet; local browser save storage is included for game progress.
- PWA installation and fullscreen APIs are controlled by Android/Chrome and may vary by version.
