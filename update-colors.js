const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// 1. Replace graphite with neutral in all files
walkDir('src', function (filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/graphite/g, 'neutral');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});

// 2. Update SVGs
walkDir('public', function (filePath) {
  if (filePath.endsWith('.svg')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace old Teal (#0F766E) with new Emerald (#059669) or pure white
    // For a YC startup look, let's make the logo pure white/black with an Emerald dot
    let newContent = content.replace(/#0F766E/g, 'currentColor');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
