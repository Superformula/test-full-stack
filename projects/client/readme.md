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

## Tests

Unit tests use jest.

`npm run test` will build the code prior to running the tests. See build.

E.g. Using cross-env

```
node_modules/.bin/cross-env BACKEND_HOST_URI='https://0dgcwbc735.execute-api.us-east-1.amazonaws.com/dev/' npm run test
```

### Tests Installation - Notes

There are a lot of components that go into FE testing with jest. First you need to install jest and @types/jest to use typescript with jest.

Jest does not put the Typescript files through webpack. It uses a special loader called `ts-jest` in the `transform` section of the jest config.

Jest does not run the `webpack.DefinePlugin`. You can define globals in the test config file. E.g.

```
.jestrc.json

"globals": {
    "__SYS_BACKEND_HOST_URI__": "https://0dgcwbc735.execute-api.us-east-1.amazonaws.com/dev"
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