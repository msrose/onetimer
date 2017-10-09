# One Timer

[![Build Status](https://travis-ci.org/msrose/onetimer.svg?branch=develop)](https://travis-ci.org/msrose/onetimer) [![codecov](https://codecov.io/gh/msrose/onetimer/branch/develop/graph/badge.svg)](https://codecov.io/gh/msrose/onetimer)

(Work in progress)

One Timer is a mobile-first, fully offline-capable Rubik's cube timer for the web. Free and open-source with no sign-up required: https://msrose.github.io/onetimer.

## Goals of One Timer

- Provide a consistent, great-looking UI on all your devices, both online and offline - _by default_
- Provide the features you need, and none that you don't - _by default_
- Integrate seamlessly with external storage solutions

## Features

- [X] No sign-up required
- [X] Support for all WCA puzzles
- [X] Hide puzzles that you don't practice
- [X] Reorder puzzle names in list
- [X] "Add to Homescreen" from Chrome so you can use it just like a mobile app
- [X] Persist solves to local storage
- [X] Deleting solves
- [X] +2s
- [X] DNFs
- [X] Full offline support
- [ ] Sync solves to your own server
- [ ] Graphs and visualizations to see solve trends
- [ ] Scramble generation for all cubic puzzles
- [ ] Export solves to JSON/CSV
- [ ] Save solves to Google Drive
- [ ] Custom puzzles
- [ ] Full desktop support
- [ ] Built-in cloud-storage functionality (would require a server and database)

Feature requests can be made on the [GitHub issues page](https://github.com/msrose/onetimer/issues). One Timer will prioritize convention over configuration in order to align with the goals of the project. This design choice means that not all features will make it in to One Timer, and the option to turn features on/off will generally not be available.

## About

Built with [react](https://facebook.github.io/react/), [redux](http://redux.js.org/), and [material-ui](https://material-ui-1dab0.firebaseapp.com/). Bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).
