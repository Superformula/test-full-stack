# Full Stack Sample End To End Tests

End to end tests for this stack are implemented with Puppeteer. https://pptr.dev/

## Usage

To perform e2e testing, follow the steps below.

```
1. Deploy the backend by following the installation and deployment instructions in the Backend project folder.
2. 'Deploy' the frontend by following the installation and development instructions in the Frontend project folder.
    - You are just running the webpack-dev-server locally. The BE will be 'live'.
3. DELETE ALL DATA IN THE DATABASE!
4. Seed the data in the database.
5. In this directory, run `npm install`.
6. In this directory, run `npm run test`.
```

The results will be printed to the console, and screenshots will be placed in the `screenshots` folder in this directory.