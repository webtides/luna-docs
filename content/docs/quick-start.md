---
title: "Quick start"
---
# Quick start


## Installation

To start with moon-js, you normally start with an empty project and run `npm init -y`
to generate a really basic package.json.
After that you have to install moon-js and the moon-cli as a dependency.

To install moon-js run:

 `npm install @webtides/moon-js --save`

The cli should be installed as a development depency. Run:

`npm install @webtides/moon-cli --save-dev`


## First start

After you have installed moon-js and the cli, run `moon --dev` to start moon-js in
development mode. This will generate the basic files needed to get going and it will
watch your files and restart your moon-js server after a file has been edited.

moon-js starts your application on port `3005`, or on the port specified
in your [moon.config.js](/configuration). You can now open `http://localhost:3005` to see
the moon-js welcome page.

## Core concepts

Before getting started, you should make yourself familiar with the [core concepts of moon-js](/concepts).
