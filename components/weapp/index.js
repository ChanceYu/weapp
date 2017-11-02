/**
 * 引入封装的组件
 */
let components = {
  Toast: require('./toast/index')
};

let weapp = {};

weapp.inject = (pageScope) => {
  for (let attr in components) {
    let componentObject = components[attr];

    if (typeof componentObject === 'function') {
      // 类
      weapp[attr] = (pageScope) => new componentObject(pageScope);
    }
    else if (typeof componentObject === 'object') {
      // 单例
      componentObject.pageScope = pageScope;
      weapp[attr] = componentObject;
    }
  }
};

module.exports = weapp;