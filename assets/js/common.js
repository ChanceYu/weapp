/* 公共方法封装 */

const common = {
  /**
   * 将对象解析成url字符串
   * @param {String} obj 参数对象
   * @param {Boolean} unEncodeURI 不使用编码
   */
  param(obj = {}, unEncodeURI) {
    let result = [];

    for (let name of Object.keys(obj)) {
      let value = obj[name];

      result.push(name + '=' + (unEncodeURI ? value : encodeURIComponent(value)));
    }

    if (result.length) {
      return '?' + result.join('&');
    } else {
      return '';
    }
  },
  /**
   * 将url字符串解析成对象
   * @param {String} str 带url参数的地址
   * @param {Boolean} unDecodeURI 不使用解码
   */
  unparam(str = '', unDecodeURI) {
    let result = {};
    let query = str.split('?')[1];

    if (!query) return result;

    let arr = query.split('&');

    arr.forEach((item, idx) => {
      let param = item.split('=');
      let name = param[0];
      let value = param[1] || '';

      if (name) {
        result[name] = unDecodeURI ? value : decodeURIComponent(value);
      }
    });

    return result;
  },
  /**
   * 转发分享
   * @param {String} title 标题
   * @param {String} url 页面地址，默认就是当前页面地址
   */
  share(title = '小程序名称!', url) {
    return () => {
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1];
      let path = '/' + currPage.route;
      let params = common.param(currPage.options, true);

      return {
        title: title,
        path: (url || path) + params
      }
    }
  }
};

module.exports = common;