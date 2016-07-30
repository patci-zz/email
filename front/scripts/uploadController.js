


$(() => {
  const uploadController = {};
  uploadController.dayNumber = '';
  uploadController.weeklyData = [];

  uploadController.DayData = function (body, isbn, author, title, audioLink, emailIntro, bannerInput) {
    this.body = body;
    this.isbn = isbn;
    this.author = author;
    this.title = title;
    this.audioLink = audioLink;
    this.emailIntro = emailIntro;
    this.bannerInput = bannerInput;
  };

  // reads file. Sets dayNumber for element tracking.
  uploadController.readFileInput = function (inputElement, callback) {
    if (inputElement) {
      uploadController.dayNumber = inputElement.parent()[0].getAttribute('data-day');
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
    console.log(uploadController.dayNumber);
    const day = new uploadController.DayData(
      result.value,
      $('#isbnInput').val(),
      $('#authorInput').val(),
      $('#bookTitle').val(),
      'connect audio link here',
      $('#emailIntroInput').val(),
      $('#bannerInput').val()
    );
    uploadController.weeklyData.push(day);

    if (parseInt(uploadController.dayNumber, 10) < 4) {
      const nextFile = parseInt(uploadController.dayNumber, 10) + 2;
      uploadController.readFileInput($(`#chapter${nextFile}FileInput`), uploadController.converter);
    }
    console.log(uploadController.weeklyData);
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
