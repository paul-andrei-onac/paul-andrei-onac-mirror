---
weight: 2
title: "Flex Shorthand - Content"
date: 2020-03-05T15:58:26+08:00
lastmod: 2020-03-05T15:58:26+08:00
draft: false
author: "Andrei"
authorLink: "https://dillonzq.com"
description: "Find out how to create and organize your content quickly and intuitively in LoveIt theme."
images: []
resources:
- name: "featured-image"
  src: "featured-image.jpg"

tags: ["flex", "css"]
categories: ["flex"]

lightgallery: true

toc:
  auto: false
math:
  enable: true
---


## Here are all the Flex properties.

Flex
- ```flex-grow```
- ```flex-shrink```
- ```flex-basis```

Flex-flow
- ```flex-flow```

> **Side note:** This is the order of your shorthand.

### This is the shorthand.

```css
.flex--parent {
  display: flex;
}

.flex-shorthand-example--child {
  Flex: 1 1 100%;
}
```

```css
.flex-flow-shorthand-example {
  flex-direction: column;
  flex-wrap: wrap;
}
