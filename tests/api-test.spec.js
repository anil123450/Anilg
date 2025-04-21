const { test, expect, request } = require('@playwright/test');

const loginPayload = { "userEmail": "anilgadge@yopmail.com", "userPassword": "Admin@123" };
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log("Token received:", token);
});

test('Check if Playwright detects tests', async ({ page }) => {

  page.addInitScript(value => {
    window.localStorage.setItem('token',value);
  }, token
);
    await page.goto('https://rahulshettyacademy.com/client');
    
});
