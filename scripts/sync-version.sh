#!/bin/bash

# Get the new version from package.json
VERSION=$(node -p "require('./package.json').version")

echo "📦 Syncing version v$VERSION across the project..."

# Use Claude Code to update version in README and example app
claude "Update the version number to v$VERSION in these files:
1. README.md - update any existing version references
2. example/src/app/(components)/index.tsx - find and update the version string

Look for patterns like v followed by semantic versioning (e.g., v1.0.0, v1.0.0-alpha.3, v1.0.0-beta.1, etc.)
Make sure to preserve the 'v' prefix."

echo "✅ Version sync complete!"