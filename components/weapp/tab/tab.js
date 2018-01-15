Component({
  properties: {
    /* Tab标题的数据 */
    list: {
      type: Array,
      value: []
    },
    /* 选中的索引 */
    activeIndex: {
      type: Number,
      value: 0
    },
    /* 主题样式 */
    className: {
      type: String,
      value: ''
    },
  },
  methods: {
    action(event) {
      let { activeIndex} = this.data;
      let idx = event.currentTarget.dataset.idx;

      if (activeIndex == idx) return;

      activeIndex = idx;

      this.setData({
        activeIndex: activeIndex
      });

      this.triggerEvent('change', { activeIndex });
    }
  }
})