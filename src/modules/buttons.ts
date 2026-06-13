import $ from 'jquery';

$(document).ready(function () {
  $('.buttons-section .btn').prop('disabled', false);
  $('#disable-buttons').on('change', function () {
    const isDisabled = $(this).is(':checked');
    $('.buttons-section .btn').prop('disabled', isDisabled);
  });
});
