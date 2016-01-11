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
        $('.auth-done').show();
        $('.no-auth').hide();
        cb();
      },
      error: function(xhr, errorType, error) {
        $('.auth-done').hide();
        $('.no-auth').show();
        window.localStorage.removeItem('auth_token');
        //window.location.href = '/auth/login/?next=' + window.location.pathname;
      },
    });
  }

  var getAction = function(status) {
    switch(status) {
      case 'OPEN':
        return 'Close';
      case 'CLOSED':
        return 'Open';
      default:
        return 'Toggle';
    }
  };

  var addDoorEvents = function() {
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
        },
      });
    });

    $('.logout-action a').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      window.localStorage.removeItem('auth_token');
      window.location.href = '/';
    });
  };

  var fetchUserDoors = function() {
    $.ajax({
      type: 'GET',
      headers: {
        'x-auth-token': token,
      },
      url: '/api/door/',
      success: function(data) {
        for (var i in data) {
          var door = data[i];
          $('div.doors').append('<div class="garage-door">' +
            '<div class="garage-door-icon">' +
              '<img src="img/' + door.status.toLowerCase() + '.png" />' +
            '</div>' +
            '<div class="garage-door-info">' +
              '<h2>' + door.name + '</h2>' +
              '<p>' + door.status.toLowerCase() + '</p>' +
            '</div>' +
            '<div class="garage-door-action">' +
              '<a class="pure-button close-action" data-door-id="' + door.id + '" data-door-action="' + getAction(door.status).toLowerCase() + '">' + getAction(door.status) + '</a>' +
            '</div>' +
          '</div>');
        }
        addDoorEvents();
      },
      error: function(xhr, errorType, error) {
        console.log(error);
      },
    });
  };

  check_token(token, function() {
    fetchUserDoors();
    addDoorEvents();
  });
});
