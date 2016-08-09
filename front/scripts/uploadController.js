$(() => {
  const tidy = require('htmltidy2').tidy,
      fs = require('fs');
  const uploadController = {};
  uploadController.dayNumber = '';
  uploadController.dayInteger = '';
  uploadController.destinationDirectory = '';

  // reads file. Sets dayNumber for element tracking.
  uploadController.readFileInput = function (inputElement, callback) {
    if (inputElement) {
      uploadController.dayNumber = inputElement.parent()[0].getAttribute('data-day');
      uploadController.dayInteger = inputElement.parent()[0].getAttribute('data-int');
      const file = inputElement[0].files[0];
      const reader = new FileReader();
      reader.onload = function (loadEvent) {
        const arrayBuffer = loadEvent.target.result;
        callback(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // populates daily objects
  uploadController.outputResult = function (result) {
    const num = uploadController.dayNumber;
    const int = uploadController.dayInteger;
    const body = `chapterBody${num}`;
    const audio = `audioChap${num}Link`;

    dynamic[body] = result.value;
    dynamic[audio] = $(`#chapter${int}AudioBook`).val();

    if (parseInt(uploadController.dayInteger, 10) < 5) {
      const nextFile = parseInt(uploadController.dayInteger, 10) + 1;
      uploadController.readFileInput($(`#chapter${nextFile}FileInput`), uploadController.converter);
    } else {
      console.log(dynamic);
      console.log(consistent);
    }
    exposeBuildWrite();
  };

  // converts doc.x to html
  uploadController.converter = function (arrayBuffer) {
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then(uploadController.outputResult)
          .done();
  };

  // verifies that the chose file is a docx file
  uploadController.docxVerifier = function (fileName) {
    const extension = fileName.split('.')[1];
    if (extension === 'docx') return true;
  };

  // enables the submit button if all requird fields are populated
  uploadController.submitEnable = function () {
    // checks destination directory field
    const downloadField = $('#downloadTo').val();
    // checks author title and isbn fields
    const requiredForm = function () {
      const formArray = $('.required-form').toArray()
      .every((el) => $(el).val() !== '');
      return (formArray);
    };
    // checks docx fields
    const requiredDocx = function () {
      const docxArray = $('.form-file').toArray()
      .every((el) => uploadController.docxVerifier($(el).val()));
      return (docxArray);
    };
    // enables submit button
    if (downloadField && requiredForm() && requiredDocx()) {
      $('#chapterSubmit').prop('disabled', false);
      $('#chapterSubmit').css('background-color', 'limegreen');
      $('#chapterSubmit').hover(function () {
        $(this).css('background-color', 'limegreen');
        $(this).css('background-color', 'limegreen');
      });
    } else {
      $('#chapterSubmit').prop('disabled', true);
      $('#chapterSubmit').css('background-color', 'yellow');
      $('#chapterSubmit').hover(function () {
        $(this).css('background-color', 'yellow');
        $(this).css('background-color', 'yellow');
      });
    }
  };

  // Trigger initial file read on submit.
  $(document).ready(() => {
    $('#chapterSubmit').on('click', () => {
      uploadController.readFileInput($('#chapter1FileInput'), uploadController.converter);
    });
    // Populate consistent object
    $('#chapterSubmit').on('click', () => {
      consistent.isbn = $('#isbnInput').val();
      consistent.author = $('#authorInput').val();
      consistent.title = $('#bookTitle').val();
      consistent.intro = $('#emailIntroInput').val();
      consistent.bannerImgLink = $('#bannerImg').val();
      consistent.bannerHrefLink = $('#bannerHref').val();
      consistent.bannerDescription = $('#bannerDesc').val();
    });
    // sets destination directory property changes color
    $('#downloadTo').on('change', function () {
      const downloadDir = $(this).val();
      uploadController.destinationDirectory = downloadDir;
      if ($(this).val() !== '') {
        $(this).prev().css('background-color', 'limegreen');
      } else {
        $(this).prev().css('background-color', 'yellow');
      }
      uploadController.submitEnable();
    });
    // changes color for author, title, isbn fields
    $('.required-form').on('change', function () {
      console.log('val', $(this).val());
      if ($(this).val() !== '') {
        $(this).css('background-color', 'limegreen');
      } else {
        $(this).css('background-color', 'yellow');
      }
      uploadController.submitEnable();
    });
    // verifies correct file type and changes color for docx fields
    $('.form-file').on('change', function () {
      console.log('val', $(this).val());
      if ($(this).val() !== '' && uploadController.docxVerifier($(this).val())) {
        $(this).prev().css('background-color', 'limegreen');
      } else {
        $(this).prev().css('background-color', 'yellow');
      }
      uploadController.submitEnable();
    });
  });

  function exposeBuildWrite() {
    const template1 = dayOneCompile(consistent, dynamic),
          template1Web = dayOneWebCompile(consistent, dynamic),
          template2 = dayTwoCompile(consistent, dynamic),
          template2Web = dayTwoWebCompile(consistent, dynamic),
          template3 = dayThreeCompile(consistent, dynamic),
          template3Web = dayThreeWebCompile(consistent, dynamic),
          template4 = dayFourCompile(consistent, dynamic),
          template4Web = dayFourWebCompile(consistent, dynamic),
          template5 = dayFiveCompile(consistent, dynamic);

    const templates = [template1, template1Web,
                     template2, template2Web,
                     template3, template3Web,
                     template4, template4Web,
                     template5,
                    ];
    templates.forEach( function(currentTemplate) {
      let html = '';
      // this concatenated mess sets up a nice dynamic file name for fs.writeFile:
      let fileName = consistent.title.replace(/\s/g,'-') + '-' + currentTemplate.name + '.html';
      // add directory path to file name:
      fileName = uploadController.destinationDirectory + '/' + fileName;

      // the true build compiling begins here:
      for (var props in currentTemplate) {
        // since adding a name property for the new file only, do not include that in the html:
        if(props !== 'name') html += currentTemplate[props];
      }
      // clean up the structure of the html so it isn't all on one line:
      tidy(html, function(err, htmlTidy) {
        if (err) throw err;
        fs.writeFile(fileName, htmlTidy, () => {
          if (err) throw err;
        });
      });
    });
  }
});
