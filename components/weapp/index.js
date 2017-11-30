/*!
 * WeApp v1.0.0 (https://github.com/ChanceYu/weapp)
 * Copyright 2017 ChanceYu.
 * Licensed under the MIT license
 */

import components from './components';
import common from '../../assets/js/common';

let weapp = {};

/**
 * 获取当前页面对象
 */
weapp.getCurrentPage = () => {
  let pages = getCurrentPages();
  let currPage = pages[pages.length - 1];

  return currPage;
};

/**
 * 获取当前页面组件实例
 * @param  {String} componentId 组件id
 * @return {Object} 组件实例
 */
weapp.getComponent = (componentId) => {
  let currPage = weapp.getCurrentPage();
  let allComponents = currPage._WeAppComponents_ || {};

  return componentId ? allComponents[componentId] : allComponents;
};

/**
 * 销毁对应组件
 * @param  {String|Array|Object} componentId 组件id | ComponentInstance
 */
weapp.destroy = (componentId) => {
  let res = [];
  let components = this.getComponent();
  let stype = common.type(componentId);

  if (stype === 'String'){
    res.push(componentId);
  } else if (stype === 'Array') {
    res = componentId;
  } else if (stype === 'Object') {
    componentId.destroy && componentId.destroy();
  }

  res.forEach((item) => {
    components[item] && components[item].destroy && components[item].destroy();
  });
};

for (let attr in components) {
  let componentObject = components[attr];

  if (typeof componentObject === 'function') {
    weapp[attr] = (options) => new componentObject(options);
  }
  else if (typeof componentObject === 'object') {
    Object.defineProperty(componentObject, 'pageScope', {
      get() {
        return weapp.getCurrentPage();
      }
    });
    
    weapp[attr] = componentObject;
  }
}

module.exports = weapp;