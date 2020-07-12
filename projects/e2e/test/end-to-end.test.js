const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

let imageCount = 0;
function getNextImagePath(name) {
    imageCount += 1;
    return `./screenshots/${imageCount}-${name}.png`;
}

describe("E2E", () => {
    let page;
    let browser;

    beforeAll(async (done) => {
        try {
            browser = await puppeteer.launch();
            page = await browser.newPage();
            await page.setViewport({
                width: 1200,
                height: 920
            });
            done();
        }
        catch (e) {
            console.error("Could not connect to site - is it running?");
            done(e);
        }
    });

    it("Loads the static UsersList view", async (done) => {
        try {
            await page.goto('http://localhost:4040');
            await page.waitForSelector(".users-list-body-header-title", {
                timeout: 10000
            });

            await page.screenshot({ path: getNextImagePath("load-users-list-static") });

            done();
        }
        catch (e) {
            done(e);
        }
    }, 15000);

    it("Fetches users and displays them", async (done) => {
        try {
            await page.waitForSelector(".user-card", {
                timeout: 10000
            });
            
            await page.screenshot({ path: getNextImagePath("load-users-list") });

            done();
        }
        catch (e) {
            done(e);
        }
    });

    it("Fetches users and displays them when 'load more' is clicked", async (done) => {
        try {
            let userCardsCountBefore = await page.evaluate(() => {
                let res = document.querySelectorAll(".user-card");
                return res.length;
            });
            
            const loadButton = await page.waitForSelector("#load-more-button");
            await loadButton.click();
            await page.screenshot({ path: getNextImagePath("load-users-list-loading") });
            await delay(5000);
            await page.screenshot({ path: getNextImagePath("load-users-list-more") });
            
            let userCardsCountAfter = await page.evaluate(() => {
                let res = document.querySelectorAll(".user-card");
                return res.length;
            });

            if (userCardsCountAfter > userCardsCountBefore) {
                done();
            }
            else {
                done(new Error("There were no new users loaded!"));
            }
        }
        catch (e) {
            done(e);
        }
    }, 30000);

    // TODO: Data seeding.
    it("Filters users in desplay based on search input", async (done) => {
        try {
            // Get a card that will be filtered.
            const filteredCard = await page.$x("//h2[contains(., 'JACK')]");
            // and a card that wont.
            const unfilteredCard = await page.$x("//h2[contains(., 'MATTHEW')]");
            
            if (filteredCard.length === 0 || unfilteredCard.length === 0) {
                return done(new Error("No card to be filtered... did you seed the database?"));
            }

            await page.click("#search-input");
            await page.type("#search-input", "matthew");
            await page.screenshot({ path: getNextImagePath("users-list-filtered") });
            
            const filteredCardRetry = await page.$x("//h2[contains(., 'JACK')]");
            const unfilteredCardRetry = await page.$x("//h2[contains(., 'MATTHEW')]");
            
            if (filteredCardRetry.length !== 0 || unfilteredCardRetry.length === 0) {
                return done(new Error("Filtering unsuccessful"));
            }

            await page.click("#search-input");
            for(let i = 0; i < "matthew".length; i += 1) {
                await page.keyboard.press('Backspace');
            }
            await page.screenshot({ path: getNextImagePath("users-list-filter-removed") });

            // Get a card that will be filtered.
            const filteredCardReturn = await page.$x("//h2[contains(., 'JACK')]");
            // and a card that wont.
            const unfilteredCardReturn = await page.$x("//h2[contains(., 'MATTHEW')]");
            
            if (unfilteredCardReturn.length === 0 || filteredCardReturn.length === 0) {
                return done(new Error("Filtering did not stop!"));
            }

            done();
        }
        catch(e) {
            done(e);
        }
    });

    it("Displays modal when as user card is clicked", async (done) => {
        try {
            const knownCard = await page.$x("//h2[contains(., 'MATTHEW')]");
            if (knownCard.length === 0) {
                return done(new Error("Test card not found... did you seed the database?"));
            }
            
            await knownCard[0].click();
            await knownCard[0].click();
            await page.screenshot({ path: getNextImagePath("modal") });
    
            await page.waitForSelector(".modal-overlay", {
                timeout: 10000
            });
    
            done();
        }
        catch (e) {
            done(e);
        }
    });

    it("Displays correct information on modal", async (done) => {
        const nameInput = await page.waitForSelector("input[id=\"name\"]");
        let foundName = await page.evaluate(async (element) => {
            return element.value.toLowerCase();
        }, nameInput);

        if (foundName  === 'matthew') {
            done();
        }
        else {
            done(new Error("The modal appeared with the wrong name!"));
        }
    });

    it("Closes modal when cancel is clicked", async (done) => {
        try {
            const cancelButton = await page.waitForSelector(".modal-input-cancel-button");
            await cancelButton.click();
            
            await page.waitForSelector(".modal-overlay", {
                hidden: true
            });
            await page.screenshot({ path: getNextImagePath("modal-closed.png") });
    
            done();
        }
        catch (e) {
            done(e);
        }
    });

    it("Displays correct information on modal for a different user", async (done) => {
        try {
            let knownCard = await page.$x("//h2[contains(., 'JACK')]");
            if (knownCard.length === 0) {
                return done(new Error("Test card not found... did you seed the database?"));
            }
            
            // Not sure why I need this... maybe the browser is doing something?
            await knownCard[0].click();
            await knownCard[0].click();
            await page.waitForSelector(".modal-overlay", {
                hidden: false
            });
            await page.screenshot({ path: getNextImagePath("modal-another-user") });

            await page.waitForSelector(".modal-overlay", {
                timeout: 10000
            });
    
            const nameInput = await page.waitForSelector("input[id=\"name\"]");
            let receivedName = await page.evaluate(async (element) => {
                return element.value.toLowerCase();
            }, nameInput);
    
            if (receivedName === 'jack') {
                done();
            }
            else {
                done(new Error("The modal appeared with the wrong name (after click on another user)! " + receivedName.toString()));
            }
        }
        catch (e) {
            done(e);
        }
    });

    const FIXED_ADDRESS = "1600 NW 88th St, Kansas City, MO 64155";
    it("Displays the users location on the map", async (done) => {
        try {
            await delay(2000);
            await page.screenshot({ path: getNextImagePath("no-user-location") });
            const locationInput = await page.waitForSelector("#location");
    
            await locationInput.click();
            await locationInput.type(FIXED_ADDRESS);
            await delay(5000);
             
            await page.screenshot({ path: getNextImagePath("user-location-updated") });

            let stateLocation = await page.evaluate(() => {
                return window.store.getState().editUser.displayLocation;
            });
            let mapCenter = await page.evaluate(() => {
                return {
                    lat: window.map.center.lat(),
                    lng: window.map.center.lng()
                }
            });

            for(let i = 0; i < FIXED_ADDRESS.length; i += 1) {
                await locationInput.press('Backspace');
            }
            await delay(2000);
            await page.screenshot({ path: getNextImagePath("user-location-cleared") });

            if (Math.floor(stateLocation.lat) !== 39 || Math.floor(stateLocation.lng) !== -95) {
                return done(new Error("User state was not updated with the known location!" + JSON.stringify(stateLocation)));
            }

            if (Math.floor(mapCenter.lat) !== Math.floor(stateLocation.lat) || Math.floor(mapCenter.lng) !== Math.floor(stateLocation.lng)) {
                return done(new Error("Google map did not pan to user's location!" + JSON.stringify(mapCenter)));
            }

            done();
        }
        catch (e) {
            done(e);
        }
    }, 30000);

    it("Saves modified user info when save button clicked and closes modal", async (done) => {
        try {
            const descriptionInput = await page.waitForSelector("#description");
            const rng = Math.floor((Math.random() * 100)).toString();
            const wantString = "A cool guy #" + rng;
            await descriptionInput.click();
            for(let i = 0; i < 30; i += 1) {
                await descriptionInput.press('Backspace');
            }
            await page.screenshot({ path: getNextImagePath("no-user-description") });
            await descriptionInput.type(wantString);
            await page.screenshot({ path: getNextImagePath("user-description") });
            
            const saveButton = await page.waitForSelector("#user-save-button");
            await saveButton.click();

            await delay(5000);

            const userCard = await page.$x(`//p[contains(., '${wantString}')]`);
            if (!userCard) {
                return done(new Error("Could not find our description! Is the BE running?"));
            }
            await page.screenshot({ path: getNextImagePath("saved-user-description") });

            done();
        }
        catch (e) {
            done(e);
        }
    }, 20000);

    afterAll(async (done) => {
        if (browser) {
            await browser.close();
            done();
        }
    })
});