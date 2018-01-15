Component({
  properties: {
    region: {
      type: Array,
      value: []
    },
    label: {
      type: String,
      value: ''
    }
  },
  ready(){
    this._setLabel();
  },
  methods: {
    change(event) {
      let region = event.detail.value;

      this.setData({ region });
      this._setLabel();

      this.triggerEvent('change', { region });
    },
    _setLabel() {
      let region = this.data.region;
      let label = '请选择城市';

      if (region.length) {
        let regionStr = region.join(', ');

        label = '当前选择：' + regionStr;
      }

      this.setData({
        label
      });
    }
  }
})