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

    // Send it to the server
    $.ajax({
      type: 'POST',
      url: '/convert_file',
      data: data,
      processData: false,
      contentType: false,
    }).done((response) => {
      console.log(response);
    });
  };

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
