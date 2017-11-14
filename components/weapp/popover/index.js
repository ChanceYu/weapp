import WeAppComponent from '../weappComponent';

class Popover extends WeAppComponent {
  static defaultOptions = {
    id: 'WeApp_Popover',
    onSelect: null
  }
  constructor(options) {
    super(Object.assign({}, Popover.defaultOptions, options));

    this._injectEvents();
  }
  _injectEvents() {
    let pageScope = this.pageScope;

    pageScope.WeApp_Popover_Select = (event) => {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let idx = dataset.idx;

      componentInstance.hide();

      if (typeof componentInstance.options.onSelect === 'function') {
        componentInstance.options.onSelect(idx);
      }
    }
    pageScope.WeApp_Popover_TapMask = (event) => {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentInstance.hide();
    }
  }
  /**
   * 弹出菜单的宽高等位置信息
   */
  _getInnerRect(){
    let getRect = (callback) => {
      wx.createSelectorQuery()
        .select('#WeApp_Popover_Inner')
        .boundingClientRect((rect) => {
          if (rect) {
            callback(rect);
          } else {
            // 处理 rect 获取不到的时候
            setTimeout(() => getRect(callback), 100);
          }
        }).exec();
    }

    return new Promise((resolve, reject) => {
      getRect((res) => {
        resolve(res);
      });
    });
  }
  /**
   * 获取页面滚动区域的宽高等位置信息
   */
  _getViewRect(){
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .selectViewport()
        .scrollOffset((res) => {
          resolve(res);
        }).exec();
    });
  }
  /**
   * 获取点击元素的宽高等位置信息
   * @param {String} selectorId 元素id
   */
  _getElemRect(selectorId){
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .select(selectorId)
        .boundingClientRect((res) => {
          resolve(res);
        }).exec();
    });
  }
  /**
   * 计算最终显示的位置
   * @param {Object} innerRect 弹出菜单的宽高等位置信息
   * @param {Object} viewRect 页面滚动区域的宽高等位置信息
   * @param {Object} elemRect 点击元素的宽高等位置信息
   */
  _calcOffset(innerRect, viewRect, elemRect){
    let leftPos = elemRect.left + elemRect.width / 2 - innerRect.width / 2;
    let pointTop = viewRect.scrollTop + elemRect.top;
    let topPos = 0;

    if (pointTop > innerRect.height) {
      topPos = pointTop - innerRect.height - 8;
    } else {
      topPos = pointTop + elemRect.height;
    }

    return {
      left: parseInt(leftPos),
      top: parseInt(topPos)
    }
  }
  /**
   * 显示
   * @param {Event} event 事件对象，点击的元素
   */
  show(event) {
    let id = event.currentTarget.id;

    if (!id) this._throwError_('event.currentTarget 缺少属性 id');

    let selectorId = `#${id}`;
    let componentData = this._componentData_(this);

    componentData.show = true;

    this._componentData_(this, componentData);

    Promise.all([this._getInnerRect(), this._getViewRect(), this._getElemRect(selectorId)])
      .then((result) => {
        let innerRect = result[0];
        let viewRect = result[1];
        let elemRect = result[2];

        let pos = this._calcOffset(innerRect, viewRect, elemRect);

        componentData.left = pos.left;
        componentData.top = pos.top;
        componentData.setStyle = true;

        this._componentData_(this, componentData);
    });
  }
  /**
   * 隐藏
   */
  hide(){
    let componentData = this._componentData_(this);

    componentData.show = false;
    componentData.setStyle = false;

    this._componentData_(this, componentData);
  }
}

module.exports = Popover;