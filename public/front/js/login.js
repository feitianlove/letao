(function(){
  $('#loginBtn').on('click', function(){
    var username = $('#username').val()
    var password = $('#password').val()
    if (username.trim().length === 0) {
      mui.toast('请输入用户名');
      return
    }
    if (password.trim().length === 0 ){
      mui.toast('请输入密码')
      return
    }
    $.ajax({
      url: '/user/login',
      type: 'post',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function(data){
        if ("error" in data){
          mui.toast('用户名和密码有误')
        }
        var data = decodeURI(location.search).substr(1)
        var url = data.substr(6)
        console.log(url)
        if (url){
          location.href = url
        } else{
          location.href = './user.html'
        }
      }
    })
  })
})()