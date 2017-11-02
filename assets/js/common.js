/* 公共方法和配置 */

const common = {
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

      return {
        title: title,
        path: url || path
      }
    }
  }
};

module.exports = common;