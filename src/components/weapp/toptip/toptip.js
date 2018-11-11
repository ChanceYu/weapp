Component({
  properties: {
    /* 延迟关闭时间 */
    delay: {
      type: Number,
      value: 1500
    },
    /* 显示的类型 success warn error */
    type: {
      type: 'String',
      value: 'default'
    },
    /* 是否显示 */
    show: {
      type: Boolean,
      value: false
    },
    /* 显示标题信息 */
    title: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        let { delay } = this.properties;

        this.setData({
          show: true
        });

        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.hide(), delay);
      }
    }
  },
  methods: {
    hide() {
      this.setData({
        title: '',
        show: false
      });

      this.triggerEvent('hide', {});
    }
  }
})