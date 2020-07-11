# Full Stack Sample Client

This is a full-stack sample client written in React and Typescript.

## Installation

Requires `npm` and `Nodejs >= 12.x`. (npm is usually installed with node.)

To install the necessary packages for development, run `npm install` in this directory.

## Build

You can build the client using `npm run build`. The build pipeline accepts a few arguments as environment variables. These are required to build a working app!

```
BACKEND_HOST_URI := Base url - including scheme and root path - of BE API.
GOOGLE_MAPS_API_KEY := Google maps API key
```

You can either set those environment variables manually, or use `cross-env`.

```
node_modules/.bin/cross-env BACKEND_HOST_URI='<>' GOOGLE_MAPS_API_KEY='<>' npm run build

or (development server)

node_modules/.bin/cross-env BACKEND_HOST_URI='<>' GOOGLE_MAPS_API_KEY='<>' npm start
```

The Backend Host uri is the URI provided by the Backend in this repo - see the BE readme. The google maps API key is required to use google maps. You can create this key on the Google Cloud platform. If you choose to 'restrict' your key (you should), the permissions needed are below. Additionally, you should restrict the usage of the key to your target domains - e.g. `application-sf.github.io`.

```
GCP Key Permissions:
- Maps JavaScript API
```

Note! The BE requires access to the Geocoding API. You should use a separate key for that!

## Deployment

There is no specific deployment pipeline as the client is simply static files.

Simply run `npm run build` with the appropriate environment variables.

!ATTENTION! Be sure to restrict your google API key to your website!

For free hosting with a github account, https://pages.github.com/.


## Development

This repository includes a webpack development server. 

You can start the development server after setting the appropriate environment variables using `npm start`. This will compile and hotreload while you are developing.

The default dev-server port is `4040`.

You can specify the backend URI with environment variables (see build). 
Note! You should NOT use your production key for development. You should create a key solely for development and keep it secret!

E.g. using `cross-env`

```
node_modules/.bin/cross-env BACKEND_HOST_URI='<>' GOOGLE_MAPS_API_KEY='<>' npm start
```

By default, the webpack dev server uses the development config. You can specify the desired webpack config via the command line.

```
node tools/webpack/dev-server/dev-server.js --help

usage: dev-server.js [-h] [-v] [--webpack-config webpackConfig]

Development server for full stack client

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  --webpack-config webpackConfig
                        The config file for webpack compiler
```

Additionally, you can use cross env.

```
node_modules/.bin/cross-env BACKEND_HOST_URI='<>' GOOGLE_MAPS_API_KEY='<>' npm start -- --webpack-config <config_path>
```

## Tests

Unit tests use jest.

### Tests Installation - Notes

There are a lot of components that go into FE testing with jest. First you need to install jest and @types/jest to use typescript with jest.

Jest does not put the Typescript files through webpack. It uses a special loader called `ts-jest` in the `transform` section of the jest config.

Jest does not run the `webpack.DefinePlugin`. You can define globals in the test config file. E.g.

```
.jestrc.json

"globals": {
    "__SYS_BACKEND_HOST_URI__": "https://0dgcwbc735.execute-api.us-east-1.amazonaws.com/dev"
    "__SYS_GOOGLE_MAPS_API_KEY__": "https://0dgcwbc735.execute-api.us-east-1.amazonaws.com/dev"
}
```

Jest has to provide mocks for what would normally be provided by the browser. For example, `fetch`. For this, install `jest-fetch-mock`, and in the `setupEnzyme.ts` file, include the following,

```
import {enableFetchMocks} from 'jest-fetch-mock';

enableFetchMocks();
```

The same is done for the redux store and many other variables.

## Infinite scroll notes

Webkit based browsers can use 

```
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
```

but this is not supported on mozilla, you can use the following on the element with the scrollbar in mozilla.

```
element {
   scrollbar-width: none;
}
```