# Features

- [x] The search functionality should perform real time filtering on client side data and API side data
- [x] List of users should be updated automatically after single user is updated
- [x] Create modal from scratch
- [x] Appear/Disappear of modal should be animated
- [x] When the user reloads the page the scroll will return to its previous location (extracted from req. bellow)
- [-] ~~Infinite loading state should be saved in url query (pagination state should be present in URL query (eg ?page=1) to allow for behavior where~~ **the user can reload the page while still returning to their current scroll position)**

# Language/Tools

- Create React App
- React
- SASS
- TypeScript
- GraphQL Apollo Client + Apollo3 Cache Persist + GraphQL CodeGen
- Jest + React Testing Library
- Eslint + Prettier
- Storybook

# Structure

```
.
├── public # static files
├── build # build output
└── src
    ├── GraphQL # Apollo Client Queries and Mutations
    ├── Views # Pages that will be routed
    ├── assets # Assets like Icons, Images
    ├── components # Composable Components
    ├── hooks # Shareable hooks
    ├── styles # Application styles like variables and mixins
    └── utils # Shareable util functions
```

# Getting Started

Install all dependencies:
```sh
npm install
```

First copy the .env example file
```sh
cp .env.example .env.development.local
```

Then start the application using the following command:
```sh
npm start
```

Open the URL outputed in the browser, this is the application in development mode

# Tests

Launches the test runner in the interactive watch mode.

```sh
npm run test
```

# TODO:
- Code splitting using React Lazy and Suspense
- Increase unit test coverage
- Add E2E tests (Cypress maybe)
- Add form validation (YUP maybe)
