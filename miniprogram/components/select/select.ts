type IData = {
  timer?: number;
  pickerVisible: boolean;
  pickerExist: boolean;
};

Component({
  properties: {
    options: Array,
    value: String,
  },

  data: {
    timer: undefined,
    pickerVisible: false,
    pickerExist: false,
  } as IData,

  observers: {
    pickerVisible() {
      this.data.timer = undefined;
      if (this.data.pickerVisible) {
        this.setData({ pickerExist: true });
      } else {
        this.data.timer = setTimeout(() => {
          this.setData({ pickerExist: false });
        }, 300);
      }
    },
  },

  methods: {
    handleSelect() {
      this.setData({ pickerVisible: true });
    },
    handleCancel() {
      this.setData({ pickerVisible: false });
    },
    handleOk(data: AnyObject) {
      this.triggerEvent("change", data.detail);
      this.setData({ pickerVisible: false });
    },
  },
});
