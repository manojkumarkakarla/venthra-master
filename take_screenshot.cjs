const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log("Navigating to site...");
  await page.setViewport({width: 1280, height: 800});
  await page.goto('https://alisherdigitalacademy.vercel.app', {waitUntil: 'networkidle2'});
  
  console.log("Taking desktop screenshot...");
  await page.screenshot({path: 'src/assets/skaarvi-new-1.jpg', type: 'jpeg', quality: 90});
  
  console.log("Taking mobile screenshot...");
  await page.setViewport({width: 390, height: 844});
  await page.screenshot({path: 'src/assets/skaarvi-new-2.jpg', type: 'jpeg', quality: 90});
  
  await browser.close();
  console.log("Done!");
})();
