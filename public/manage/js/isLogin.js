$.ajax({
  url: '/employee/checkRootLogin',
  method: 'get',
  dataType: 'json',
  timeout: 2000,
  success: function(data){
    console.log(data)
    if(data.error == 400) {
      location.href = 'login.html'
    }
  }
})