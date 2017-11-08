# WeApp
![](https://img.shields.io/badge/language-JavaScript-brightgreen.svg)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 

**微信小程序组件和功能封装（持续更新中...）**

*解决的痛点*：由于小程序和普通网页程序有所区别，组件的调用和使用相对来说更麻烦，此处封装的组件和功能函数是为了使用起来更加的简单，**减少麻烦的`data`设置、组件`event`事件绑定、多组件的隔离等问题**。为了能够让道友更好地理解组件的使用或集成到自己项目中，此处未使用任何第三方框架来构建，只使用了WeUI样式库和FontAwesome字体图标。几乎零学习成本，如果有什么问题，欢迎提个Issue。

项目中的代码以最新的小程序基础库版本为主，低版本API不做兼容性考虑，如果使用有问题，请使用最新版本基础库，并将微信更新到最新版本。


## 主要内容
* [WeApp组件，自定义封装和优化的组件](#weapp组件)
* [common.js，对公共功能函数和小程序API的封装](#公共方法)
* [第三方UI展示，方便预览查找，基本不做修改](#第三方ui库使用到)


## 目录结构
```
├─assets ---------- 静态资源文件
│  ├─images ---------- 公共图片
│  └─js -------------- 公共的JS
│     └─common ---------- 公共方法函数封装
├─components ------ 自定义组件和第三方组件
│  ├─libs ------------ 第三方库
│  └─weapp ----------- WeApp组件
├─pages ----------- 页面目录
│  ├─index ----------- 首页
│  ├─libs ------------ 第三方库页面
│  └─weapp ----------- WeApp组件页面
├─app.js
├─app.json
├─app.wxss
└─README.md
```


## 主要特点
* 组件调用简单
* 面向对象组件开发，可配置、可扩展、可复用
* 使用ES6代码特性
* 小程序API的二次封装，如转发分享
* 公共方法的封装，如URL参数转换


## 使用注意
* 每个组件都必须传入唯一一个`id`，不能与页面`data`中已经包含的字段相同
* 组件模板数据统一使用`data={{ _data_: componentId }}`形式，`componentId`与组件参数`id`必须一致，默认每个组件都有一个id

下面是展示`Tab`组件的简单使用，具体示例参考项目内部`pages/weapp/tab`中代码。其它类型组件使用基本和这种调用方式类似。

```html
<!-- wxml -->
<import src="/components/weapp/tab/index.wxml" />

<template is="weapp-tab" data="{{ _data_: oTab1 }}"></template>
```
```javascript
// js
import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    // 初始化组件
    weapp.Tab({
      id: 'oTab1',
      list: ['选项1', '选项2', '选项3']
    });
  }
})
```


## WeApp组件
* [Toast 浮动提示](#weapptoast)
* [Tab 选项卡](#weapptab)
* [CityPicker 城市选择](#weappcitypicker)
* [Loader 加载更多-暂无数据](#weapploader)


## 公共方法
* [common.share 页面转发分享](#commonshare)
* [common.param 将对象解析成url字符串](#commonparam)
* [common.unparam 将url字符串解析成对象](#commonunparam)


---------


### weapp.Toast
浮动提示，普遍在移动开发中使用的Toast组件，与小程序的showToast不同
###### 参数
- `title`提示信息
- `delay`自动关闭时间，单位毫秒，默认: 1500
- `onHide`关闭之后回调
###### 方法
- `show`显示提示
- `hide`关闭提示
###### 使用
```javascript
weapp.Toast.show([title], [delay], [onHide]);
```


### weapp.Tab
选项卡
###### 参数
- `list`选项卡标题
- `activeIndex`选中的索引，默认: 0
- `className`主题样式，默认: ''，可传入`weapp-tab`或其它自定义样式
- `onChange`切换的回调，参数index索引
###### 方法
- `select`激活选项卡，传入参数index激活的索引
###### 使用
```javascript
let ActivityTab = weapp.Tab({
  list: ['活动1', '活动2'],
  className: 'weapp-tab',
  onChange(idx) {
    console.log('活动-' + idx);
  }
});

// 调用方法
ActivityTab.select(1);
```


### weapp.CityPicker
城市选择
###### 参数
- `region`提示信息
- `onChange`切换的回调，参数region
###### 使用
```javascript
weapp.CityPicker({
  onChange(region){
    console.log(region)
  }
});
```


### weapp.Loader
加载更多、暂无数据提示
###### 参数
- `iconType`小程序icon组件的type类型，默认: `search`
- `status`当前的状态，可选值: `loading`加载中、`nomore`没有更多、`empty`暂无数据，默认: `loading`
- `emptyTxt`暂无数据提示文字，默认: 暂无数据
- `loadingTxt`加载中提示文字，默认: 正在加载
- `noMoreTxt`没有更多提示文字，默认: 没有更多数据了
###### 方法
- `setStatus`设置当前状态，传入参数status，可选值: `loading`、`nomore`、`empty`
###### 使用
```javascript
let oLoader = weapp.Loader({
  iconType: 'search',
  status: 'loading',
  emptyTxt: '暂无数据',
  loadingTxt: '正在加载',
  noMoreTxt: '没有更多数据了'
});

// 调用方法
oLoader.setStatus('empty');
```


---------


### common.share
页面转发分享，除去每个页面的繁杂配置，使用起来更加简单高效，支持页面传递参数 options
```javascript
import common from '../../assets/js/common';

Page({
  onShareAppMessage: common.share()
});
```


### common.param
将对象解析成url字符串
```javascript
import common from '../../assets/js/common';

let obj = {
  name: 'weapp',
  uid: 8,
  age: 24
};

let params = common.param(obj);

console.log(params); // ?name=weapp&uid=8&age=24
```


### common.unparam
将url字符串解析成对象，与`common.param`使用相反
```javascript
import common from '../../assets/js/common';

let str = '?name=weapp&uid=8&age=24';

let obj = common.unparam(str);
```


## 第三方UI库使用到
字体图标使用FontAwesome，CSS组件样式使用WeUI

* font-awesome (4.7) <https://github.com/FortAwesome/Font-Awesome>
* weui-wxss <https://github.com/Tencent/weui-wxss>


## 项目预览
![WeApp组件](./assets/images/desc/components.png)


## License
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 

[MIT](https://opensource.org/licenses/MIT)，享受开源的乐趣。