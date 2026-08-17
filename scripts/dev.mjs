import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { createRequire } from 'node:module';

// Filters warnings we cannot resolve while @opennextjs/cloudflare lacks
// Node-runtime Proxy support (see opennextjs-cloudflare#1213 and AGENTS.md).
// Matches both Next 16.2 wording and Next 16.3+ wording.
const SUPPRESS = [
    /"middleware" file convention is deprecated/,
    /middleware-to-proxy/,
    /To migrate automatically, run:/,
    /npx @next\/codemod.*middleware/,
    /experimental edge runtime/,
    /Edge Runtime is deprecated/,
    /edge-runtime-deprecated/,
];

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, 'dev', ...process.argv.slice(2)], {
    stdio: ['inherit', 'pipe', 'pipe'],
});

// Collapse runs of blank lines to at most one so the multi-line codemod
// suggestion block leaves at most a single blank behind.
const makePipe = (dst) => {
    let queuedBlank = false;
    return (line) => {
        if (SUPPRESS.some((re) => re.test(line))) return;
        if (line.trim() === '') { queuedBlank = true; return; }
        if (queuedBlank) { dst.write('\n'); queuedBlank = false; }
        dst.write(line + '\n');
    };
};

createInterface({ input: child.stdout }).on('line', makePipe(process.stdout));
createInterface({ input: child.stderr }).on('line', makePipe(process.stderr));

for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
    process.on(sig, () => child.kill(sig));
}

child.on('exit', (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    else process.exit(code ?? 0);
});
