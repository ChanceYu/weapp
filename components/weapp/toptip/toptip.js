Component({
  properties: {
    delay: {
      type: Number,
      value: 1500
    },
    type: {
      type: 'String',
      value: 'default'
    },
    show: {
      type: Boolean,
      value: false
    },
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
    }
  }
})