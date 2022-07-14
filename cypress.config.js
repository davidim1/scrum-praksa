const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://vivifyscrum-stage.com',
    env: {
      EXTERNAL_EMAIL: "jozomotika@gmail.com",
      EXTERNAL_PASSWORD: "motikaJozo1"
    },


    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
