(function(){
  function render(id) {
    
    $.ajax({
      url: '/product/queryProductDetail',
      data: {
        id: id
      },
      dataType: 'json',
      timeout: 2000,
      success: function(data){
        console.log(data)
        var temp = template('template', data)
        $('.mui-scroll').html(temp)
        var gallery = mui('.mui-slider');
        gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        // 数字渲染
        });
        mui('.mui-numbox').numbox()
      }
    })
  }
  var id = getQueryString("productId")
  render(id)
  //选择尺码
  $('.lt_main').on('click', '.lt_size span',function(){
    $(this).addClass('current').siblings().removeClass('current')
    var size = $(this).html()
  })
  // 加入购物车
  $('#addCart').on('click', function(){
    var id = getQueryString("productId")
    var num = mui(".mui-numbox").numbox().getValue()
    var size = $(".lt_size span.current").html()
    if (!size) {
      mui.toast('请选择尺码');
      return; 
    }
    $.ajax({
      url: '/cart/addCart',
      type: 'post',
      data: {
        productId: id,
        size: size,
        num: num
      },
      dataType: 'json',
      success: function(data){
        if ("error" in data){
          location.href = 'login.html?reUrl='+location.href;
        } else {
          mui.confirm('添加成功', "温馨提示", ['去购物车', '继续看看'], function(data){
            if (data.index == 0) {
              //去购物车
              location.href = './cart.html';
          }
          })
        }

      }
    })
    console.log(id, num, size)
  })
})()