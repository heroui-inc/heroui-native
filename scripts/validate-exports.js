#!/usr/bin/env node

/**
 * Script to validate that package.json exports are up-to-date
 * Compares current exports with what should be generated
 * Exits with error code if exports are out of sync
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

/**
 * Get all component directories
 * @returns {string[]} Array of component directory names
 */
function getComponents() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    return [];
  }

  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/**
 * Generate expected export entry for a component
 * @param {string} componentName - Name of the component directory
 * @returns {object} Export entry object
 */
function generateExportEntry(componentName) {
  return {
    source: `./src/components/${componentName}/index.ts`,
    types: `./lib/typescript/src/components/${componentName}/index.d.ts`,
    default: `./lib/module/components/${componentName}/index.js`,
  };
}

/**
 * Get expected exports object
 * @returns {object} Expected exports configuration
 */
function getExpectedExports() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  const existingExports = packageJson.exports || {};

  // Preserve special exports
  const specialExports = {
    '.': existingExports['.'],
    './styles': existingExports['./styles'],
    './package.json': existingExports['./package.json'],
  };

  // Generate component exports
  const components = getComponents();
  const componentExports = {};
  for (const component of components) {
    const exportPath = `./${component}`;
    componentExports[exportPath] = generateExportEntry(component);
  }

  return {
    ...specialExports,
    ...componentExports,
  };
}

/**
 * Deep compare two objects
 * @param {object} obj1 - First object
 * @param {object} obj2 - Second object
 * @returns {boolean} True if objects are equal
 */
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Main validation function
 */
function main() {
  try {
    // Read current package.json
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    const currentExports = packageJson.exports || {};

    // Get expected exports
    const expectedExports = getExpectedExports();

    // Compare exports
    if (!deepEqual(currentExports, expectedExports)) {
      console.error('❌ Package.json exports are out of sync!');
      console.error("   Run 'yarn generate-exports' to update them.");
      console.error("\n   Expected exports don't match current exports.");
      console.error('   This usually happens when:');
      console.error('   - A new component was added');
      console.error('   - A component was removed');
      console.error('   - package.json was manually edited');
      process.exit(1);
    }

    console.log('✅ Package.json exports are up-to-date');
  } catch (error) {
    console.error('❌ Error validating exports:', error.message);
    process.exit(1);
  }
}

main();
