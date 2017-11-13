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
    this.pageScope.WeApp_Popover_Select = (event) => {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);
      let idx = dataset.idx;

      componentInstance.hide();
      componentInstance.options.onSelect && componentInstance.options.onSelect(idx);
    }
    this.pageScope.WeApp_Popover_TapMask = (event) => {
      let { dataset, componentId, componentData, componentInstance } = this._getComponentByEvent_(event);

      componentInstance.hide();
    }
  }
  _getInnerRect(callback){
    wx.createSelectorQuery()
    .select('#WeApp_Popover_Inner')
    .boundingClientRect((rect) => {
      if (rect){
        callback(rect);
      }else{
        // 处理 rect 获取不到的时候
        setTimeout(() => this._getInnerRect(callback), 100);
      }
    }).exec();
  }
  show(event) {
    let id = event.currentTarget.id;

    if (!id) this._throwError_('event.currentTarget 缺少属性 id');

    let selectorId = `#${id}`;
    let componentData = this._componentData_(this);

    componentData.show = true;

    this._componentData_(this, componentData);

    wx.createSelectorQuery()
    .select(selectorId)
    .boundingClientRect((elemRect) => {
      this._getInnerRect((innerRect) => {
        let leftPos = elemRect.left + elemRect.width / 2 - innerRect.width / 2;
        let topPos = 0;

        if (elemRect.top > innerRect.height){
          topPos = elemRect.top - innerRect.height - 8;
        }else{
          topPos = elemRect.top + elemRect.height;
        }

        componentData.left = parseInt(leftPos);
        componentData.top = parseInt(topPos);
        componentData.setStyle = true;

        this._componentData_(this, componentData);
      });
    }).exec();
  }
  hide(){
    let componentData = this._componentData_(this);

    componentData.show = false;
    componentData.setStyle = false;

    this._componentData_(this, componentData);
  }
}

module.exports = Popover;