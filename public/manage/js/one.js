(function(){
  var currentPage = 1
  render(currentPage)
  function render(page, pageSize=5) {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      method: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      dataType: 'json',
      timeout: 2000,
      success: function(data){
        console.log(data)
        var temp = template('categroy1', data)
        $('.one').html(temp)
        totlePage = Math.ceil( data.total / pageSize)
        console.log(totlePage)
        // 分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: 1,  //当前页
          totalPages: totlePage,  //总页数
          size:"small", //设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            render(page)
            currentPage = page
          }
        })
      }
    })
  }
  // 表单验证
  $('form').bootstrapValidator({
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-heart'
  },
    fields: {
      categroyname: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      }
    }
  })
  // 提交
  $('form').on("success.form.bv", function( e ) {
    // 阻止默认的表单提交
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      method: 'post',
      data: $('form').serialize(),
      dataType: 'json',
      timeout: 2000,
      success: function(data){
        $('#add-catagroy').modal('hide')
        render(currentPage)
      }
    })
  })
})()