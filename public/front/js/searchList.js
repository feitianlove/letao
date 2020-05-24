(function(){
  var key = getQueryString()
  function getQueryString(key) {
    var data = decodeURI(location.search).substr(1)
    var key = data.split('=')[1]
    $('.search_input').val(key)
    return key
  }
  // 获取数据
  function render(data){
    $.ajax({
      url: '/product/queryProduct',
      method: 'get',
      data: data,
      timeout: 2000,
      beforeSend: function () {
        $('.lt_product ul').html('<div class="loading"></div>');
      },
      success: function(data){
        console.log(data)
        var temp = template('template',data)
        // console.log(temp)
        setTimeout(function(){
          $('.lt_product ul').html(temp)
        },1000)
      }
    })
  }
  var data = {
    proName: key,
    page: 1,
    pageSize: 100
  }
  render(data)
  // 排序
  $('.price').on('click', function(){
    if ($(this).hasClass('current')) {
      $(this).find('span').toggleClass("mui-icon-arrowup mui-icon-arrowdown")
    } else {
      $(this).addClass('current')
    }
    var price = $(this).find('span').hasClass("mui-icon-arrowup") ? 1 : 2;
    data["price"] = price
    render(data)
  })

  // 商品页面搜索添加记录
  $('.search_btn').on('click', function(){
    var text = $('.search_input').val()
    data["proName"] = text
    render(data)
    storeHistory(text)
  })
})()