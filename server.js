var express = require('express'),
    port = process.env.PORT || 3000,
    app = express();

var fs = require('fs');
var path = require('path');

var auth = require(__dirname + '/scripts/auth.js');

app.use(auth);
app.use(express.static('./'));

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
