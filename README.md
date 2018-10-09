**Author:** Emily K. Grimes
**Date:** October 1, 2018


## Table of Contents

- [How the App Works](#how-the-app-works)
- [Debugging the App](#debugging-the-app)
   - [Useful Tools](#useful-tools)
- [Reproducing the App](#reproducing-the-app)
   - [Important Little Things](#important-little-things)


## How the App Works

Pressing "GO" initializes a data collection process designed around the process currently in use by the ATD radar operations during weather events. Any of the forms besides "EVENT END" can be submitted as many times as needed during the course of an event. EVENT END is meant to be the form for a final event summary. Submitting this last form ends the data collection. Before the data is saved to a [phpmyadmin/sqlite](http://scooter.dmz.nssl/phpMyAdmin/) database, a summary page allows the collector to look over the data and edit it as needed. Pressing the final "It's all good" button puts the data in the database for storage and future retrieval.

## Debugging the App

This project was bootstrapped with Create React App. Check out the most recent documentation for CRA [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). To truly feel comfortable with the codebase, you will need to be familiar with CRA, and [React.js](https://reactjs.org/) in particular. The [documentation](https://reactjs.org/docs/getting-started.html) for React is very robust and relatively easy to read and understand if you understand Javascript and web development principles. Starting there if you are new to React will be a big help. Otherwise, reading through this document (where you are now) will help you understand the code as I have written it.

To the left the components that make this app work are organized and documented based on the way the src folder is organized with respect to .js files. Every class, function, and state object has been commented.

### Useful Tools

If the app has issues, a helpful tool to debugging is the React Developer Tools browser extension for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/).

React syntax is very well supported in [Atom text editor](https://atom.io/), a free text editor with many useful packages for developers. It is available in the Self Service app store.

## Reproducing the App

From the terminal, navigate to the directory where the src folder is. For example, if the app is on your Desktop:

` cd Desktop/data-collection `

Make any changes that may need to be made in src, and again from terminal:

` npm run build `

This command will produce a production build of the app in vanilla webstack code. The contents of the *build* folder that appears level with *src* can be moved to a live web server.

### Important Little Things

A production build will not work properly if the *package.json* file lacks an attribute for the homepage. This information gets translated to complete relative links written in "syntactic sugar" or short hand code.

So before running the **build** command, be sure to add the relative live address for where this app will live on the web server to *package.json* on the outermost attribute level on the tree. For example:

`  "homepage": "/projects/webdev/radops" `

is appropriate for a build that has its *index.html* placed at `https://intranet.nssl.noaa.gov/projects/webdev/radops/`
