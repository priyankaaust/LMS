const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    apiUrl: 'http://localhost:5000',
    frontendUrl: 'http://localhost:3000'
  },
});
