// @ts-check
import { defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  /*Maximum time one test can run*/
  timeout: 20000, 
    /*Maximum time one test can run*/
  expect:{
    timeout: 5000, 
  },
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],
  use: {
    browserName:'chromium',
    headless:true,

  },
});
module.exports = config;
