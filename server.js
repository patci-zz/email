const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const auth = require('./scripts/auth.js');

app.use(auth);
app.use(express.static('./'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
