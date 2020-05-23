(function () {
  var currentPage = 1
  var pic_arr = []
  render(currentPage)
  function render(page, pageSize = 5) {
    $.ajax({
      url: '/product/queryProductDetailList',
      method: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      timeout: 2000,
      success: function (data) {
        console.log(data)
        var temp = template('template', data)
        $('.table-prouct').html(temp)
        totlePage = Math.ceil(data.total / pageSize)
        setPage(totlePage)
      }
    })
  }

  function setPage(totleCount) {
    // 分页功能
    $("#pagintor").bootstrapPaginator({
      bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
      currentPage: 1, //当前页
      totalPages: totleCount, //总页数
      size: "small", //设置控件的大小，mini, small, normal,large
      onPageClicked: function (event, originalEvent, type, page) {
        render(page)
        currentPage = page
      }
    });
  }

  // 二级分类渲染
  $.ajax({
    url: '/category/querySecondCategoryPaging',
    method: 'get',
    data: {
      pageSize: 99,
      page: 1
    },
    dataType: 'json',
    timeout: 2000,
    success: function (data) {
      console.log(data)
      var temp = template('category-2', data)
      console.log(temp)
      $('.two').html(temp)
    }
  })
  // 二级分类绑定点击事件,更新隐藏域标签
  $('.two').on('click', 'a', function () {
    $('.category-name').html($(this).html())
    $('#category-id').val($(this).data('id'))
    $('#form1').data('bootstrapValidator').updateStatus('brandId', 'VALID');

  })
  // 文件上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // if ($('.pic-box img').length >= 3) {
      //   $('.pic-box img').eq(2).remove()
      // }
      // var img = document.createElement('img')
      // img.src = data.result.picAddr
      // img.width = '100'
      // $('.pic-box').prepend(img)
      $('.pic-box').prepend('<img src="' + data.result.picAddr + '" height="100" >');
      pic_arr.unshift(data.result);
      if (pic_arr.length > 3 ){
        pic_arr.pop()
        $('.pic-box img:last-child').remove();
      }
      console.log(pic_arr)
      if (pic_arr.length == 3) {
        $('#form1').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  });
  // 表单验证
  $('form').bootstrapValidator({
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      "brandId": {
        validators: {
          notEmpty: {
            message: '二级分类不能为空'
          }
        }
      },
      "proName": {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      },
      "proDesc": {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      },
      "num": {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      },
      "size": {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d{1}-[1-9]\d{1}$/ ,
            message: "格式固定30-40"
          }
        }
      },
      "oldPrice": {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      },
      "price": {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      },
      "picStatus": {
        validators: {
          notEmpty: {
            message: '图片必须上传三张'
          }
        }
      }
    }
  })
  // 提交数据
      //7-表单验证通过后，向后台发送ajax请求， 添加商品数据
      $('#form1').on('success.form.bv', function (e) {
        e.preventDefault(); //阻止默认行为 
        //处理数据
        var str = $('#form1').serialize();
        //把数组中三张图片 的数据转出json字符串，拼接在查询字符串后面
        str += '&' + 'picArr=' + JSON.stringify(pic_arr);
        // console.log(str);
        console.log(str)
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: str,
            dataType: 'json',
            success: function (info) {
                console.log(info); 
                //添加成功后
                // 1-隐藏模态框
                $('#add-product').modal('hide');
                // 2-重新渲染第一页
                currentPage = 1;
                render();
                // 3- 表单重置验证样式 和 数据 
                $('#form1').data('bootstrapValidator').resetForm(true);
                // 4-手动重置 图片列表 和 下拉列表 
                $('.pic-box').empty(); //清空盒子内部
                $('.title-text').text('请选择二级分类');
                // 5-数组重置 
                picArr = []; //把本次添加数据清除，避免影响下次判断 

            }
        });
    })
})()