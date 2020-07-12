### Setting up the site project

The site needs to be run on your local environment.

1. Go to the projects “site” folder
2. Make a copy of .env.test and .env.developement and add the .local extension. So these two files should be call env.test.local and .env.development.local.
3. Add in the AppSync credential you got from deploying to both these files. Please add in the e2e test credential in the .env.test.local file and the regular credential for .env.development.local
4. Go to the cypress/support folder and make a copy of the environment.js.development. Rename that to just environment.js
5. Run npm i
6. To run the site type npm start
7. To run the e2e test site type in npm start_test_site

 

### Some workflow and design stuff on how the site works.

The user list is sorted by descending order. Adding a user will always put the user right at the beginning. That means if another client/user adds a user you will see what they added right at the beginning. 

Anytime a user is added/deleted/updated there will be a toast notification.

Important note on running end 2 end test

There seems to be an odd issue regarding running all the tests at once. There is a spec that simulates user being added on another client and displaying right on cypress UI and it seems like cypress is holding on to an old list, which forces the test to fail. But the next test you can clearly see the user being added and being updated and then being removed. Here are some videos that demonstrate that. But any run after that should pass.