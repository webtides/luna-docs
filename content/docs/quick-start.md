---
title: "Quick start"
---
# Quick start


## Installation

To start with luna-js, you normally start with an empty project and run `npm init -y`
to generate a really basic package.json.
After that you have to install luna-js and the luna-cli as a dependency.

To install luna-js run:

 `npm install @webtides/luna-js --save`

The cli should be installed as a development depency. Run:

`npm install @webtides/luna-cli --save-dev`


## First start

After you have installed luna-js and the cli, run `npx luna --dev` to start luna-js in
development mode. This will generate the basic files needed to get going and it will
watch your files and restart your luna-js server after a file has been edited.

luna-js starts your application on port `3005`, or on the port specified
in your [luna.config.js](/configuration). You can now open `http://localhost:3005` to see
the luna-js welcome page.

## Core concepts

Before getting started, you should make yourself familiar with the basic concepts of 
luna-js.
