const {test, expect} = require('@playwright/test')

test('My first playwright',async ({page}) => {
    const email = 'anilgadge@yopmail.com';
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3'
    const userName = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const signIn = page.locator('#login');
    const cardTitles = page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client/");
    await userName.fill(email);
    await userPassword.fill('Admin@123');
    await signIn.click();
    //waitfor = used for single element
    //await cardTitles.first().waitFor();
    await page.waitForLoadState('networkidle');// wait until all n/w calls has been done..!!
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    const count = await products.count();
    for(let i=0; i<count; ++i){
        if (await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text='Checkout'").click();
    await page.locator("[placeholder*='Country']").pressSequentially('ind',{delay:100});
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".small [type='text']").first().fill("123");
    await page.locator(".field [type='text']").nth(3).fill("ANIL G");
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log("Get Order ID:", orderId)

    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for(let i=0; i< await rows.count(); ++i)
    {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if(orderId.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
    const orderDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();
    
    }




});
