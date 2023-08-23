Component({
  properties: {
    options: {
      type: Array,
      value: [],
    },
    value: {
      type: String,
      value: "",
    },
    visible: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    value: 0,
  },

  methods: {
    bindChange(e: any) {
      this.setData({ value: e.detail.value[0] });
    },
    bindCancel() {
      this.triggerEvent("cancel");
    },
    bindOk() {
      this.triggerEvent("ok", this.properties.options[this.data.value || 0]);
    },
  },
});
