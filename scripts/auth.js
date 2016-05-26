const auth = require('basic-auth');

const admins = {
  admin: { password: process.env.EMAIL_TOKEN },
};

module.exports = function (req, res, next) {
  const user = auth(req);
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }
  return next();
};
