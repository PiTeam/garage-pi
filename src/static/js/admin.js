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

  function loadUsers(token) {
    $.ajax({
      type: 'GET',
      headers: {
        'x-auth-token': token,
      },
      url: '/api/admin/user',
      success: function(users) {
        var usersSelect = $('select.users');
        if (usersSelect.length === 0) return;

        usersSelect.empty();
        usersSelect.append('<option>Select the user to remove</option>');
        for (var i in users) {
          usersSelect.append('<option data-id="' + users[i].id + '">' + users[i].name + '</option>');
        }
      },
    });
  }

  var addAdminEvents = function() {
    $('a.delete-user').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      var userId = $('select.users option').not(function() { return !this.selected }).data('id');

      if (!userId) return;

      $.ajax({
        type: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
        data: {
          userId: userId,
        },
        url: '/api/admin/user',
        success: function(data) {
          loadUsers(token);
        },
        error: function(xhr, errorType, error) {
          console.log(error);
        },
      });
    });
  };

  check_admin_token(token, function() {
    console.log('admin logged in');
    loadUsers(token);
    addAdminEvents();
  });
});
