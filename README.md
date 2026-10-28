# A Little Moonlight Adventure ♡

A cute, mobile-first romantic mini-adventure built with Next.js App Router, React, TypeScript, Motion (`motion/react`) and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalise it

- Change the three Hinglish messages in `app/page.tsx` inside the `messages` array.
- The default character is an original inline SVG bunny; no third-party cartoon assets are required.
- Replace `public/our-photo.svg` with a photo named `our-photo.jpg`, then change the default photo state to `'/our-photo.jpg'` in `app/page.tsx`.
- Alternatively, use **Add your photo** on the final scene to preview a local image in the current browser session. That local preview is not uploaded or saved for other visitors.
- Update the title and description in `app/layout.tsx`.

## Experience flow

1. Intro screen with the animated bunny.
2. Night-sky map with three sequentially unlockable stars and Hinglish message cards.
3. Tap-to-open glowing heart, photo reveal, then the final “I Love You” message.
4. Optional hidden note and replay control.

Animations respect the user's reduced-motion preference. The project does not require environment variables or a backend.
