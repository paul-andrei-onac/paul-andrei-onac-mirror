---
title: "Background Shorthand"
description: "Background Properties."
date: 2023-04-01T01:38:27+03:00
draft: false
type: blog
topic: "css"
slug: ""
authors: ["Paul Andrei Onac"]
tags: ["background", "shorthands", "css"]
categories: [""]
series: ["shorthands"]
externalLink: ""
---

## Here are all the background properties.

- ```background-color```
- ```background-image```
- ```background-position```
- ```background-size```
- ```background-repeat```
- ```background-origin```
- ```background-clip```
- ```background-attachment```

### This is the shorthand.
I will give you 3 examples.

```css
.background-shorthand-one {
  background: #000 url("/image.png"); no-repeat top left / 50% 20% border-box content-box;
}
```

```css 
.background-shorthand-two {
  background: repeating-linear-gradient(-45deg, yellow, yellow 10%, black 10%, black 20% );
}
```

```css 
.background-shorthand-three {
  background: linear-gradient(103.62deg, #074566 20.56%, #00F4FF 100.62%), url("/sites/default/files/static-pages/about-hero.png") no-repeat center center / 100% 100%;
}
```