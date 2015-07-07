# 4008-preventdefault 
This is a repo to demonstrate a bug in `ionic@1.0.1`, documented at: https://github.com/driftyco/ionic/issues/4008

> ***This repo is built with [`generator-mcfly`](https://github.com/mcfly-io/generator-mcfly) our yeoman generator that gives you a pre-wired gulp & browserify build system for angular apps and options to automatically integrate ionic.***

Steps to reproduce: 
1. Clone the repo & `cd` into the directory  
  ```sh
  git clone https://github.com/jskrzypek/4008-preventDefault#master && cd 4008-preventDefault
  ```

1. Install npm & bower dependencies
  ```sh
  npm install && bower install
  ```

1. Use git to apply a patch to stick some `console.log` messages on the `Drag` handler
  ```sh
  git apply ionic.js.patch
  ```

1. Use our gulp task to build the distributed code (using browserify)
  ```sh
  gulp dist
  ```

1. `cd` into the directory where the ionic project sits
  ```sh
  cd dist/app/dev
  ```

1. Add platforms
  ```sh
  ionic platform add android ios
  ```

1. Run/build for either platform with `ionic run ...`. Note that I am currently only able to reproduce this bug in ios.
1. Attach your console (safari developer view for `ios` or [chrome://inspect#devices](chrome://inspect#devices) for `android`)
1. In the tab labeled `ion-list` you should be able to scroll fine via dragging, and should see messages logged by the drag handler from our patch.
1. Switch to the tab labeled `ion-content`. On ios you will *not* be able to scroll via dragging, but messages will be logged to the console showing us that the `ev.preventDefault()` method is being called on these legitimate drag events.
1. Click the red heart in the upper-right corner. This will run the [`drag-handler.js`](https://github.com/jskrzypek/4008-preventDefault/blob/master/client/scripts/drag-handler.js) script that swaps out the current version of the handler for the one with my suggested fixes.
1. Now you can scroll just fine in the `ion-content` tab and `ev.preventDefault()` is not being called when it shouldn't be.


## Usage


## Testing


## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com//4008-preventdefault/releases)

## License


