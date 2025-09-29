// bin/server.js
const app = require('../src/app');  // Import the app configuration
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
