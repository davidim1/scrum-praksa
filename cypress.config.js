const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://vivifyscrum-stage.com",
    baseAPI: "https://api.vivifyscrum-stage.com/api/v2",
    env: {
      EXTERNAL_EMAIL: "jozomotika@gmail.com",
      EXTERNAL_PASSWORD: "motikaJozo1"
    },
    watchForFileChanges: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
