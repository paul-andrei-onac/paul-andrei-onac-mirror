---
weight: 1
title: "How to integrate HUGO and Tailwind in 5 Steps"
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

HUGO, the blazing-fast static site generator, and Tailwind, the utility-first CSS framework, are a powerful duo for building modern, responsive websites. This guide will walk you through the step-by-step process of integrating HUGO with Tailwind, ensuring your site is both fast and beautiful.

## Prerequisites

Before we begin, make sure you have the following installed:

- **Node.js** (for managing Tailwind and its dependencies)
- **HUGO** (installed via Homebrew or your system’s package manager)
- A basic understanding of HUGO and CSS concepts

## **Step 1:** Set Up a New HUGO Project

Start by creating a new HUGO project. Run the following command in your Git Bash:

```bash
hugo new site website
cd website/
hugo new theme website
mv themes/website/layouts ./
rm -rf themes
```

{{< admonition >}}
Then open the project with your favorite IDE.
{{< /admonition >}}

## **Step 2:** Configure npm and install Tailwind

Inside your project folder, initialize npm and install Tailwind along with its required dependencies:

```bash
npm init -y
npm install -D tailwindcss@3.4.17 postcss@8.4.39 postcss-cli@11.0.0 autoprefixer@10.4.19 @fullhuman/postcss-purgecss@6.0.0
```

## **Step 3:** Configure Tailwind in Your HUGO Project

### Create the (`tailwind.config.js`) file

Generate the Tailwind configuration file using npx:

```bash
npx tailwind init
```

Then, replace the content with:

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

### Create the (`postcss.config.js`) file

Generate the PostCSS configuration file using bash:

```bash
touch postcss.config.js
```

This configuration ensures that Tailwind, autoprefixer, and PurgeCSS work seamlessly together:

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

### Create the (`main.scss`) file

Generate the SCSS file using bash at `assets/css/main.scss`:

```bash
mkdir -p assets/css
touch assets/css/main.scss
```

Then, replace the content with:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

@config "tailwind.config.js";
```

## **Step 4:** Configure HUGO's Build Process

To enable Tailwind integration, adjust HUGO's configuration files:

### Directory Structure

{{< admonition type=warning title="Don't copy, it's just for reference" >}}
```
├── config
│   ├── _default
│   │   ├── build.toml
│   │   └── module.toml
```
{{< /admonition >}}

Generate the both configurations files using bash:

```bash
mkdir -p config/_default
touch config/_default/build.toml config/_default/module.toml
```

### Create the `build.toml` file

Add the following settings to manage caching and assets:

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

### Create the `module.toml` file

Configure HUGO to mount assets and generate `hugo_stats.json`:

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

## **Step 5:** Update the Layouts for CSS

In `layouts/partials/head/css.html`, define how styles should be loaded:


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

## Conclusion

By following these steps, you will have successfully integrated Tailwind with HUGO, enabling a modern, responsive design system for your site. This setup will allow you to harness the power of Tailwind's utility-first approach while keeping your build process fast and efficient.