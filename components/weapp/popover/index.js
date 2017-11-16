import WeAppComponent from '../weappComponent';

class Popover extends WeAppComponent {
  static defaultOptions = {
    id: 'WeApp_Popover',
    pageSelector: '.page',
    onSelect: null,
    dir: 'auto'
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
   * 整个页面的宽高等位置信息
   */
  _getPageRect() {
    let getRect = (callback) => {
      wx.createSelectorQuery()
        .select(this.options.pageSelector)
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
      getRect((res) => resolve(res));
    });
  }
  /**
   * 获取页面滚动区域的宽高等位置信息
   */
  _getViewRect() {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .selectViewport()
        .scrollOffset((res) => {
          resolve(res);
        }).exec();
    });
  }
  /**
   * 弹出菜单的宽高等位置信息
   */
  _getBoxRect(){
    let getRect = (callback) => {
      wx.createSelectorQuery()
        .select('#WeApp_Popover_Box')
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
      getRect((res) => resolve(res));
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
   * 查看元素所支持的箭头方向和位置
   * @param {Object} boxRect 弹出菜单的宽高等位置信息
   * @param {Object} viewRect 页面滚动区域的宽高等位置信息
   * @param {Object} elemRect 点击元素的宽高等位置信息
   * @param {Object} pageRect 整个页面的宽高等位置信息
   */
  _supportOffset(boxRect, viewRect, elemRect, pageRect){
    let result = {
      supports: []
    };
    // page
    let pageWidth = pageRect.width;
    let pageHeight = pageRect.height;

    // view 
    let viewTop = viewRect.scrollTop;

    // box
    let boxWidth = boxRect.width;
    let boxHeight = boxRect.height;
    let boxTotalWidth = boxWidth + 8;
    let boxTotalHeight = boxHeight + 8;

    // elem
    let elemWidth = elemRect.width;
    let elemHeight = elemRect.height;
    let elemTop = elemRect.top;
    let elemLeft = elemRect.left;

    // point
    let pointTop = viewTop + elemTop;

    let elemCenterLeft = elemLeft + elemWidth / 2;
    let elemCenterRight = pageWidth - elemCenterLeft;
    let elemCenterTop = pointTop + elemHeight / 2;
    let elemCenterBottom = pageHeight - elemCenterTop;

    let elemEdgeLeft = elemLeft;
    let elemEdgeRight = elemCenterRight - elemWidth / 2;
    let elemEdgeTop = pointTop;
    let elemEdgeBottom = elemCenterBottom - elemHeight / 2;

    // tl
    if (elemEdgeBottom > boxTotalHeight
      && elemCenterRight > boxWidth + 16){
      result.supports.push('tl');
      result.tl = {};
      result.tl.left = elemCenterLeft - 16;
      result.tl.top = elemEdgeTop + elemHeight + 8;
    }

    // tr
    if (elemEdgeBottom > boxTotalHeight
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('tr');
      result.tr = {};
      result.tr.left = elemCenterLeft - boxWidth + 16;
      result.tr.top = elemEdgeTop + elemHeight + 8;
    }

    // tc
    if (elemEdgeBottom > boxTotalHeight
      && elemCenterRight > boxWidth + 16
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('tc');
      result.tc = {};
      result.tc.left = elemCenterLeft - boxWidth / 2;
      result.tc.top = elemEdgeTop + elemHeight + 8;
    }

    // rt
    if (elemEdgeLeft > boxTotalWidth
      && elemCenterBottom > boxHeight + 16) {
      result.supports.push('rt');
      result.rt = {};
      result.rt.left = elemEdgeLeft - boxTotalWidth;
      result.rt.top = elemCenterTop - 16;
    }

    // rb
    if (elemEdgeLeft > boxTotalWidth
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('rb');
      result.rb = {};
      result.rb.left = elemEdgeLeft - boxTotalWidth;
      result.rb.top = elemCenterTop - boxHeight + 16;
    }

    // rc
    if (elemEdgeLeft > boxTotalWidth
      && elemCenterBottom > boxHeight + 16
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('rc');
      result.rc = {};
      result.rc.left = elemEdgeLeft - boxTotalWidth;
      result.rc.top = elemCenterTop - boxHeight / 2;
    }

    // bl
    if (elemEdgeTop > boxTotalHeight
      && elemCenterRight > boxWidth + 16) {
      result.supports.push('bl');
      result.bl = {};
      result.bl.left = elemCenterLeft - 16;
      result.bl.top = elemEdgeTop - boxHeight - 8;
    }

    // br
    if (elemEdgeTop > boxTotalHeight
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('br');
      result.br = {};
      result.br.left = elemCenterLeft - boxWidth + 16;
      result.br.top = elemEdgeTop - boxHeight - 8;
    }

    // bc
    if (elemEdgeTop > boxTotalHeight
      && elemCenterRight > boxWidth + 16
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('bc');
      result.bc = {};
      result.bc.left = elemCenterLeft - boxWidth / 2;
      result.bc.top = elemEdgeTop - boxHeight - 8;
    }

    // lt
    if (elemEdgeRight > boxTotalWidth
      && elemCenterBottom > boxHeight + 16) {
      result.supports.push('lt');
      result.lt = {};
      result.lt.left = elemEdgeLeft + elemWidth + 8;
      result.lt.top = elemCenterTop - 16;
    }

    // lb
    if (elemEdgeRight > boxTotalWidth
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('lb');
      result.lb = {};
      result.lb.left = elemEdgeLeft + elemWidth + 8;
      result.lb.top = elemCenterTop - boxHeight + 16;
    }

    // lc
    if (elemEdgeRight > boxTotalWidth
      && elemCenterBottom > boxHeight + 16
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('lc');
      result.lc = {};
      result.lc.left = elemEdgeLeft + elemWidth + 8;
      result.lc.top = elemCenterTop - boxHeight / 2;
    }

    return result;
  }
  /**
   * 显示
   * @param {Event|String} event 事件对象（来源于点击的元素），或者传入元素的id
   * @param {String} dir 箭头方向，tl tc tr rt rc rb bl bc br lt lc lb
   */
  show(event, dir) {
    let id = '';

    if(typeof event === 'string'){
      id = event;
    }else{
      id = event.currentTarget.id;
    }

    if (!id) this._throwError_('event.currentTarget 缺少属性 id');

    let selectorId = `#${id}`;
    let componentData = this._componentData_(this);

    componentData.left = 0;
    componentData.top = 0;
    componentData.show = true;

    this._componentData_(this, componentData);

    Promise.all([this._getBoxRect(), this._getViewRect(), this._getElemRect(selectorId), this._getPageRect()])
      .then((result) => {
        let boxRect = result[0];
        let viewRect = result[1];
        let elemRect = result[2];
        let pageRect = result[3];

        let offsetPos = this._supportOffset(boxRect, viewRect, elemRect, pageRect);

        // console.log(offsetPos)

        let supportDir = dir || this.options.dir;

        if (offsetPos.supports.indexOf(supportDir) === -1) {
          supportDir = offsetPos.supports[0];
        }

        componentData.left = offsetPos[supportDir].left;
        componentData.top = offsetPos[supportDir].top;
        componentData.dir = supportDir;
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