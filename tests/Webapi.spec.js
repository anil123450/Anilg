const {test,expect,request} = require('@playwright/test');
const loginPayload = {"userEmail":"anilgadge@yopmail.com","userPassword":"Admin@123"};
let token;

test.beforeAll(async() => 
    {

      const apiContext = await request.newContext();
      const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
      data:loginPayload
      })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log ('Token for Login:', token)

});


test('@Client App login', async ({ page }) => {
  page.addInitScript(value =>{
  window.localStorage.setItem('token', value);
  },token);
  const productName = 'zara coat 3';
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
     if (await products.nth(i).locator("b").textContent() === productName) {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
     }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
});
