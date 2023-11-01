const puppeteer = require("puppeteer");

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://ficasuarez.com/");

    for (let i = 0; i < 50; i++) {
        const button = await page.$("button[type=\"submit\"]");

        if (button) {
            const oldValue = await page.$eval('.number', el => el.textContent);
            console.log(`Valor antigo: ${oldValue}`);

            console.log(`Encontrei o botão! (${i + 1} vezes)`);

            await button.click().then(() => {
                console.log(`Cliquei! (${i + 1} vezes)`);
            }).catch((e) => {
                console.log("Erro: ", e);
            });

            await delay(2000);

            const newValue = await page.$eval('.number', el => el.textContent);
            console.log(`Valor novo: ${newValue}`);

        } else {
            console.log("Não encontrei o botão");
        }
    }

    await browser.close();
})();
