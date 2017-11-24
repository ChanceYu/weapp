import WeAppComponent from '../weappComponent';

class Popover extends WeAppComponent {
  /**
   * 默认参数
   * @param {String} id 组件id
   * @param {String} pageSelector 整个页面最外层容器的CSS的选择器
   * @param {Function} onSelect 选择每项的回调函数
   * @param {String} dir 箭头方向
   */
  static defaultOptions = {
    id: 'WeApp_Popover',
    pageSelector: '.page',
    onSelect: null,
    dir: 'auto'
  }
  constructor(options) {
    super(Object.assign({}, Popover.defaultOptions, options), Popover);
  }
  static listeners = {
    WeApp_Popover_Select(event) {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let idx = dataset.idx;

      componentInstance.hide();

      if (typeof componentInstance.options.onSelect === 'function') {
        componentInstance.options.onSelect(idx);
      }
    },
    WeApp_Popover_TapMask(event) {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentInstance.hide();
    }
  }
  /**
   * 获取整个页面的宽高等位置信息
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
   * 获取弹出菜单的宽高等位置信息
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
   * 计算元素所支持的箭头方向和位置
   * @param  {Object} boxRect 弹出菜单的宽高等位置信息
   * @param  {Object} viewRect 页面滚动区域的宽高等位置信息
   * @param  {Object} elemRect 点击元素的宽高等位置信息
   * @param  {Object} pageRect 整个页面的宽高等位置信息
   * @return {Object} result 当前元素支持显示的箭头方向
   */
  _getSupportOffset(boxRect, viewRect, elemRect, pageRect){
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
    let TTop = elemEdgeTop + elemHeight + 8;

    if (elemEdgeBottom > boxTotalHeight
      && elemCenterRight > boxWidth + 16){
      result.supports.push('tl');
      result.tl = {};
      result.tl.left = elemCenterLeft - 16;
      result.tl.top = TTop;
    }

    // tr
    if (elemEdgeBottom > boxTotalHeight
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('tr');
      result.tr = {};
      result.tr.left = elemCenterLeft - boxWidth + 16;
      result.tr.top = TTop;
    }

    // tc
    if (elemEdgeBottom > boxTotalHeight
      && elemCenterRight > boxWidth + 16
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('tc');
      result.tc = {};
      result.tc.left = elemCenterLeft - boxWidth / 2;
      result.tc.top = TTop;
    }


    // rt
    let RLeft = elemEdgeLeft - boxTotalWidth;

    if (elemEdgeLeft > boxTotalWidth
      && elemCenterBottom > boxHeight + 16) {
      result.supports.push('rt');
      result.rt = {};
      result.rt.left = RLeft;
      result.rt.top = elemCenterTop - 16;
    }

    // rb
    if (elemEdgeLeft > boxTotalWidth
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('rb');
      result.rb = {};
      result.rb.left = RLeft;
      result.rb.top = elemCenterTop - boxHeight + 16;
    }

    // rc
    if (elemEdgeLeft > boxTotalWidth
      && elemCenterBottom > boxHeight + 16
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('rc');
      result.rc = {};
      result.rc.left = RLeft;
      result.rc.top = elemCenterTop - boxHeight / 2;
    }


    // bl
    let BTop = elemEdgeTop - boxHeight - 8;

    if (elemEdgeTop > boxTotalHeight
      && elemCenterRight > boxWidth + 16) {
      result.supports.push('bl');
      result.bl = {};
      result.bl.left = elemCenterLeft - 16;
      result.bl.top = BTop;
    }

    // br
    if (elemEdgeTop > boxTotalHeight
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('br');
      result.br = {};
      result.br.left = elemCenterLeft - boxWidth + 16;
      result.br.top = BTop;
    }

    // bc
    if (elemEdgeTop > boxTotalHeight
      && elemCenterRight > boxWidth + 16
      && elemCenterLeft > boxWidth + 16) {
      result.supports.push('bc');
      result.bc = {};
      result.bc.left = elemCenterLeft - boxWidth / 2;
      result.bc.top = BTop;
    }


    // lt
    let LLeft = elemEdgeLeft + elemWidth + 8;

    if (elemEdgeRight > boxTotalWidth
      && elemCenterBottom > boxHeight + 16) {
      result.supports.push('lt');
      result.lt = {};
      result.lt.left = LLeft;
      result.lt.top = elemCenterTop - 16;
    }

    // lb
    if (elemEdgeRight > boxTotalWidth
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('lb');
      result.lb = {};
      result.lb.left = LLeft;
      result.lb.top = elemCenterTop - boxHeight + 16;
    }

    // lc
    if (elemEdgeRight > boxTotalWidth
      && elemCenterBottom > boxHeight + 16
      && elemCenterTop > boxHeight + 16) {
      result.supports.push('lc');
      result.lc = {};
      result.lc.left = LLeft;
      result.lc.top = elemCenterTop - boxHeight / 2;
    }

    for(let attr in result){
      let item = result[attr];

      if (item.top) {
        result[attr].top = parseInt(item.top);
      }
      if (item.left) {
        result[attr].left = parseInt(item.left);
      }
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

        let supportResult = this._getSupportOffset(boxRect, viewRect, elemRect, pageRect);

        // console.log(supportResult)

        let supportDir = dir || this.options.dir;

        if (supportResult.supports.indexOf(supportDir) === -1) {
          if (supportResult.supports.length === 0){
            this._throwError_('Popover组件不支持该元素位置显示');
          } else {
            supportDir = supportResult.supports[0];
          }
        }

        componentData.left = supportResult[supportDir].left;
        componentData.top = supportResult[supportDir].top;
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