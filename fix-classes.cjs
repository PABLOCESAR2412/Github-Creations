const fs = require('fs');
const path = require('path');

const directories = ['src/components', 'src/pages'];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const regexes = [
        [/dark:text-black dark:text-white/g, 'dark:text-white'],
        [/dark:bg-\[#f5f4ef\] dark:bg-black/g, 'dark:bg-black'],
        [/dark:border-black dark:border-white/g, 'dark:border-white'],
        [/dark:border-zinc-300 dark:border-zinc-800/g, 'dark:border-zinc-800'],
        [/dark:text-zinc-600 dark:text-zinc-500/g, 'dark:text-zinc-500'],
        [/dark:text-zinc-600 dark:text-zinc-400/g, 'dark:text-zinc-400'],
        [/dark:border-zinc-300 dark:border-zinc-700/g, 'dark:border-zinc-700'],
        [/dark:bg-zinc-200 dark:bg-zinc-900/g, 'dark:bg-zinc-900'],
        [/dark:bg-white dark:bg-zinc-950/g, 'dark:bg-zinc-950']
      ];

      let modified = false;
      for (const [regex, replacement] of regexes) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed classes in ${fullPath}`);
      }
    }
  }
}

directories.forEach(walkAndReplace);
console.log('Cleanup complete!');
