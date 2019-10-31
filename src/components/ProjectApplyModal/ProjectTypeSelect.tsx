import { Select } from 'antd';
import React from 'react';
import { ProjectConstant } from '@/constant/project';

const { Option } = Select;

export default function ProjectTypeSelect() {
  return (
    <Select>
      {ProjectConstant.TYPE.map((item: any) => (
        <Option value={item.value} key={item.value}>
          {item.text}
        </Option>
      ))}
    </Select>
  );
}
