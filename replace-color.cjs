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
      
      const replacements = [
        [/(?<!:)bg-\[\#00ffff\]/g, 'bg-[#00ffff] dark:bg-white'],
        [/(?<!:)text-\[\#00ffff\]/g, 'text-[#00ffff] dark:text-white'],
        [/(?<!:)border-\[\#00ffff\]/g, 'border-[#00ffff] dark:border-white'],
        [/hover:bg-\[\#00ffff\]/g, 'hover:bg-[#00ffff] dark:hover:bg-white'],
        [/hover:text-\[\#00ffff\]/g, 'hover:text-[#00ffff] dark:hover:text-white'],
        [/hover:border-\[\#00ffff\]/g, 'hover:border-[#00ffff] dark:hover:border-white'],
        [/focus:border-\[\#00ffff\]/g, 'focus:border-[#00ffff] dark:focus:border-white'],
        [/focus:ring-\[\#00ffff\]/g, 'focus:ring-[#00ffff] dark:focus:ring-white'],
        [/accent-\[\#00ffff\]/g, 'accent-[#00ffff] dark:accent-white']
      ];

      let modified = false;
      let newContent = content;
      
      for (const [regex, replace] of replacements) {
        if (regex.test(newContent)) {
          newContent = newContent.replace(regex, replace);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Replaced colors in ${fullPath}`);
      }
    }
  }
}

walkAndReplace('src');

// Fix index.css as well
let indexCss = fs.readFileSync('src/index.css', 'utf8');
if (!indexCss.includes('.dark {\\n    --electric: #ffffff;')) {
  indexCss = indexCss.replace('--electric: #00ffff;\\n  }', '--electric: #00ffff;\\n  }\\n  .dark {\\n    --electric: #ffffff;\\n  }');
  // Also fix the brutal-shadow and brutal-border for dark mode
  if (!indexCss.includes('.dark .brutal-border:hover')) {
    indexCss = indexCss.replace(
      '.brutal-border:hover {\\n  border-color: var(--electric);\\n}',
      '.brutal-border:hover {\\n  border-color: var(--electric);\\n}\\n.dark .brutal-border:hover {\\n  border-color: #ffffff;\\n}'
    );
  }
  if (!indexCss.includes('.dark .brutal-shadow')) {
    indexCss = indexCss.replace(
      '.brutal-shadow:hover {\\n  box-shadow: 4px 4px 0px 0px rgba(0, 255, 255, 0.8);\\n}',
      '.brutal-shadow:hover {\\n  box-shadow: 4px 4px 0px 0px rgba(0, 255, 255, 0.8);\\n}\\n.dark .brutal-shadow {\\n  box-shadow: 4px 4px 0px 0px rgba(255, 255, 255, 0.2);\\n}\\n.dark .brutal-shadow:hover {\\n  box-shadow: 4px 4px 0px 0px rgba(255, 255, 255, 0.8);\\n}'
    );
  }
  fs.writeFileSync('src/index.css', indexCss, 'utf8');
}

console.log('Color replacement complete!');
