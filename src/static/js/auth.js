$(function() {
  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(window.location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  $('.garage-door-action a.login').on('click', function() {
    var username = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    var qrcode = $('input[name=qrcode]').val();
    var data;

    if (username && password) {
      data = {
        username: username,
        password: password
      };
    } else if (qrcode) {
      data = {
        qrcode: qrcode
      };
    }

    $.post('/api/auth', data, function(res) {
      window.localStorage.setItem('auth_token', res.token);
      var next = getParameterByName('next');
      if (!next) next = '/';
      window.location.href = next;
    });
  });
});
