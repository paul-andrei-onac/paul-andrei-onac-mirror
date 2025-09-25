#!/bin/bash

echo "=== Hugo Build Script Starting ==="
echo "Branch detected: $CF_PAGES_BRANCH"
echo "CF_PAGES_URL: $CF_PAGES_URL"
echo "Current directory: $(pwd)"
echo "=================================="

if [ "$CF_PAGES_BRANCH" = "main" ] || [ "$CF_PAGES_BRANCH" = "master" ]; then
  echo "🚀 BUILDING FOR PRODUCTION"
  npm run build
  echo "✅ Production build completed"
else
  echo "🔧 BUILDING FOR PREVIEW/DEVELOPMENT"
  npm run preview
  echo "✅ Preview build completed"
fi

echo "=== Build Script Finished ==="
