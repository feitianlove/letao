(function(){
  $('form').bootstrapValidator({
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-heart'
  },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度为2-6位'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度位6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })
  // 重置
  $('.bt-reset').on('click',function(){
    $('form').data('bootstrapValidator').resetForm();
  })
  // 登陆
  // 2. 进行登录请求
  //    通过 ajax 进行登录请求

  // 表单校验插件有一个特点, 在表单提交的时候进行校验
  // 如果校验成功, 继续提交, 需要阻止这次默认的提交, 通过 ajax 进行请求提交
  // 如果校验失败, 默认会阻止提交
  $('form').on("success.form.bv", function( e ) {
    // 阻止默认的表单提交
    e.preventDefault();
    $.ajax({
      type: 'post',
      data: $('form').serialize(),
      url: '/employee/employeeLogin',
      dataType: 'json',
      success: function(data){
        var message = ''
        console.log(data)
        if ('error' in data){
          console.log(data.message)
          if (data.error == 1000){
            message = '用户名不存在'
            $('form').data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
          } else{
            message = '密码错误'
            $('form').data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
          }
        }
        else{
          location.href = './index.html'
        }

      }
    })
  })
})()