#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const BACKUP_PATH = path.join(__dirname, '..', 'package.json.backup');
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

/**
 * Base exports that should always be preserved at the top
 */
const BASE_EXPORTS = ['.', './styles', './package.json'];

/**
 * Backup package.json to package.json.backup
 */
function backupPackageJson() {
  try {
    const packageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
    fs.writeFileSync(BACKUP_PATH, packageJsonContent, 'utf8');
    console.log('✅ Backed up package.json to package.json.backup');
  } catch (error) {
    console.error('❌ Error backing up package.json:', error.message);
    process.exit(1);
  }
}

/**
 * Scan components directory and return list of component names
 */
function scanComponents() {
  try {
    if (!fs.existsSync(COMPONENTS_DIR)) {
      console.warn('⚠️  Components directory not found:', COMPONENTS_DIR);
      return [];
    }

    const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
    const components = [];

    for (const entry of entries) {
      // Only process directories
      if (!entry.isDirectory()) {
        continue;
      }

      const componentName = entry.name;
      const componentIndexPath = path.join(
        COMPONENTS_DIR,
        componentName,
        'index.ts'
      );

      // Verify index.ts exists
      if (fs.existsSync(componentIndexPath)) {
        components.push(componentName);
      } else {
        console.warn(`⚠️  Skipping ${componentName}: index.ts not found`);
      }
    }

    // Sort components alphabetically
    components.sort();
    return components;
  } catch (error) {
    console.error('❌ Error scanning components:', error.message);
    process.exit(1);
  }
}

/**
 * Generate export entry for a component
 */
function generateComponentExport(componentName) {
  return {
    source: `./src/components/${componentName}/index.ts`,
    types: `./lib/typescript/src/components/${componentName}/index.d.ts`,
    default: `./lib/module/components/${componentName}/index.js`,
  };
}

/**
 * Update exports field in package.json
 */
function updateExports() {
  try {
    // Read package.json
    const packageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    // Validate structure
    if (!packageJson.exports) {
      console.error('❌ package.json does not have an exports field');
      process.exit(1);
    }

    // Get existing exports
    const existingExports = packageJson.exports;
    const newExports = {};

    // Preserve base exports first
    for (const baseExport of BASE_EXPORTS) {
      if (existingExports[baseExport]) {
        newExports[baseExport] = existingExports[baseExport];
      }
    }

    // Scan and add component exports
    const components = scanComponents();
    console.log(`📦 Found ${components.length} components`);

    for (const componentName of components) {
      const exportPath = `./${componentName}`;
      newExports[exportPath] = generateComponentExport(componentName);
    }

    // Update package.json exports
    packageJson.exports = newExports;

    // Write updated package.json with proper formatting
    const updatedContent = JSON.stringify(packageJson, null, 2) + '\n';
    fs.writeFileSync(PACKAGE_JSON_PATH, updatedContent, 'utf8');

    console.log(
      `✅ Updated package.json exports with ${components.length} components`
    );
  } catch (error) {
    console.error('❌ Error updating exports:', error.message);
    process.exit(1);
  }
}

/**
 * Restore package.json from backup and delete backup file
 */
function restorePackageJson() {
  try {
    // Check if backup exists
    if (!fs.existsSync(BACKUP_PATH)) {
      console.warn('⚠️  Backup file not found:', BACKUP_PATH);
      return;
    }

    // Read backup
    const backupContent = fs.readFileSync(BACKUP_PATH, 'utf8');

    // Restore package.json
    fs.writeFileSync(PACKAGE_JSON_PATH, backupContent, 'utf8');
    console.log('✅ Restored package.json from backup');

    // Delete backup file
    fs.unlinkSync(BACKUP_PATH);
    console.log('✅ Deleted backup file');
  } catch (error) {
    console.error('❌ Error restoring package.json:', error.message);
    process.exit(1);
  }
}

/**
 * Main function
 */
function main() {
  const command = process.argv[2];

  if (command === 'prepack') {
    console.log('🚀 Running prepack: updating exports...');
    backupPackageJson();
    updateExports();
  } else if (command === 'postpack') {
    console.log('🔄 Running postpack: restoring package.json...');
    restorePackageJson();
  } else {
    console.error('❌ Invalid command. Use "prepack" or "postpack"');
    console.error('Usage: node scripts/update-exports.js [prepack|postpack]');
    process.exit(1);
  }
}

main();
