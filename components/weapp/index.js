/*!
 * WeApp v1.0.0 (https://github.com/ChanceYu/weapp)
 * Copyright 2017 ChanceYu.
 * Licensed under the MIT license
 */

let components = {
  Toast: require('./toast/index'),
  Tab: require('./tab/index'),
  CityPicker: require('./cityPicker/index'),
  Loader: require('./loader/index')
};

let weapp = {};

weapp.inject = (pageScope) => {
  for (let attr in components) {
    let componentObject = components[attr];

    if (typeof componentObject === 'function') {
      // 类
      weapp[attr] = (options) => new componentObject(pageScope, options);
    }
    else if (typeof componentObject === 'object') {
      // 单例
      componentObject.pageScope = pageScope;
      weapp[attr] = componentObject;
    }
  }
};

module.exports = weapp;