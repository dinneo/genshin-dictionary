const { devices } = require("@playwright/test");

module.exports = {
  testMatch: /.*(pwtest)\.(js|ts|mjs)/,
  workers: 1, // disable concurrent tests

  projects: [
    {
      name: "Chromium - Desktop",
      use: {
        ...devices["Desktop Chrome"],
        // ▼▼ Debug Options ▼▼
        // headless: false,
        // launchOptions: {
        //   slowMo: 50,
        // },
      },
    },
    {
      name: "Chrome - Mobile",
      use: devices["Pixel 5"],
    },
    {
      name: "Safari - Mobile",
      use: {
        ...devices["iPhone 12"],
        isMobile: false, // Workaround: without this, "search by tag" test fails
      },
    },
    {
      name: "Firefox - Desktop",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
  ],

  webServer: {
    command: "npm start",
    url: "http://localhost:3000/ja/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:3000/ja/",
  },
};
