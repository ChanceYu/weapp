import icons from '../../../components/libs/font-awesome/icons';

Page({
  data: {
    inputShowed: false,
    inputVal: '',
    icons: icons.slice(0),
    activeIcon: ''
  },
  showInput() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      icons: icons.slice(0),
      inputShowed: false
    });
  },
  clearInput() {
    this.setData({
      icons: icons.slice(0),
      inputVal: ''
    });
  },
  inputTyping(e) {
    let value = e.detail.value;
    let allIcons = icons.slice(0);
    let iconsData = [];

    allIcons.forEach((item, idx) => {
      if (item.indexOf(value) > -1){
        iconsData.push(item);
      }
    });
    
    this.setData({
      icons: iconsData,
      inputVal: value
    });
  },
  handlerSelect(event) {
    this.getIconAndActive(event);
  },
  handlerCopy(event) {
    let icon = this.getIconAndActive(event);

    wx.setClipboardData({
      data: `<text class="fa ${icon}"></text>`,
      success: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 500
        });
      }
    });
  },
  getIconAndActive(event) {
    let icon = event.currentTarget.dataset.icon;

    this.setData({
      activeIcon: icon
    });

    return icon;
  }
})