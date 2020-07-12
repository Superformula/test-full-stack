# Full Stack Sample End To End Tests

End to end tests for this stack are implemented with Puppeteer. https://pptr.dev/

## Usage

To perform e2e testing, follow the steps below.

```
1. Deploy the backend by following the installation and deployment instructions in the Backend project folder.
2. 'Deploy' the frontend by following the installation and development instructions in the Frontend project folder.
    - You are just running the webpack-dev-server locally. The BE will be 'live'.
3. DELETE ALL DATA IN THE DATABASE!
4. Seed the data in the database. Use `node seed-data.js` - see instructions below.
5. In this directory, run `npm install`.
6. In this directory, run `npm run test`. No environment variables needed!
```

The results will be printed to the console, and screenshots will be placed in the `screenshots` folder in this directory.


## Seeding Data

`seed-data.js` will upload the expected user data.

You must specify the following environment variables

```
CONFIG_ACCESS_KEY_ID := AWS Role Access Key
CONFIG_SECRET_KEY := AWS Role Secret Key
```

e.g. with cross-env

```
node_modules/.bin/cross-env CONFIG_ACCESS_KEY_ID='<>' CONFIG_SECRET_KEY='<>' node seed-data.js
```

You can delete and create the database table by using `tools/create-table.js` and `tools/delete-table.js` in the same manner.