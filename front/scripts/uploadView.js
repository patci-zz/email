$(function () {
  "use strict";
  const uploadView = {};
  // logic for form labels when a user changes files
  uploadView.updateLabel = function () {
    if ($(this).val() !== '') {
      $(this).prev().text($(this).val().slice(($(this).val().lastIndexOf('/')) + 1));
    } else {
      const chapterNumber = $(this).attr('id').slice(7, 8);
      $(this).prev().text(`Upload: Chapter ${chapterNumber} DOCX`);
    }
  };

  $('.form-file').on('change', uploadView.updateLabel);
  $('.form-directory').on('change', uploadView.updateLabel);
});
