const puppeteer = require("puppeteer-core");

(async ()=>{
    const browser = await puppeteer.launch({
       product: "chrome", executablePath: "/usr/bin/chromium",
       headless: true
   });

    const page = (await browser.pages())[0];
    const ip=process.argv[2];
    const passwd=process.argv[3];  
    
    await page.goto(`http://${ip}/main.cgi?page=app.html#cat=status-and-support_restart`);

    await page.waitForSelector('input[id=login_Password]');
    await page.waitForSelector('a[id="btn_login"]');
    await page.$eval('#login_Password', el => el.value = passwd);

    await page.click("#btn_login");

    await page.waitForSelector('a[id="btn_restart"]');
    await page.click("#btn_restart");

    await page.waitForSelector('a[id="popUp_RestartConfirmationMessage_Button_Apply"]');
    await page.click("#popUp_RestartConfirmationMessage_Button_Apply");

    await browser.close();
})();
