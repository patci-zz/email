


$(() => {
  const uploadController = {};
  uploadController.dayNumber = '';
  uploadController.dynamicData = {};


  uploadController.Static = function (isbn, author, title, emailIntro, bannerInput, bannerHref, bannerDesc) {
    this.isbn = isbn;
    this.author = author;
    this.title = title;
    this.emailIntro = emailIntro;
    this.bannerInput = bannerInput;
    this.bannerHref = bannerHref;
    this.bannerDesc = bannerDesc;
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
    const num = uploadController.dayNumber;
    const dayBody = `day${num}Body`;
    const dayAudio = `day${num}Audio`;
    uploadController.dynamicData[dayBody] = result.value;
    uploadController.dynamicData[dayAudio] = $(`#chapter${num}AudioBook`).val();
    if (parseInt(uploadController.dayNumber, 10) < 5) {
      const nextFile = parseInt(uploadController.dayNumber, 10) + 1;
      uploadController.readFileInput($(`#chapter${nextFile}FileInput`), uploadController.converter);
    } else {
      console.log(uploadController.dynamicData);
      console.log(uploadController.staticData);
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
      uploadController.staticData = new uploadController.Static(
        $('#isbnInput').val(),
        $('#authorInput').val(),
        $('#bookTitle').val(),
        $('#emailIntroInput').val(),
        $('#bannerInput').val(),
        $('#bannerHref').val(),
        $('#bannerDesc').val()
      );
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
