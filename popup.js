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
  let url = tab.url;
  let title = tab.title;
  $('.sub-txt').html(`title：${title}`);
  $('#url').html(`url：${url}`);
  $('#qrTxt').val(url);
  parseSearch(url);
  createQrCode();
})


/**
 * 格式化url所有参数
 * @param {String} url 
 */
function parseSearch(url) {
  if (!url) return null
  let searchStr = url.split('?').length > 1 ? url.split('?')[1] : ''
  let searchList = searchStr && searchStr.split('&')
  let obj = {}, decodeObj = {};
  for (let item of searchList) {
    let tem = item.split('=')
    obj[tem[0]] = tem[1]
    decodeObj[tem[0]] = decodeText(tem[1])
  }
  // 设置信息
  $('#page-search-obj').html(JSON.stringify(decodeObj));
  return obj
}
/**
 * 当url中某个参数被多次window.encodeURIComponent时，需要多次decode解析
 * @param {String} text 
 */
function decodeText(text) {
  let value = window.decodeURIComponent(text)
  if (value !== window.decodeURIComponent(value)) {
    value = decodeText(value)
  }
  return value
}


/**
 * 将当前输入内容生成二维码
 */
function createQrCode() {
  let linkTxt = $('#qrTxt').val();
  try {
    QRCode.toCanvas(document.getElementById('qrcodeView'), linkTxt, function (err, url) { })
  } catch (error) {
    console.log('createQrCode error:', error);
  }
}

// 文本框内容更新
$('#qrTxt').on('change', createQrCode);

// 更新二维码
$('#nextQr').click(createQrCode);