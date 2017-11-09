/*!
 * WeApp v1.0.0 (https://github.com/ChanceYu/weapp)
 * Copyright 2017 ChanceYu.
 * Licensed under the MIT license
 */

let components = {
  Toast:      require('./toast/index'),
  Tab:        require('./tab/index'),
  CityPicker: require('./cityPicker/index'),
  Loader:     require('./loader/index')
};

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