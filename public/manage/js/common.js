// NProgress.start()
// ajaxSend() 当页面中有ajax发送是会触发 
// ajaxSuccess() 当页面中有ajax成功响应后就会触发 
// ajaxComplete() 当页面中有ajax完成时会触发 
// ajaxError() 当页面中有ajax请求出错时会触发 
// ajaxStart() 当页面的第一个ajax请求发送时触发  1次
// ajaxStop() 当页面最后一个ajax请求完成是触发  1次
$(document).ajaxStart(function(){
  NProgress.start()
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done()
  },500)
})
// 后台首页index.js，二级菜单显示
$('.category').on('click',function(){
  console.log(1)
  $('.second').slideToggle();
})
// 侧边栏切换
$('.icon_menu').on('click',function(){
  $('body').toggleClass('toggle')
})
// 退出log
$('.btn-logout').on('click', function(){
  $.ajax({
    url: '/employee/employeeLogout',
    method: 'get',
    dataType: 'json',
    timeout: 2000,
    success: function (data) {
      location.href = 'login.html'
    }
  })
})