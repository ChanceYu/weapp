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
    wx.createSelectorQuery().select('#WeApp_Popover_Inner').boundingClientRect((rect) => {
      if (rect){
        callback(rect);
      }else{
        // hack to get rect when rect is null
        setTimeout(() => this._getInnerRect(callback), 100);
      }
    }).exec();
  }
  show(event) {
    let id = event.currentTarget.id;
    let selectorId = `#${id}`;
    let componentData = this._componentData_(this);

    componentData.show = true;

    this._componentData_(this, componentData);

    wx.createSelectorQuery().select(selectorId).boundingClientRect((rectElem) => {

      this._getInnerRect((rectInner) => {
        let leftPos = rectElem.left + rectElem.width / 2 - rectInner.width / 2;
        let topPos = 0;

        if (rectElem.top > rectInner.height){
          topPos = rectElem.top - rectInner.height - 8;
        }else{
          topPos = rectElem.top + rectElem.height;
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