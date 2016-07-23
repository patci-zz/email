
let ab;

$(() => {
  const uploadController = {};

  // Upload a file and its metadata to the server to be converted
  uploadController.uploadFile = function (file, metadata) {
    // Create formdata
    const data = new FormData();

    // Add file to data
    data.set('data', file);

    // Add metadata
    for (const key in metadata) { // eslint-disable-line
      if (metadata.hasOwnProperty(key)) {
        data.set(key, metadata[key]);
      }
    }
  };

  uploadController.readFileInput = function (event, callback) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (loadEvent) {
      const arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  };

  uploadController.outputResult = function (result) {
    console.log(result.value);
  };

  $(document).ready(() => {
    $('#chapter1FileInput').on('change', (event) => {
      uploadController.readFileInput(event, (arrayBuffer) => {
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then(uploadController.outputResult)
          .done();
      });
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
