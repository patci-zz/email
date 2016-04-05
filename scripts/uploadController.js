// (function(module) {
  var mammoth = require('mammoth');
  var uploadController = {};

  function passwordProtect() {
    var password = prompt("This site is password protected");
    switch(password) {
      case null:
      return;
    };
    switch(isNaN(parseInt(prompt1))) {
      case true:
      promptMe();
      break;
      default:
      document.getElementById("promptOutput").innerHTML = prompt1;
      break;
    };
  }
  //var password = prompt('This site is password protected:');

// As the user fills out form, cache the inputs
  $('.form').on('change', uploadController.cacheUserInput);
// We can access these values anytime (ex: `uploadController.cacheUserInput().isbn`)
  uploadController.cacheUserInput = function() {
    return {
      isbn: $('#isbn').val(),
      authorName: $('#author-name').val(),
      bookTitle: $('#book-title').val(),
      chapterOneTitle: $('#chapter-one-title').val(),
      chapterTwoTitle: $('#chapter-two-title').val(),
      chapterThreeTitle: $('#chapter-three-title').val(),
      chapterFourTitle: $('#chapter-four-title').val(),
      chapterFiveTitle: $('#chapter-five-title').val(),
      emailIntro: $('textarea').val()
    };
  }

    $('.upload-button').on('change', function() {
      // TODO: call mammoth to convert DOCX file passed in
    });

  // module.uploadController = uploadController;
// })(window);
