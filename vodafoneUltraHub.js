const puppeteer = require('puppeteer-core'); // v22.0.0 or later

async function restartRouter(ip, passwd){

    const browser = await puppeteer.launch({
        product: "chrome", executablePath: "/usr/bin/chromium",
        headless: true
    });
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1117,
            height: 941
        })
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        startWaitingForEvents();
        await targetPage.goto(`http://${ip}/login.lp`);
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#login-txt-pwd'),
            targetPage.locator('::-p-xpath(//*[@id=\\"login-txt-pwd\\"])'),
            targetPage.locator(':scope >>> #login-txt-pwd')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 101.5,
                y: 22.609375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#login-txt-pwd'),
            targetPage.locator('::-p-xpath(//*[@id=\\"login-txt-pwd\\"])'),
            targetPage.locator(':scope >>> #login-txt-pwd')
        ])
            .setTimeout(timeout)
            .fill(passwd);
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Log In)'),
            targetPage.locator('#login-btn-logIn'),
            targetPage.locator('::-p-xpath(//*[@id=\\"login-btn-logIn\\"])'),
            targetPage.locator(':scope >>> #login-btn-logIn'),
            targetPage.locator('::-p-text(Log In)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 45.46875,
                y: 14.109375,
              },
            });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Settings) >>>> ::-p-aria([role=\\"generic\\"])'),
            targetPage.locator('li:nth-of-type(5) span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"Settings\\"]/span)'),
            targetPage.locator(':scope >>> li:nth-of-type(5) span')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 51.46875,
                y: 16,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Configuration)'),
            targetPage.locator('#configuration'),
            targetPage.locator('::-p-xpath(//*[@id=\\"configuration\\"])'),
            targetPage.locator(':scope >>> #configuration'),
            targetPage.locator('::-p-text(Configuration)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 77.5,
                y: 19,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Restart[role=\\"button\\"])'),
            targetPage.locator('#config-btn-restart'),
            targetPage.locator('::-p-xpath(//*[@id=\\"config-btn-restart\\"])'),
            targetPage.locator(':scope >>> #config-btn-restart')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 44.65625,
                y: 15,
              },
            });
    }

    {
      const targetPage = page;
      await puppeteer.Locator.race([
          targetPage.locator('::-p-aria([role=\\"dialog\\"]) >>>> ::-p-aria(Apply)'),
          targetPage.locator('#restart-btn-apply'),
          targetPage.locator('::-p-xpath(//*[@id=\\"restart-btn-apply\\"])'),
          targetPage.locator(':scope >>> #restart-btn-apply')
      ])
          .setTimeout(timeout)
          .click({
            offset: {
              x: 51.375,
              y: 18.5,
            },
          });
  }

    await browser.close();

}

module.exports=restartRouter;
