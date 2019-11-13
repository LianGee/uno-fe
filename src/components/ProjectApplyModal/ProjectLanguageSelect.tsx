import { Select } from 'antd';
import React from 'react';
import { ProjectConstant } from '@/constant/project';

const { Option } = Select;

export default function ProjectLanguageSelect() {
  return (
    <Select mode="multiple">
      {ProjectConstant.LANGUAGE.map((item: any) => (
        <Option value={item.text} key={item.text}>
          {item.text}
        </Option>
      ))}
    </Select>
  );
}
