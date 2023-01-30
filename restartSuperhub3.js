const puppeteer = require("puppeteer-core");

async function restartRouter(ip, passwd){
    const browser = await puppeteer.launch({
       product: "chrome", executablePath: "/usr/bin/chromium",
       headless: true
   });
    const page = (await browser.pages())[0]

    await page.goto(`http://${ip}`, { waitUntil: 'domcontentloaded' })
    await page.type('#Password', passwd)
    await page.click('.submitBtn')
    await page.waitForSelector('div[id="Wiztext"]')
    await page.goto(`http://${ip}/?device_reboot&mid=ReloadAndReboot`, { waitUntil: 'networkidle0' }) 
    await page.click('.BtnReboot')       
    await page.waitForSelector('input[id="enableRestartBtn"]');
    await page.click('#enableRestartBtn')   
    await browser.close()
}

module.exports=restartRouter;