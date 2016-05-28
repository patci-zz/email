const express = require('express');
const multer = require('multer');

const PORT = process.env.PORT || 3000;
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const auth = require('./back/auth.js');

app.use(auth);
app.use(express.static('./front/'));

app.post('/convert_file', upload.single('data'), (req, res) => {
  console.log(req.body, req.file);
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
