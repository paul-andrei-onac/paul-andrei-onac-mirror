---
weight: 2
title: "Font Awesome - Mixin"
date: 2023-03-05T15:58:26+08:00
lastmod: 2023-03-05T15:58:26+08:00
draft: false
author: "Andrei"
authorLink: "https://paul-andrei-onac.ro"
description: "How to use Font Awesome with mixins better"
images: []
resources:
- name: "featured-image"
  src: "sass-mixins.webp"

tags: ["Mixins", "CSS"]
categories: ["Mixins"]

lightgallery: true

toc:
  auto: false
math:
  enable: true
---

This article shows how to use Font Awesome with mixins better.

<!--more-->

## Import Font Awesome 

First of all, in your **vedors folder**, the `_fontawesome.scss`, import only what you need from `node_modules` for the project.

```scss
// Also change the font path if you need to
$fa-font-path: '/fonts/webfonts';

@import "node_modules/@fortawesome/fontawesome-free/scss/fontawesome";
@import "node_modules/@fortawesome/fontawesome-free/scss/brands";
@import "node_modules/@fortawesome/fontawesome-free/scss/solid";
```

{{< admonition >}}
Dont forget! Use the `@import "../route"` depending on your project.
{{< /admonition >}}

Then you need to import Font Awesome from **vendors folder** intro your `main.scss`.

```scss
@import "../vendors/_fontawesome";
```

## The Mixin

You have the `@extend` so it get's you the icons from **Font Awesome** and also the solid ones.

Then the `$is-after` is basically wheather or not the icon that you want to include inside a component has an `:after` or `:before` already.

```scss
@mixin fontawesome-icon($icon, $is-after: false) {
  @extend %fa-icon;
  @extend .fa-solid;

  @if $is-after {
    content: fa-content($icon);
    
  } @else {

    &:before {
      content: fa-content($icon);
    }
  }
}
```

## The use case of the mixin

```scss
.status {
  &--success {
    @include fontawesome-icon($fa-var-check, false);
  }
}