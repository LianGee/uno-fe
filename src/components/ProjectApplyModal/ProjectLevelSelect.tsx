import { Select } from 'antd';
import React from 'react';
import { ProjectConstant } from '@/constant/project';

const { Option } = Select;

export default function ProjectLevelSelect() {
  return (
    <Select>
      {ProjectConstant.LEVEL.map((item: any) => (
        <Option value={item.value} key={item.value}>
          {item.text}
        </Option>
      ))}
    </Select>
  );
}
