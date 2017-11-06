# WeApp
![](https://img.shields.io/badge/language-JavaScript-brightgreen.svg)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 

**微信小程序组件和功能封装（持续更新中...）**

**解决的痛点**：由于小程序和普通网页程序有所区别，组件的调用和使用相对来说更麻烦，此处封装的组件和功能函数是为了使用起来更加的简单，减少麻烦的`data`设置、组件`event`事件绑定、多组件的隔离等问题。为了能够让道友更好地理解组件的使用或集成到自己项目中，此处未使用任何第三方框架来构建，只使用了WeUI样式库和FontAwesome字体图标。几乎零学习成本，如果有什么问题，欢迎提个Issue。

项目中的代码以最新的小程序基础库版本为主，低版本API不做兼容性考虑，如果使用有问题，请使用最新版本基础库，并将微信更新到最新版本。



## 主要内容
* WeApp组件，自定义封装和优化的组件
* common.js，对公共功能函数和小程序API的封装
* 第三方UI展示，方便预览查找，基本不做修改


## 项目预览
![WeApp组件](./assets/images/desc/components.png)


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
* 必须使用`weapp.inject`注入当前页面对象
* 每个组件都必须传入唯一一个`id`，不能与页面`data`中已经包含的字段相同
* 组件模板数据统一使用`data={{ _data_: componentId }}`形式，`componentId`与组件参数`id`必须一致

WeApp组件主要分两种，一种主要是公共类型的组件，页面只使用一次模板调用，如`Toast`。另一种是一个页面可能多次使用，如`Tab`。
使用`weapp.inject`注入当前的页面对象，是为了在每个组件内部可以调用当前的页面对象`this`，我称它为`pageScope`。在组件的内部你会时常看到它的影子，下面是展示`Tab`组件的简单使用，具体示例参考项目内部`pages/weapp/tab`中代码

```html
<!-- wxml -->
<import src="/components/weapp/tab/index.wxml" />

<template is="weapp-tab" data="{{ _data_: oTab1 }}"></template>

<view class="weui-tab__panel">
    <view class="weui-tab__content" hidden="{{oTab1.activeIndex != 0}}">选项一的内容</view>
    <view class="weui-tab__content" hidden="{{oTab1.activeIndex != 1}}">选项二的内容</view>
    <view class="weui-tab__content" hidden="{{oTab1.activeIndex != 2}}">选项三的内容</view>
</view>
```
```javascript
// js
import weapp from '../../../components/weapp/index';

Page({
  onReady() {
    // 注入当前页面对象
    weapp.inject(this);

    // 初始化组件
    weapp.Tab({
      id: 'oTab1',
      list: ['选项1', '选项2', '选项3'],
      onChange(idx) {
        console.log('选项-' + idx);
      }
    });
  }
})
```


## WeApp组件
* Toast 浮动提示
* Tab 选项卡
* CityPicker 城市选择


## 公共方法
* [common.share 页面转发分享](#commonshare-页面转发分享) 
* [common.param 将对象解析成url字符串](#commonparam-将对象解析成url字符串) 
* [common.unparam 将url字符串解析成对象](#commonunparam-将url字符串解析成对象) 


#### common.share 页面转发分享
除去每个页面的繁杂配置，使用起来更加简单高效，支持页面传递参数 options
```javascript
import common from '../../assets/js/common';

Page({
  onShareAppMessage: common.share()
});
```


#### common.param 将对象解析成url字符串
```javascript
import common from '../../assets/js/common';

Page({
  onLoad(){
    let obj = {
      name: 'weapp',
      uid: 8,
      age: 24
    };

    let params = common.param(obj);

    console.log(params); // ?name=weapp&uid=8&age=24
  }
});
```


#### common.unparam 将url字符串解析成对象
与`common.param`使用相反
```javascript
import common from '../../assets/js/common';

Page({
  onLoad(){
    let str = '?name=weapp&uid=8&age=24';

    let obj = common.unparam(str);
  }
});
```


## 第三方UI库使用到
字体图标使用FontAwesome，CSS组件样式使用WeUI

* font-awesome (4.7) <https://github.com/FortAwesome/Font-Awesome>
* weui-wxss <https://github.com/Tencent/weui-wxss>


## License
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 

[MIT](https://opensource.org/licenses/MIT)，享受开源的乐趣。