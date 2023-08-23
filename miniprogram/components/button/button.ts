import { cls } from "../../utils/util";

Component({
  data: {
    cls: "k-button",
  },

  /**
   * 组件的属性列表
   */
  properties: {
    block: Boolean,
    size: String,
    type: String,
    sharp: String,
    disabled: Boolean,
    loading: Boolean,
  },

  observers: {
    block: function (block) {
      const s = cls("k-button", { block });
      console.log(s);
      this.setData({ cls: s });
    },
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
