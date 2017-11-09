import WeAppComponent from '../weappComponent';

class Loader extends WeAppComponent {
  static defaultOptions = {
    id: 'WeApp_Loader',
    iconType: 'search',
    status: 'loading',// loading, nomore, empty
    emptyTxt: '暂无数据',
    loadingTxt: '正在加载',
    noMoreTxt: '没有更多数据了'
  }
  constructor(options) {
    super(Object.assign({}, Loader.defaultOptions, options));
  }
  setStatus(status) {
    let componentData = this._componentData_(this);
    
    componentData.status = status || '';

    this._componentData_(this, componentData);
  }
}

module.exports = Loader;