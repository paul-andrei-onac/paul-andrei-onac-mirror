---
weight: 2
title: "Flex Shorthand - Content"
date: 2023-03-05T15:58:26+08:00
lastmod: 2023-03-05T15:58:26+08:00
draft: false
author: "Andrei"
authorLink: "https://paul-andrei-onac.ro"
description: "This article shows the basic shorthand for flex property"
images: []
resources:
- name: "featured-image"
  src: "featured-image.webp"

tags: ["Flex", "CSS"]
categories: ["Flex"]

lightgallery: true

toc:
  auto: false
math:
  enable: true
---

This article shows the basic shorthand for flex property.

<!--more-->

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
