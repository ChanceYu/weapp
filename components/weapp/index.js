/*!
 * WeApp v1.0.0 (https://github.com/ChanceYu/weapp)
 * Copyright 2017 ChanceYu.
 * Licensed under the MIT license
 */

import components from './components';

let weapp = {};

for (let attr in components) {
  let componentObject = components[attr];

  if (typeof componentObject === 'function') {
    weapp[attr] = (options) => new componentObject(options);
  }
  else if (typeof componentObject === 'object') {
    Object.defineProperty(componentObject, 'pageScope', {
      get() {
        let pages = getCurrentPages();
        let currPage = pages[pages.length - 1];

        return currPage;
      }
    });
    
    weapp[attr] = componentObject;
  }
}

module.exports = weapp;