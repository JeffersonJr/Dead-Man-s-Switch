const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

let version = packageJson.version;
let parts = version.split('.');

// Increment patch version
let patch = parseInt(parts[2], 10);
parts[2] = patch + 1;

packageJson.version = parts.join('.');

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

try {
  execSync('git add package.json');
  console.log(`Version bumped to v${packageJson.version}`);
} catch (error) {
  console.error('Failed to add package.json to git index');
  process.exit(1);
}
