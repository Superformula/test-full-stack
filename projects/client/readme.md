# Full Stack Sample Client

This is a full-stack sample client written in React and Typescript.

## Installation

Requires `npm` and `Nodejs >= 12.x`. (npm is usually installed with node.)

To install the necessary packages for development, run `npm install` in this directory.

## Build

You can build the client using `npm run build`. The build pipeline accepts a few arguments as environment variables. (See `tools/webpack/build-config-options.js`).

The default `BACKEND_HOST_URI` is `localhost:4080`.

```
BACKEND_HOST_URI := Base url - including scheme and root path - of BE API.
```

You can either set those environment variables manually, or use `cross-env`.

```
node_modules/.bin/cross-env BACKEND_HOST_URI='<>' npm run build

or (development)

node_modules/.bin/cross-env BACKEND_HOST_URI='<>' npm start
```


## Deployment

```
TODO:
-- Specify production config.
```

## Development

This repository includes a webpack development server. 

You can start the development server using `npm start`. This will compile and hotreload while you are developing.

The default dev-server port is `4040`.

```
TODO:
-- Document webpack development server arguments.
```