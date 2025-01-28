---
weight: 1
title: "How to integrate HUGO and Tailwind v3 in 5 Steps"
date: 2024-11-24T15:58:26+08:00
lastmod: 2023-11-24T15:58:26+08:00
draft: false
author: "Andrei"
authorLink: "https://paul-andrei-onac.ro"
description: "How to use Font Awesome with mixins better"
images: []
resources:
- name: "featured-image"
  src: "hugo-and-tailwind.png"

tags: ["Hugo", "Tailwind", "Static Sites", "Frontend"]
categories: ["HUGO", "Tailwind"]

lightgallery: true

toc:
  auto: false
math:
  enable: true
share:
  enable: true
comment:
  enable: true
---

HUGO, generatorul de site-uri statice ultra-rapid, și Tailwind, framework-ul CSS bazat pe utilități, formează un duo puternic pentru construirea site-urilor web moderne și responsive. Acest ghid vă va arăta pas cu pas procesul de integrare a HUGO cu Tailwind, asigurându-vă că site-ul dumneavoastră este atât rapid, cât și frumos.

## Cerințe preliminare

Înainte să începem, asigurați-vă că aveți instalate următoarele:

- **Node.js** (pentru gestionarea Tailwind și a dependențelor sale)
- **HUGO** (instalat prin Homebrew sau prin managerul de pachete al sistemului)
- **SASS** mai precis Dart Sass (instalat global)
- O înțelegere de bază a conceptelor HUGO și CSS

## **Pasul 1:** Configurarea unui nou proiect HUGO

Începeți prin crearea unui nou proiect HUGO. Rulați următoarea comandă în Git Bash:

```bash
hugo new site website
cd website/
hugo new theme website
mv themes/website/layouts ./
rm -rf themes
```

{{< admonition >}}
Apoi deschideți proiectul cu IDE-ul preferat.
{{< /admonition >}}

## **Pasul 2:** Configurarea npm și instalarea Tailwind

În folderul proiectului, inițializați npm și instalați Tailwind împreună cu dependențele necesare:

```bash
npm init -y
npm install -D tailwindcss@3.4.17 postcss@8.4.47 postcss-cli@11.0.0 autoprefixer@10.4.20 @fullhuman/postcss-purgecss@6.0.0
```

## **Pasul 3:** Configurarea Tailwind în proiectul HUGO

### Crearea fișierului (`tailwind.config.js`) 

Generați fișierul de configurare Tailwind folosind npx:

```bash
npx tailwind init
```

Apoi, înlocuiți conținutul cu:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./hugo_stats.json'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Crearea fișierului (`postcss.config.js`)

Generați fișierul de configurare PostCSS folosind bash:

```bash
touch postcss.config.js
```

Această configurație asigură că Tailwind, autoprefixer și PurgeCSS funcționează împreună fără probleme:

```javascript
let tailwindConfig = process.env.HUGO_FILE_TAILWIND_CONFIG_JS || './tailwind.config.js';
const tailwind = require('tailwindcss')(tailwindConfig);
const autoprefixer = require('autoprefixer');

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  safelist: [],
});

module.exports = {
	plugins: [
    tailwind,
    ...(process.env.HUGO_ENVIRONMENT !== "development" ? [
      autoprefixer({
        browsers: ["> 1%", "last 3 versions", "Firefox >= 20", "iOS >=7"],
      }),
      purgecss,
    ] : []),
  ],
};
```

### Crearea fișierului (`main.scss`)

Generați fișierul SCSS folosind bash în `assets/css/main.scss`:

```bash
mkdir -p assets/css
touch assets/css/main.scss
```

Apoi, înlocuiți conținutul cu:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

@config "tailwind.config.js";
```

## **Pasul 4:** Configurarea procesului de build HUGO

Pentru a activa integrarea Tailwind, ajustați fișierele de configurare HUGO:

### Structura directoarelor

{{< admonition type=warning title="Nu copiați, este doar pentru referință" >}}
```
├── config
│   ├── _default
│   │   ├── build.toml
│   │   └── module.toml
```
{{< /admonition >}}

Generați ambele fișiere de configurare folosind bash:

```bash
mkdir -p config/_default
touch config/_default/build.toml config/_default/module.toml
```

### Crearea fișierului `build.toml`

Adăugați următoarele setări pentru a gestiona cache-ul și resursele:

```toml
[buildStats]
enable = true

[[cachebusters]]
source = 'assets/watching/hugo_stats\.json'
target = 'main\.(css|styles|scss|sass)'
[[cachebusters]]
source = '(postcss|tailwind)\.config\.js'
target = '(css|styles|scss|sass)'
[[cachebusters]]
source = 'assets/.*\.(js|ts|jsx|tsx)'
target = 'js'
[[cachebusters]]
source = 'assets/.*\.(.*)$'
target = '$1'
```

### Crearea fișierului `module.toml`

Configurați HUGO pentru a monta resurse și a genera `hugo_stats.json`:

```toml
[hugoVersion]
extended = true
min = '0.128.0'
max = '0.142.0'

[[mounts]]
source = 'assets'
target = 'assets'
[[mounts]]
source = 'content'
target = 'content'
[[mounts]]
source = 'data'
target = 'data'
[[mounts]]
source = 'layouts'
target = 'layouts'
[[mounts]]
source = 'static'
target = 'static'
[[mounts]]
source = 'hugo_stats.json'
target = 'assets/watching/hugo_stats.json'
```

## **Pasul 5:** Actualizarea layout-urilor pentru CSS

În `layouts/partials/head/css.html`, definiți modul în care stilurile ar trebui încărcate:


```html
{{ $options := dict
  "inlineImports" true
  "transpiler" "libsass"
  "targetPath" "main.css"
  "vars" site.Params.styles
  "enableSourceMap" (not hugo.IsProduction)
  "includePaths" (slice "node_modules")
}}

{{ $PostCSS := dict
  "config" "./postcss.config.js"
}}

{{ $styles := resources.Get "css/main.scss" }}
{{ $styles = $styles | resources.ExecuteAsTemplate "css/main.scss" . | css.Sass $options | css.PostCSS $PostCSS }}

{{ if or (eq hugo.Environment "staging") (eq hugo.Environment "production") }}
{{ $styles = $styles | minify | fingerprint "sha384" | resources.PostProcess }}
  <link rel="stylesheet" href="{{ $styles.RelPermalink }}" type="text/css" media="all" integrity="{{ $styles.Data.Integrity }}" crossorigin="anonymous">
{{ else }}
  <link rel="stylesheet" href="{{ $styles.RelPermalink }}" type="text/css" media="all">
{{ end }}

```

## Concluzie

Urmând acești pași, veți fi integrat cu succes Tailwind cu HUGO, activând un sistem de design modern și responsive pentru site-ul dumneavoastră. Această configurare vă va permite să folosiți puterea abordării utility-first a Tailwind, menținând în același timp procesul de build rapid și eficient.