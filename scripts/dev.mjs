import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { createRequire } from 'node:module';

// Filters two Next.js warnings that we cannot resolve while @opennextjs/cloudflare
// lacks Node-runtime Proxy support (see opennextjs-cloudflare#1213 and AGENTS.md).
const SUPPRESS = [
    /"middleware" file convention is deprecated/,
    /experimental edge runtime/,
];

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, 'dev', ...process.argv.slice(2)], {
    stdio: ['inherit', 'pipe', 'pipe'],
});

const pipe = (src, dst) => {
    createInterface({ input: src }).on('line', (line) => {
        if (SUPPRESS.some((re) => re.test(line))) return;
        dst.write(line + '\n');
    });
};

pipe(child.stdout, process.stdout);
pipe(child.stderr, process.stderr);

for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
    process.on(sig, () => child.kill(sig));
}

child.on('exit', (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    else process.exit(code ?? 0);
});
