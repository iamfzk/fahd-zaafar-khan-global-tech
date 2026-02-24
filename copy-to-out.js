const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const copy = (src, dest) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(f => copy(path.join(src, f), path.join(dest, f)));
  } else {
    fs.copyFileSync(src, dest);
  }
};

const skip = new Set(['node_modules', '.git', 'out', 'copy-to-out.js', 'package.json', 'package-lock.json', 'vercel.json', 'netlify.toml', 'DEPLOY.md', '.github', '.vscode', '.cursor']);
fs.readdirSync(__dirname).forEach(f => {
  if (skip.has(f)) return;
  copy(path.join(__dirname, f), path.join(outDir, f));
});

console.log('Build done: files in out/');
