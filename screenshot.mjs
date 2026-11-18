import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [url = 'http://localhost:3000', label, width = '800', height = '3200'] = process.argv.slice(2);
const dir = join(process.cwd(), 'temporary screenshots');
mkdirSync(dir, { recursive: true });
const n = readdirSync(dir).filter(f => /^screenshot-\d+/.test(f)).length + 1;
const out = join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);
execFileSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=4000',
  `--window-size=${width},${height}`, `--screenshot=${out}`, url,
], { stdio: 'ignore' });
console.log(out);
