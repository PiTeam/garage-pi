$(function() {

  var token = window.localStorage.getItem('auth_token');

  function check_token(token, cb) {
    $.ajax({
      type: 'GET',
      headers: {
        'x-auth-token': token,
      },
      url: '/api/auth',
      success: function() {
        cb();
      },
      error: function(xhr, errorType, error) {
        window.localStorage.removeItem('auth_token');
        window.location.href = '/auth?next=' + window.location.pathname;
      },
    });
  }

  check_token(token, function() {
    $('.garage-door-action a').on('click', function() {
      var doorId = $(this).data('door-id');
      var doorAction = $(this).data('door-action');
      $.ajax({
        type: 'POST',
        headers: {
          'x-auth-token': token,
        },
        url: '/api/door/' + doorId + '/' + doorAction,
        success: function(data) {
          console.log('sucess', data);
        },
        error: function(xhr, errorType, error) {
          console.log(error);
        }
      });
    });

    $('.auth-action a').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      window.localStorage.removeItem('auth_token');
      window.location.href = '/';
    });
  });
});
