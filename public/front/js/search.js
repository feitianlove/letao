(function(){
  // 使用localstorage 存取历史记录
  // 模拟先存几条历史记录
  var dd = ['鞋', '草鞋', '阿迪达斯', '耐克']
  for (let i = 0; i < dd.length; i++){
    localStorage.setItem('search', JSON.stringify(dd))
  }
  // 渲染搜索的历史记录
  render()
  function render(){
    var searchData = JSON.parse(localStorage.getItem('search') || '[]')
    var temp = template('template', {'obj': searchData })
    $('.search-content').html(temp)
  }
  // 清空历史记录
  $('.search-content').on('click', '.clear', function(){
    localStorage.removeItem('search')
    render()
  })
  // 清除特定的历史记录
  $('.search-content').on('click', '.history-del', function(){
    // 弹出框
    var id = $(this).data('id')
    mui.confirm('确定要删除记录吗?', '删除记录', ['否', '是'], function(data){
      if (data.index == 1){
        var searchData = JSON.parse(localStorage.getItem('search'))
        searchData.splice(id, 1)
        localStorage.setItem('search', JSON.stringify(searchData))
        render()
      }
    })
  })
  // 搜索添加搜索历史到localStorage
  $('.search-button').on('click', function(){
    // alert($('input[type="search"]').val())
    var text = $('input[type="search"]').val()
    if ($('input[type="search"]').val().trim().length == 0 ){
      return
    }
    storeHistory(text)
    render()
  })
})()