import icons from '../../../components/libs/font-awesome/icons';

Page({
  data: {
    icons: icons,
    activeIcon: ''
  },
  handlerSelect(event) {
    var icon = event.currentTarget.dataset.icon;

    this.setData({
      activeIcon: icon
    });
  },
  handlerCopy(event) {
    var icon = event.currentTarget.dataset.icon;

    this.setData({
      activeIcon: icon
    });

    wx.setClipboardData({
      data: `fa ${icon}`,
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 500
        });
      }
    });
  }
})