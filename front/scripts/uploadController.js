


$(() => {
  const uploadController = {};
  uploadController.dayNumber = '';
  uploadController.dailyData = [
    {
      body: '',
      isbn: '',
      author: '',
      title: '',
      videoLink: '',
      emailIntro: '',
    },
    {
      body: '',
      isbn: '',
      author: '',
      title: '',
      videoLink: '',
      emailIntro: '',
    },
    {
      body: '',
      isbn: '',
      author: '',
      title: '',
      videoLink: '',
      emailIntro: '',
    },
    {
      body: '',
      isbn: '',
      author: '',
      title: '',
      videoLink: '',
      emailIntro: '',
    },
    {
      body: '',
      isbn: '',
      author: '',
      title: '',
      videoLink: '',
      emailIntro: '',
    },
  ];

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

  uploadController.outputResult = function (result) {
    console.log(uploadController.dayNumber);
    uploadController.dailyData[uploadController.dayNumber].body = (result.value);
    uploadController.dailyData[uploadController.dayNumber].isbn = $('#isbnInput').val();
    uploadController.dailyData[uploadController.dayNumber].author = $('#authorInput').val();
    uploadController.dailyData[uploadController.dayNumber].title = $('#bookTitle').val();
    uploadController.dailyData[uploadController.dayNumber].videoLink = 'connect video link here';
    uploadController.dailyData[uploadController.dayNumber].emailIntro = $('#emailIntroInput').val();
    if (parseInt(uploadController.dayNumber, 10) < 4) {
      const nextFile = parseInt(uploadController.dayNumber, 10) + 2;
      uploadController.readFileInput($(`#chapter${nextFile}FileInput`), uploadController.converter);
    }
    console.log(uploadController.dailyData);
  };

  uploadController.converter = function (arrayBuffer) {
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then(uploadController.outputResult)
          .done();
  };

  $(document).ready(() => {
    $('#chapterSubmit').on('click', () => {
      uploadController.readFileInput($('#chapter1FileInput'), uploadController.converter);
    });
  });

  // Disable chapter upload unless metadata is complete
  const metadataInputs = $('#metadata :input');
  metadataInputs.keyup(() => {
    // Check all the inputs for text
    const metadataFilledIn = metadataInputs.toArray()
      .every((el) => $(el).val() !== '');

    $('#chapterInputFieldset').attr('disabled', !metadataFilledIn);
    $('#errorMessage').css('display', metadataFilledIn ? 'none' : '');
  });
});
