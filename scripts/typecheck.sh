#!/bin/bash

# Run TypeScript compiler
tsc --project tsconfig.typecheck.json

# Check if tsc succeeded
if [ $? -eq 0 ]; then
  echo ""
  echo "✅ TypeScript check passed successfully! 🎉"
  echo ""
  exit 0
else
  exit 1
fi