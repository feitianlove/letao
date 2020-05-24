mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,
})

function storeHistory(text) {
  var searchData = JSON.parse(localStorage.getItem('search') || '[]')
  // 判断是否大于8条
  console.log(searchData)
  if (searchData.length > 8) {
    searchData.pop()
  }
  // 判断是否重复
  var index = searchData.indexOf(text)
  console.log(index)
  if (index > -1) {
    searchData.splice(index, 1)
  }
  // 添加
  searchData.unshift(text)
  localStorage.setItem('search', JSON.stringify(searchData))
  location.href = "./searchList.html?searchKey=" + text
}
function getQueryString(key) {
  var data = decodeURI(location.search).substr(1)
  console.log(data)
  var key = data.split('=')[1]
  $('.search_input').val(key)
  return key
}