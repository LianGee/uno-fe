import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

export default function ProjectBusinessSelect() {
  return (
    <Select mode="multiple">
      <Option value={0}>大数据</Option>
      <Option value={1}>金融云</Option>
    </Select>
  );
}
