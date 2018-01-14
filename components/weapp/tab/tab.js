Component({
  properties: {
    className: {
      type: String,
      value: ''
    },
    list: {
      type: Array,
      value: []
    },
    activeIndex: {
      type: Number,
      value: 0
    }
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
    }
  }
})