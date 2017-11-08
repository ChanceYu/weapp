/*!
 * WeApp v1.0.0 (https://github.com/ChanceYu/weapp)
 * Copyright 2017 ChanceYu.
 * Licensed under the MIT license
 */
import WeAppComponent from './weappComponent';

let components = {
  Toast: require('./toast/index'),
  Tab: require('./tab/index'),
  CityPicker: require('./cityPicker/index'),
  Loader: require('./loader/index')
};

let weapp = {};

for (let attr in components) {
  let componentObject = components[attr];

  if (typeof componentObject === 'function') {
    // 类
    weapp[attr] = (options) => new componentObject(options);
  }
  else if (typeof componentObject === 'object') {
    // 单例
    ((componentObject) => {
      for (let method in componentObject) {
        if (typeof componentObject[method] === 'function') {
          let methodCallback = componentObject[method];

          componentObject[method] = function(){
            WeAppComponent._injectPageScope_(componentObject);

            let args = Array.prototype.slice.call(arguments);

            methodCallback.apply(componentObject, args);
          }
        }
      }
    })(componentObject);

    weapp[attr] = componentObject;
  }
}

module.exports = weapp;