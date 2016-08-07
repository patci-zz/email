$(() => {
  const uploadController = {};
  uploadController.dayNumber = '';
  uploadController.dayInteger = '';

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
  };

  // converts doc.x to html
  uploadController.converter = function (arrayBuffer) {
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then(uploadController.outputResult)
          .done();
  };

  // Trigger initial file read on submit.
  $(document).ready(() => {
    $('#chapterSubmit').on('click', () => {
      uploadController.readFileInput($('#chapter1FileInput'), uploadController.converter);
    });
    $('#chapterSubmit').on('click', () => {
      consistent.isbn = $('#isbnInput').val();
      consistent.author = $('#authorInput').val();
      consistent.title = $('#bookTitle').val();
      consistent.intro = $('#emailIntroInput').val();
      consistent.bannerImgLink = $('#bannerImg').val();
      consistent.bannerHrefLink = $('#bannerHref').val();
      consistent.bannerDescription = $('#bannerDesc').val();
    });
  });

  // // Disable chapter upload unless metadata is complete
  // const metadataInputs = $('#metadata :input');
  // metadataInputs.keyup(() => {
  //   // Check all the inputs for text
  //   const metadataFilledIn = metadataInputs.toArray()
  //     .every((el) => $(el).val() !== '');

  //   $('#chapterInputFieldset').attr('disabled', !metadataFilledIn);
  //   $('#errorMessage').css('display', metadataFilledIn ? 'none' : '');
  // });
});
