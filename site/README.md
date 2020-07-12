### Setting up the site project

The site needs to be run on your local environment.

1. Go to the projects “site” folder
2. Make a copy of .env.test and .env.developement and add the .local extension. So these two files should be call env.test.local and .env.development.local.
3. Add in the userservice e2e test credential to the .env.test.local file and the userservice dev credential for .env.development.local. You will need to put in a Google API key to these two 
4. Go to the cypress/support folder and make a copy of the environment.js.development. Rename that to just environment.js. 
5. Put in the userservice e2e test credential to the environment.js file
6. Run npm i
7. To run the site type npm start
8. To run the e2e test site type in npm start_test_site
9. To run the unit test type in npm test
10. npm cypress:open to run the e2e test.

 

Some notes

The user list is sorted by descending order. Adding a user will always put the user right at the beginning. That means if another client adds a user you will see what they added right at the beginning.   Anytime a user is added/deleted/updated there will be a toast notification.  

The e2e test is not 100% stable I would say.  Especially the test that simulate another client adding/updating/deleting a user and those result showing up on your screen. However, they do work for me on my machine (heh the famous word from a developer).  Here is a short video showing the e2e test in action running locally.  But I do notice from time to time it fails and it looks like cypress is grabbing on to the old elements and blocking the subscription from finishing.