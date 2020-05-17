(function(){
  // 数据库获取user信息
  var currentPage = 1
  render(currentPage)
  function render (page, pageSize=5){
    $.ajax({
      url: '/user/queryUser',
      method: 'get',
      data: {
        pageSize : pageSize,
        page: page
      },
      dataType: 'json',
      timeout: 2000,
      success: function(data){
        console.log(data)
        var userTemp = template("userTemplate",data)
        $('.userData').html(userTemp)
        totlePage = Math.ceil( data.total / pageSize)
        // 分页功能
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: 1,  //当前页
          totalPages: totlePage,  //总页数
          size:"small", //设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            render(page)
            currentPage = page
          }
        });
      }
    })
  }
  // 和后端操作修改用户的状态
  var currentId = 0
  var isDelete = 0
  $('.userData').on('click','td button',function(){
    currentId = $(this).parent().data('id')
    isDelete = $(this).hasClass('btn-success') ? 1 : 0
  })
  // 后端交互更改
  $('.btm-submit').on('click', function(){
    $.ajax({
      url: '/user/updateUser',
      method: 'post',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      timeout: 2000,
      success: function(data){
        render(currentPage)
        $('#qjy').modal('hide')
      }
    })
  })
})()