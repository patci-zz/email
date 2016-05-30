const fs = require('fs');
const path = require('path');

const handlebars = require('handlebars');

function compileTemplate(name) {
  const templatePath = path.join(__dirname, './views/', name);
  const templateString = fs.readFileSync(templatePath, {
    encoding: 'utf8',
  });
  return handlebars.compile(templateString);
}

handlebars.registerPartial({
  chapterInput: compileTemplate('chapterInput.handlebars'),
});

module.exports = {
  index: compileTemplate('index.handlebars'),
};
