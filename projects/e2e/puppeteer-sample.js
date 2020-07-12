const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function e2eTest() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4040');
  
    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });

    console.log('Dimensions:', dimensions);
    
    let pageUrl = page.url();
    await page.screenshot({ path: "./screenshots/no-input.png" });
    let userCards = await page.evaluate(() => {
        let res = document.querySelectorAll(".user-card");
        return res.length;
    });
    let selector = await page.waitForSelector("#search-input");

    // await page.$eval("#search-input", (element) => {
    //   element.value = "matthew";
    // });
    // const jackCard = await page.$x("//h2[contains(., 'JACK')]");

    // await page.click("#search-input");
    // await page.type("#search-input", "matthew");
    // const jackCardRetry = await page.$x("//h2[contains(., 'JACK')]");

    const knownCard = await page.$x("//h2[contains(., 'MATTHEW')]");
    let knownCard2 = await page.$x("//h2[contains(., 'JACK')]");
    if (knownCard.length === 0) {
    }
    
    await knownCard[0].click();
    await delay(1000);
    const cancelButton = await page.waitForSelector(".modal-input-cancel-button");
    await cancelButton.click();
    await delay(1000);
    // await page.screenshot({ path: "./screenshots/modal.png" });

    // const locationInput = await page.waitForSelector("#location");
    // await locationInput.click();
    // await locationInput.type("1600 NW 88th St, Kansas City, MO 64155");
    // await delay(5000);

     
    // let stateLocation = await page.evaluate(() => {
    //     return window.store.getState().editUser.displayLocation;
    // });
    // let mapCenter = await page.evaluate(() => {
    //     return {
    //         lat: window.map.center.lat(),
    //         lng: window.map.center.lng()
    //     }
    // });

    // if (Math.floor(stateLocation.lat) !== 39 || Math.floor(stateLocation.lng) !== -95) {
    // }

    // if (Math.floor(mapCenter.lat) !== Math.floor(stateLocation.lat) || Math.floor(mapCenter.lng) !== Math.floor(stateLocation.lng)) {
  
    // }

    // await page.screenshot({ path: "./screenshots/user-location-updated.png" });

    
    // const input = await page.waitForSelector("input[id=\"name\"]");
    // let res = await page.evaluate(async (element) => {
    //     console.log(element.value.toLowerCase());
    //     return element.value.toLowerCase() === 'matthew';
    // }, input)
        // await page.$eval("#search-input", (element) => {
    //   element.value = "matthew";
    // });
    // page.keyboard.press('Backspace');
    await page.screenshot({ path: "./screenshots/screenshot_fill_inputs.png" });

    await browser.close(); 
}

e2eTest();