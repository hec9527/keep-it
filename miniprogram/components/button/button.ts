Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    text: String,
    disabled: Boolean,
    loading: Boolean,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      if (this.properties.loading || this.properties.disabled) {
        return;
      }

      this.triggerEvent("tap", e);
    },
  },
});
