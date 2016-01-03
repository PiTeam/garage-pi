$(function() {
  $('.garage-door-action a').on('click', function() {
    var doorId = $(this).data('door-id');
    var doorAction = $(this).data('door-action');
    $.post('/api/door/' + doorId + '/' + doorAction, function(response) {
      console.log(response);
    })
  });
});
