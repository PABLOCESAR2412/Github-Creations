const fs = require('fs');
const path = require('path');

const directories = ['src/components', 'src/pages', 'src'];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Complex replacements for buttons/blocks with hover states
      const complexReplacements = [
        ['bg-[#00ffff] dark:bg-white hover:bg-white text-black', 'bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black'],
        ['bg-[#00ffff] dark:bg-white text-black border border-[#00ffff] dark:border-white', 'bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white'],
        ['bg-[#00ffff] dark:bg-white border-[#00ffff] dark:border-white text-black', 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'],
        ['bg-[#00ffff] dark:bg-white text-black', 'bg-black dark:bg-white text-white dark:text-black'],
        ['selection:bg-[#00ffff] selection:text-black', 'selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black']
      ];

      for (const [search, replace] of complexReplacements) {
        if (content.includes(search)) {
          content = content.split(search).join(replace);
          modified = true;
        }
      }

      // Simple replacements for the rest
      const simpleReplacements = [
        ['text-[#00ffff]', 'text-black'],
        ['border-[#00ffff]', 'border-black'],
        ['hover:text-[#00ffff]', 'hover:text-black'],
        ['hover:border-[#00ffff]', 'hover:border-black'],
        ['focus:border-[#00ffff]', 'focus:border-black'],
        ['focus:ring-[#00ffff]', 'focus:ring-black'],
        ['accent-[#00ffff]', 'accent-black']
      ];

      for (const [search, replace] of simpleReplacements) {
        if (content.includes(search)) {
          content = content.split(search).join(replace);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Replaced colors in ${fullPath}`);
      }
    }
  }
}

walkAndReplace('src');
console.log('Color replacement complete!');
