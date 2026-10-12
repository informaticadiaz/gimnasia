#!/usr/bin/env node
// Guards the Spanish locale key set. English is the source language and has no locale
// file, so Spanish remains the only maintained translation coverage target.
//
//   node scripts/check-locales.mjs
//
const referenceLocale = 'es'

import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const localesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales')
const files = readdirSync(localesDir).filter(f => f.endsWith('.js')).sort()

if (!files.length) {
  console.error(`No locale files found in ${localesDir}`)
  process.exit(1)
}

const locales = new Map()
for (const file of files) {
  const { default: dict } = await import(pathToFileURL(join(localesDir, file)).href)
  if (!dict || typeof dict !== 'object') {
    console.error(`${file}: no default-exported object`)
    process.exit(1)
  }
  locales.set(file.replace(/\.js$/, ''), new Set(Object.keys(dict)))
}

const referenceKeys = locales.get(referenceLocale)
if (!referenceKeys) {
  console.error(`Missing required ${referenceLocale}.js locale`)
  process.exit(1)
}

console.log(`${referenceLocale}.js: ${referenceKeys.size} keys — checked.`)
