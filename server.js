var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var fs = require('fs');

app.use(express.static('./'));

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
