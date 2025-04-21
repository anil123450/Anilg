const {test, expect} = require('@playwright/test')

test('My first playwright',async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    //css , xpath 
    // type and fill - latest version of playwright type is deprecated
    await page.locator('#username').fill('anilgadge@yopmail.com');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.')
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signIn.click();

    // console.log(await page.locator('.card-body a').first().textContent());
    // console.log(await page.locator('.card-body a').nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);
    
});

test('UI Controls',async ({page}) => {
    const userName = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const signIn = page.locator('#login');
    const dropDown = page.locator("select.form-control");
    const selectValue = page.locator("select.form-control").inputValue();
    const selectText =  page.locator("select.form-control").textContent();
    const radioButtons = page.locator("radiotextsty");
    const documentLink = page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropDown.selectOption('Consultant');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    // console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').check();
    // console.log(await page.locator('#terms').isChecked());
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await (page.locator('#terms')).isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');
    
});


test('Verify document link', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userEmail');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all([

            context.waitForEvent('page'),
            documentLink.click(),
        ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').textContent());
});