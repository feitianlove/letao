(function () {
  var currentPage = 1
  render(currentPage)

  function render(page, pageSize = 5) {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize,
      },
      dataType: 'json',
      timeout: 2000,
      success: function (data) {
        console.log(data)
        var temp = template('categroy2', data)
        $('.two').html(temp)
        var totlePage = Math.ceil(data.total / pageSize)
        // 分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: 1, //当前页
          totalPages: totlePage, //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            render(page)
            currentPage = page
          }
        })
      }
    })
  }

  $.ajax({
    url: '/category/queryTopCategoryPaging',
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      //填充一级分类
      $('.categroy1').html(template('categroy1_list', info));
    }
  })
  // 注册点击事件
  $('.categroy1').on('click', 'li a', function () {
    var text = $(this).text()
    $('.title-text').text(text)
    var id = $(this).data('id')
    $('[name="categoryId"]').val(id)
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  })

  // 单独上传图片到图片服务器
  $('#file').fileupload({
    dataType: 'json', //后台返回数据格式
    //后保存图片成后 回调函数， 
    // e事件对象
    // data 后台保存图片 地址相关的信息 
    done: function (e, data) {
      $('.pic').attr('src', data.result.picAddr)
      $('[name="brandLogo"]').val(data.result.picAddr)
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  })
  // 表单验证
  // 表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-heart'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传品牌logo'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      }
    }
  })
  // 提交
  $('form').on("success.form.bv", function (e) {
    // 阻止默认的表单提交
    e.preventDefault();
    $.ajax({
      url: "/category/addSecondCategory",
      method: 'post',
      data: $('form').serialize(),
      dataType: 'json',
      timeout: 2000,
      success: function (data) {
        $('#add-catagroy').modal('hide')
        render(1)
        $('[name="categoryId"]').val('')
        $('[name="brandName"]').val('')
        $('[name="brandLogo"]').val('')
      }
    })
  })
})()