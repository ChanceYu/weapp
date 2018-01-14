Component({
  properties: {
    delay: {
      type: Number,
      value: 1500
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
      this.properties.title = '';
      this.setData({
        show: false
      });

      this.triggerEvent('hide', {});
    }
  }
})