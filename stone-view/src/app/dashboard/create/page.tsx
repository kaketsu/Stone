"use client";

import React, { useState, useEffect } from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
} from "@formily/antd";
// import { action } from "@formily/reactive";
import { Card, Button, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { schema } from "./schema";
import { postDashboard } from "@/utils/service";

export default function CreateDashboardPage() {
  const [loading, setLoading] = useState(false);

  const SchemaField = createSchemaField({
    components: {
      FormItem,
      FormGrid,
      FormLayout,
      Input,
      DatePicker,
      Cascader,
      Select,
      ArrayItems,
      Editable,
    },
    scope: {
      fetchAddress: () => {},
      // fetchAddress: (field) => {
      //   const transform = (data = {}) => {
      //     return Object.entries(data).reduce((buf, [key, value]) => {
      //       if (typeof value === "string")
      //         return buf.concat({
      //           label: value,
      //           value: key,
      //         });
      //       const { name, code, cities, districts } = value;
      //       const _cities = transform(cities);
      //       const _districts = transform(districts);
      //       return buf.concat({
      //         label: name,
      //         value: code,
      //         children: _cities.length
      //           ? _cities
      //           : _districts.length
      //           ? _districts
      //           : undefined,
      //       });
      //     }, []);
      //   };
      //   field.loading = true;
      //   fetch("//unpkg.com/china-location/dist/location.json")
      //     .then((res) => res.json())
      //     .then(
      //       action.bound((data) => {
      //         field.dataSource = transform(data);
      //         field.loading = false;
      //       })
      //     );
      // },
    },
  });

  const form = createForm({
    validateFirst: true,
  });

  const onSubmit = () => {
    postDashboard(form.values);
  };

  return (
    <div className="overflow-y-auto flex-1">
      <Card title="大盘">
        <Spin spinning={loading}>
          <Form
            form={form}
            labelCol={5}
            wrapperCol={16}
            // onAutoSubmit={onSubmit}
          >
            <SchemaField schema={schema} />

            <FormButtonGroup.FormItem>
              <Button size="large" type="primary" onClick={onSubmit}>
                提交
              </Button>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  );
}
