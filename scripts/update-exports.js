#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const BACKUP_PATH = path.join(__dirname, '..', 'package.json.backup');
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');
const INDEX_TSX_PATH = path.join(__dirname, '..', 'src', 'index.tsx');

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
 * Generate export entry for a source path
 */
function generateExportFromSource(sourcePath) {
  // Convert src path to lib paths
  const relativePath = sourcePath.replace('./src/', '');
  const typesPath = `./lib/typescript/src/${relativePath}`.replace(
    /\.tsx?$/,
    '.d.ts'
  );
  const defaultPath = `./lib/module/${relativePath}`.replace(/\.tsx?$/, '.js');

  return {
    source: sourcePath,
    types: typesPath,
    default: defaultPath,
  };
}

/**
 * Parse index.tsx to extract portal, contexts, hooks, and utils exports
 */
function parseIndexExports() {
  try {
    if (!fs.existsSync(INDEX_TSX_PATH)) {
      console.warn('⚠️  index.tsx not found:', INDEX_TSX_PATH);
      return {};
    }

    const indexContent = fs.readFileSync(INDEX_TSX_PATH, 'utf8');
    const exports = {};

    // Parse Portal export: export * from './primitives/portal';
    const portalMatch = indexContent.match(
      /export\s+\*\s+from\s+['"]\.\/primitives\/portal['"]/
    );
    if (portalMatch) {
      exports.portal = './src/primitives/portal/index.ts';
    }

    // Parse Hooks export: export * from './helpers/external/hooks';
    const hooksMatch = indexContent.match(
      /export\s+\*\s+from\s+['"]\.\/helpers\/external\/hooks['"]/
    );
    if (hooksMatch) {
      exports.hooks = './src/helpers/external/hooks/index.ts';
    }

    // Parse Contexts export: export * from './helpers/external/contexts';
    const contextsMatch = indexContent.match(
      /export\s+\*\s+from\s+['"]\.\/helpers\/external\/contexts['"]/
    );
    if (contextsMatch) {
      exports.contexts = './src/helpers/external/contexts/index.ts';
    }

    // Parse Utils export: export * from './helpers/external/utils';
    const utilsMatch = indexContent.match(
      /export\s+\*\s+from\s+['"]\.\/helpers\/external\/utils['"]/
    );
    if (utilsMatch) {
      exports.utils = './src/helpers/external/utils/index.ts';
    }

    return exports;
  } catch (error) {
    console.error('❌ Error parsing index.tsx:', error.message);
    return {};
  }
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

    // Add hardcoded provider export
    newExports['./provider'] = {
      source: './src/providers/hero-ui-native/index.ts',
      types: './lib/typescript/src/providers/hero-ui-native/index.d.ts',
      default: './lib/module/providers/hero-ui-native/index.js',
    };

    // Add hardcoded raw provider export
    newExports['./provider-raw'] = {
      source: './src/providers/hero-ui-native-raw/index.ts',
      types: './lib/typescript/src/providers/hero-ui-native-raw/index.d.ts',
      default: './lib/module/providers/hero-ui-native-raw/index.js',
    };

    // Parse and add portal, contexts, hooks, utils exports from index.tsx
    const indexExports = parseIndexExports();
    if (indexExports.portal) {
      newExports['./portal'] = generateExportFromSource(indexExports.portal);
    }
    if (indexExports.contexts) {
      newExports['./contexts'] = generateExportFromSource(
        indexExports.contexts
      );
    }
    if (indexExports.hooks) {
      newExports['./hooks'] = generateExportFromSource(indexExports.hooks);
    }
    if (indexExports.utils) {
      newExports['./utils'] = generateExportFromSource(indexExports.utils);
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
  } else if (command === 'update' || !command) {
    // Allow running without prepack/postpack for testing
    console.log('🔄 Running update-exports...');
    backupPackageJson();
    updateExports();
    console.log('✅ Exports updated. Run with "postpack" to restore backup.');
  } else {
    console.error('❌ Invalid command. Use "prepack", "postpack", or "update"');
    console.error(
      'Usage: node scripts/update-exports.js [prepack|postpack|update]'
    );
    process.exit(1);
  }
}

main();
