#!/usr/bin/env bash

set -e

CI=1 npm test
npm run lint
npm run build

if ! git describe --exact-match HEAD; then
  while [[ ! $versionIncrement =~ ^major|minor|patch$ ]]; do
    echo -n 'Enter version increment (major|minor|patch): '
    read versionIncrement
  done
  npm version $versionIncrement
fi
