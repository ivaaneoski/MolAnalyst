const { execSync } = require('child_process');
const fs = require('fs');

try {
  const out = execSync('npx vite build', { encoding: 'utf-8' });
  fs.writeFileSync('build_log.txt', out);
} catch (e) {
  let log = 'Stdout:\n' + e.stdout + '\n\nStderr:\n' + e.stderr;
  fs.writeFileSync('build_log.txt', log);
}
