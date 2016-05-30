const path = require('path');

const express = require('express');
const multer = require('multer');

const auth = require('./auth');
const templates = require('./templates');

const PORT = process.env.PORT || 3000;
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Simple authentication
app.use(auth);

app.get('/', (req, res) => {
  res.send(templates.index({
    chapters: [1, 2, 3, 4, 5],
  }));
});

// Convert word doc to html
app.post('/convert_file', upload.single('data'), (req, res) => {
  console.log(req.body, req.file);
  res.send('Hello World!');
});

app.use(express.static(path.join(__dirname, '../front')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
