# webpack 2 + TypeScript 2 + Babel example

Incrementally builds and bundle your source files + outputs a fully es5 compliant JavaScript code!

Webpack is configured to mutualize common module code in a commons file and vendor in another!

## Prerequisits
```
npm install -g webpack@2.2.1
```

## Build
```
npm install
webpack --progress --watch
```
Some warnings are printed but they're harmless. Check that the `js/index.js` and `js/vendor.js` have correctly been generated.

## Test it
Open index.html in your browser and watch console

