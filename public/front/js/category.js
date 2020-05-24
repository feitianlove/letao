(function(){
  renderCategory_1()
  function renderCategory_1(){
    $.ajax({
      url: "/category/queryTopCategory",
      method: 'get',
      dataType: 'json',
      timeout: 2000,
      success: function(data){
        var temp = template('category-1',data)
        $('.lt-nav ul').html(temp)
      }
    })
  }
  renderCategory_2(1)
  function renderCategory_2(id){
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      timeout: 2000,
      success: function(data){
        var temp = template('category-2',data)
        $('.lt-content ul').html(temp)
      }
    })
  }
  // 绑定点击事件
  $('.lt-nav ul').on('click', 'li', function(){
    // css样式
    $(this).addClass('active').siblings().removeClass('active')
    var id = $(this).data('id')
    renderCategory_2(id)

  })
})()