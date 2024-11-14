export const schema = {
  type: "object",
  properties: {
    date: {
      type: "Date",
      title: "日期",
      "x-decorator": "FormItem",
      "x-component": "DatePicker",
    },
    tradingVolume: {
      type: "number",
      title: "成交额",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitUpCount1: {
      type: "number",
      title: "10%涨停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitUpCount2: {
      type: "number",
      title: "20%涨停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitUpCount3: {
      type: "number",
      title: "30%涨停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitUpCountBeforeCallAuction: {
      type: "number",
      title: "集合竞价涨停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitDownCount1: {
      type: "number",
      title: "10%跌停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitDownCount2: {
      type: "number",
      title: "20%跌停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitDownCount3: {
      type: "number",
      title: "30%跌停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    limitDownCountBeforeCallAuction: {
      type: "number",
      title: "集合竞价跌停",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    redStockCount: {
      type: "number",
      title: "红盘个数",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        type: "number",
      },
    },
    // name: {
    //   type: "void",
    //   title: "姓名",
    //   "x-decorator": "FormItem",
    //   "x-decorator-props": {
    //     asterisk: true,
    //     feedbackLayout: "none",
    //   },
    //   "x-component": "FormGrid",
    //   properties: {
    //     firstName: {
    //       type: "string",
    //       "x-decorator": "FormItem",
    //       "x-component": "Input",
    //       "x-component-props": {
    //         placeholder: "姓",
    //       },
    //     },
    //     lastName: {
    //       type: "string",
    //       "x-decorator": "FormItem",
    //       "x-component": "Input",
    //       "x-component-props": {
    //         placeholder: "名",
    //       },
    //     },
    //   },
    // },
    // email: {
    //   type: "string",
    //   title: "邮箱",
    //   "x-decorator": "FormItem",
    //   "x-component": "Input",
    //   "x-validator": "email",
    // },
    // gender: {
    //   type: "string",
    //   title: "性别",
    //   enum: [
    //     {
    //       label: "男",
    //       value: 1,
    //     },
    //     {
    //       label: "女",
    //       value: 2,
    //     },
    //     {
    //       label: "第三性别",
    //       value: 3,
    //     },
    //   ],
    //   "x-decorator": "FormItem",
    //   "x-component": "Select",
    // },
    // address: {
    //   type: "string",
    //   title: "地址",
    //   "x-decorator": "FormItem",
    //   "x-component": "Cascader",
    //   "x-reactions": "{{fetchAddress}}",
    // },
    // contacts: {
    //   type: "array",
    //   title: "联系人信息",
    //   "x-decorator": "FormItem",
    //   "x-component": "ArrayItems",
    //   items: {
    //     type: "object",
    //     "x-component": "ArrayItems.Item",
    //     properties: {
    //       sort: {
    //         type: "void",
    //         "x-decorator": "FormItem",
    //         "x-component": "ArrayItems.SortHandle",
    //       },
    //       popover: {
    //         type: "void",
    //         title: "完善联系人信息",
    //         "x-decorator": "Editable.Popover",
    //         "x-component": "FormLayout",
    //         "x-component-props": {
    //           layout: "vertical",
    //         },
    //         "x-reactions": [
    //           {
    //             fulfill: {
    //               schema: {
    //                 title: '{{$self.query(".name").value() }}',
    //               },
    //             },
    //           },
    //         ],
    //         properties: {
    //           name: {
    //             type: "string",
    //             title: "姓名",
    //             required: true,
    //             "x-decorator": "FormItem",
    //             "x-component": "Input",
    //             "x-component-props": {
    //               style: {
    //                 width: 300,
    //               },
    //             },
    //           },
    //           email: {
    //             type: "string",
    //             title: "邮箱",
    //             "x-decorator": "FormItem",
    //             "x-component": "Input",
    //             "x-validator": [{ required: true }, "email"],
    //             "x-component-props": {
    //               style: {
    //                 width: 300,
    //               },
    //             },
    //           },
    //           phone: {
    //             type: "string",
    //             title: "手机号",
    //             "x-decorator": "FormItem",
    //             "x-component": "Input",
    //             "x-validator": [{ required: true }, "phone"],
    //             "x-component-props": {
    //               style: {
    //                 width: 300,
    //               },
    //             },
    //           },
    //         },
    //       },
    //       remove: {
    //         type: "void",
    //         "x-decorator": "FormItem",
    //         "x-component": "ArrayItems.Remove",
    //         "x-component-props": {
    //           style: {
    //             marginRight: 10,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   properties: {
    //     addition: {
    //       type: "void",
    //       title: "新增联系人",
    //       "x-component": "ArrayItems.Addition",
    //     },
    //   },
    // },
  },
};
