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
  reporter: [['html', { open: 'on-failure' }]], // Generates HTML report
  use: {
    browserName:'chromium',
    headless:true,
    screenshot:'on',
    trace: 'retain-on-failure'

  },
});
module.exports = config;
