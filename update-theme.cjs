const fs = require('fs');
const path = require('path');

function replaceClasses(content) {
  return content
    .replace(/\bbg-black\b/g, 'bg-[#f5f4ef] dark:bg-black')
    .replace(/\bbg-zinc-950\b/g, 'bg-white dark:bg-zinc-950')
    .replace(/\bborder-zinc-800\b/g, 'border-zinc-300 dark:border-zinc-800')
    .replace(/\btext-white\b/g, 'text-black dark:text-white')
    .replace(/\btext-zinc-500\b/g, 'text-zinc-600 dark:text-zinc-500')
    .replace(/\btext-zinc-400\b/g, 'text-zinc-600 dark:text-zinc-400')
    .replace(/\bbg-zinc-900\b/g, 'bg-zinc-200 dark:bg-zinc-900')
    .replace(/\bborder-zinc-700\b/g, 'border-zinc-300 dark:border-zinc-700')
    .replace(/\btext-zinc-300\b/g, 'text-zinc-700 dark:text-zinc-300')
    .replace(/\bborder-white\b/g, 'border-black dark:border-white');
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const newContent = replaceClasses(content);
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated', fullPath);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src/components'));
processDirectory(path.join(__dirname, 'src/pages'));
processDirectory(path.join(__dirname, 'src')); // For App.tsx

console.log('Done mapping classes!');
