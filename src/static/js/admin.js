$(function() {

  var token = window.localStorage.getItem('auth_token');
  console.log(token);
  
  function check_admin_token(token, cb) {
    $.ajax({
      type: 'GET',
      headers: {
        'x-auth-token': token,
      },
      url: '/api/auth/admin',
      success: function() {
        $('.auth-done').show();
        $('.no-auth').hide();
        cb();
      },
      error: function(xhr, errorType, error) {
        $('.auth-done').hide();
        $('.no-auth').show();
        //window.localStorage.removeItem('auth_token');
        //window.location.href = '/auth/login/?next=' + window.location.pathname;
      },
    });
  }

  function loadUsers(token, cb) {
    $.ajax({
      type: 'GET',
      headers: {
        'x-auth-token': token,
      },
      url: '/api/user',
      success: function(data) {
        cb(data);
      },
    });
  }

  var usersSelect = $('select.users');

  if (usersSelect.length > 0) {
    loadUsers(token, function(users) {
      usersSelect.empty();
      usersSelect.append('<option>Select the user to remove</option>');
      for (var i in users) {
        usersSelect.append('<option value="' + users[i].id + '">' + users[i].name + '</option');
      }
    });
  }

  check_admin_token(token, function() {
    console.log('admin logged in');
  });
});
