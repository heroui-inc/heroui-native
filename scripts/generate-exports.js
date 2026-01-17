#!/usr/bin/env node

/**
 * Script to automatically generate component exports in package.json
 * Scans src/components directory and adds exports for each component
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
    console.warn('⚠️  Components directory not found:', COMPONENTS_DIR);
    return [];
  }

  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/**
 * Generate export entry for a component
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
 * Main function to update package.json exports
 */
function main() {
  try {
    // Read package.json
    const packageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    // Get existing exports
    const existingExports = packageJson.exports || {};

    // Preserve special exports (root, styles, package.json)
    const specialExports = {
      '.': existingExports['.'],
      './styles': existingExports['./styles'],
      './package.json': existingExports['./package.json'],
    };

    // Get all components
    const components = getComponents();

    if (components.length === 0) {
      console.warn('⚠️  No components found. Skipping export generation.');
      return;
    }

    // Generate component exports
    const componentExports = {};
    for (const component of components) {
      const exportPath = `./${component}`;
      componentExports[exportPath] = generateExportEntry(component);
    }

    // Merge exports: special exports first, then component exports
    packageJson.exports = {
      ...specialExports,
      ...componentExports,
    };

    // Write updated package.json
    const updatedContent = JSON.stringify(packageJson, null, 2) + '\n';
    fs.writeFileSync(PACKAGE_JSON_PATH, updatedContent, 'utf8');

    console.log(`✅ Generated exports for ${components.length} components:`);
    components.forEach((component) => {
      console.log(`   - ./${component}`);
    });
  } catch (error) {
    console.error('❌ Error generating exports:', error.message);
    process.exit(1);
  }
}

main();
