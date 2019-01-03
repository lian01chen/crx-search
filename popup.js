/**
 * 获取当前激活标签
 * @param {*} callback 
 */
function getSelectedTabs(callback) {
  chrome.tabs.getSelected(null, function (tab) {
    callback && Object.prototype.toString.call(callback) === '[object Function]' ? callback(tab) : false
  })
}
getSelectedTabs((tab) => {
  let url = tab.url
  let title = tab.title
  document.querySelector('#url').innerHTML = `当前页面url：${url},<br />当前页面title:${title}<br />`
  parseSearch(url)
})

/**
 * 格式化url所有参数
 * @param {String} url 
 */
function parseSearch(url) {
  if (!url) return null
  let searchStr = url.split('?').length > 1 ? url.split('?')[1] : ''
  let searchList = searchStr && searchStr.split('&')
  let obj = {}
  for (let item of searchList) {
    let tem = item.split('=')
    obj[tem[0]] = tem[1]
  }
  // 设置信息
  $('#item').html('search信息：'+JSON.stringify(obj))
  return obj
}
