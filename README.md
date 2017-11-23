<div align="center">
  <img width="360" src="assets/images/logo.png" alt="weapp" />
  <br>

  <a href="javascript:;"><img src="https://img.shields.io/badge/language-JavaScript-brightgreen.svg" /></a>
  <a href="https://opensource.org/licenses/mit-license.php"><img src="https://img.shields.io/badge/license-MIT-blue.svg" /></a>

  <p><strong>微信小程序组件和功能封装（持续更新中...）</strong></p>
  <h1></h1>
</div>


*解决的痛点*：由于小程序和普通网页程序有所区别，组件的调用和使用相对有点麻烦。此处封装的组件和功能函数是为了使用起来更加的简单，**减少麻烦的`data`设置、组件`event`事件绑定、组件的隔离与复用等问题**。此处未使用任何第三方框架来构建，只使用了WeUI样式库和FontAwesome字体图标。**几乎零学习成本**，如果有什么问题，欢迎提个Issue。

需要开启微信开发者工具中的ES6转ES5功能，项目中的代码以最新的小程序基础库版本为主，低版本API不做兼容性考虑。如果使用有问题，请使用最新版本基础库，并将微信更新到最新版本。

## 项目预览
![weapp组件](./assets/images/desc/components.gif)


## 主要内容
* [weapp组件，自定义封装和优化的组件](#weapp组件)
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
│  └─weapp ----------- weapp组件
├─pages ----------- 页面目录
│  ├─index ----------- 首页
│  ├─libs ------------ 第三方库页面
│  └─weapp ----------- weapp组件页面
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
* 个别组件的模板`template`一个页面只需要使用一次，id参数可以省略（使用默认），目前此类组件有：`Toast`、`Popover`、`Toptip`

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


## weapp组件
* [Toast 浮动提示](#weapptoast)
* [Tab 选项卡](#weapptab)
* [CityPicker 城市选择](#weappcitypicker)
* [Loader 加载更多-暂无数据](#weapploader)
* [Popover 弹出菜单](#weapppopover)
* [Toptip 顶部提示](#weapptoptip)
* [CalendarPicker 日历选择](#weappcalendarpicker)


## 公共方法
* [common.share 页面转发分享](#commonshare)
* [common.param 将对象解析成url字符串](#commonparam)
* [common.unparam 将url字符串解析成对象](#commonunparam)
* [common.navigateTo 保留当前页面，跳转到应用内的某个页面](#commonnavigateto)
* [common.redirectTo 关闭当前页面，跳转到应用内的某个页面](#commonnavigateto)
* [common.switchTab 跳转到tabBar页面，并关闭其他所有非tabBar页面](#commonnavigateto)
* [common.reLaunch 关闭所有页面，打开到应用内的某个页面](#commonnavigateto)


---------


### weapp.Toast
浮动提示，普遍在移动开发中使用的Toast组件，与小程序的showToast不同
###### 参数
- `title`提示信息
- `delay`自动关闭的延迟时间，单位毫秒，默认: `1500`
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
- `activeIndex`选中的索引，默认: `0`
- `className`主题样式，默认为空，可传入`weapp-tab`或其它自定义样式
- `onChange`切换的回调，参数index索引
###### 方法
- `select`激活选项卡，传入参数index索引
###### 使用
```javascript
let ActivityTab = weapp.Tab({
  list: ['活动1', '活动2'],
  className: 'weapp-tab',
  onChange(idx) {
    console.log('活动-' + idx);
  }
});

// 选择第二个（索引为1）
ActivityTab.select(1);
```


### weapp.CityPicker
城市选择
###### 参数
- `region`提示信息
- `onChange`切换的回调，参数region选择的区域信息
- `onSetLabel`修改显示的文字，必须返回要显示的字符串内容，参数region
###### 使用
```javascript
weapp.CityPicker({
  onChange(region){
    console.log(region)
  },
  onSetLabel(region){
    return '您选择的是：' + region.join(', ');
  }
});
```


### weapp.Loader
加载更多、暂无数据提示，通常配合下拉列表使用
###### 参数
- `iconType`小程序icon组件的type类型，默认: `search`
- `status`当前的状态，可选值: `loading`加载中、`nomore`没有更多、`empty`暂无数据，默认: `loading`
- `emptyTxt`暂无数据提示文字，默认: `暂无数据`
- `loadingTxt`加载中提示文字，默认: `正在加载`
- `noMoreTxt`没有更多提示文字，默认: `没有更多数据了`
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

// 设置成暂无数据状态
oLoader.setStatus('empty');
```


### weapp.Popover
弹出菜单，最多12个可支持的箭头方位，满足绝大部分场景
###### 参数
- `list`菜单列表
- `pageSelector`整个页面最外层容器的CSS的选择器，默认为`.page`
- `onSelect`选择每项的回调，参数index索引
- `dir`箭头方位，可选值`tl tc tr rt rc rb bl bc br lt lc lb`，分别代表上右下左中，组合而成的12个方位
  - `tl` 对应 `top-left`
  - `tc` 对应 `top-center`
  - `tr` 对应 `top-right`
  - `rt` 对应 `right-top`
  - `rc` 对应 `right-center`
  - `rb` 对应 `right-bottom`
  - `bl` 对应 `bottom-left`
  - `bc` 对应 `bottom-center`
  - `br` 对应 `bottom-right`
  - `lt` 对应 `left-top`
  - `lc` 对应 `left-center`
  - `lb` 对应 `left-bottom`
###### 方法
- `show`显示对应Popover，第一个参数event事件对象（来源于点击的元素），或者传入元素的id（Popover组件根据此的元素位置定位）、第二个参数dir，可选（箭头显示方位）
- `hide`隐藏对应Popover
###### 使用
Popover组件会根据元素计算可以显示的箭头方位，优先级为：show方法的dir参数 -> 组件初始化默认的dir参数 -> 组件计算之后的第一个dir参数，如果传递的dir箭头方位不支持显示，那么默认使用第一个支持的方位，**定位显示的元素需要有id属性**。
```javascript
let oPopover = weapp.Popover({
  list: ['选项1', '选项2', '选项3'],
  onSelect(idx){
    console.log(idx);
  }
});

// 显示弹出菜单，箭头方位：上右 top-right
oPopover.show('btnPopover', 'tr');
```


### weapp.Toptip
顶部提示
###### 参数
- `title`提示信息
- `type`提示类型，`success`成功、`error`失败、`warn`警告，默认: `default`
- `delay`自动关闭的延迟时间，单位毫秒，默认: `1500`
- `onHide`关闭之后回调
###### 方法
- `success`显示成功提示，参数：title, delay, onHide
- `error`显示失败提示，参数：title, delay, onHide
- `warn`显示警告提示，参数：title, delay, onHide
- `show`显示提示，参数：title, type, delay, onHide
- `hide`关闭提示
###### 使用
```javascript
weapp.Toptip.success('提示信息');
```


### weapp.CalendarPicker
日历选择，支持多个月份滑动切换展示，左右点击切换
###### 参数
- `startDate`开始日期
- `endDate`结束日期
- `currentDate`默认选择的日期
- `current`默认显示第几个月，从开始日期为第一个月，默认: `0`
- `onChange`选中日期的回调函数
###### 方法
- `show`显示日历
- `hide`隐藏日历
###### 使用
```javascript
this.oCP = weapp.CalendarPicker({
  startDate: '2017-07-07',
  endDate: '2018-08-08',
  onChange: (date)  => {
    
  }
});

this.oCP.show();
```


---------


### common.share
页面转发分享，除去每个页面的繁杂配置，使用起来更加简单高效，支持页面传递参数 options
###### 参数
- `title`显示的标题
- `url`转发的页面地址，默认为当前页面地址
###### 使用
```javascript
import common from '../../assets/js/common';

// common.share([title], [url])

Page({
  onShareAppMessage: common.share()
});
```


### common.param
将对象解析成url字符串
###### 参数
- `urlObject`参数对象，要转换成字符串参数的对象
- `unEncodeURI`不使用编码，默认使用编码`encodeURIComponent`
###### 使用
```javascript
import common from '../../assets/js/common';

// common.param([urlObject], [unEncodeURI])

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
###### 参数
- `urlString`地址，带url参数的地址
- `unDecodeURI`不使用解码，默认使用解码`decodeURIComponent`
###### 使用
```javascript
import common from '../../assets/js/common';

// common.unparam([urlString], [unDecodeURI])

let str = '?name=weapp&uid=8&age=24';

let obj = common.unparam(str);
```


### common.navigateTo
### common.redirectTo
### common.switchTab
### common.reLaunch
页面跳转，优化防止快速点击打开两个页面，支持对象形式传url参数，分别对应小程序的wx.navigateTo、wx.redirectTo、wx.switchTab、wx.reLaunch
###### 参数
- `url`页面地址
- `params`页面参数对象
###### 使用
```javascript
import common from '../../assets/js/common';

// common.navigateTo([url], [params])

Page({
  onTapElem(){
    common.navigateTo('/pages/weapp/popover/popover', {
      userid: 123,
      info: 'Hello,weapp'
    });
  }
});
```


## 第三方UI库使用到
字体图标使用FontAwesome，CSS组件样式使用WeUI

* font-awesome (4.7) <https://github.com/FortAwesome/Font-Awesome>
* weui-wxss <https://github.com/Tencent/weui-wxss>


## 项目截图
![weapp组件](./assets/images/desc/components.png)


## License
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 

[MIT](https://opensource.org/licenses/MIT)，享受开源的乐趣。