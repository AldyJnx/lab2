#!/usr/bin/env bash
# Script de build para Render

echo "Installing dependencies..."
npm install

echo "Initializing database..."
node init-db.js

echo "Build completed!"
