import { cpSync, copyFileSync, existsSync } from 'node:fs';

// Cloudflare Pages serves `.open-next/assets` as the site root and treats
// `_worker.js` at that root as the Pages Functions entry. Copy the OpenNext
// worker into position and stage the sibling output dirs it resolves from.
copyFileSync('.open-next/worker.js', '.open-next/assets/_worker.js');

const staged = ['cloudflare', 'middleware', 'server-functions', '.build'];
for (const dir of staged) {
    const src = `.open-next/${dir}`;
    if (existsSync(src)) cpSync(src, `.open-next/assets/${dir}`, { recursive: true });
}
