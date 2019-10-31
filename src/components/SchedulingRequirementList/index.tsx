import React, { Component } from 'react';
import { Table } from 'antd';

interface SchedulingRequirementListProps {
  requirements: any;
}

class SchedulingRequirementList extends Component<SchedulingRequirementListProps> {
  componentDidMount(): void {}

  render() {
    const columns = [
      {
        title: '需求名称',
        dataIndex: 'name',
        key: 'name',
      },
    ];
    const { requirements } = this.props;
    return (
      <Table dataSource={requirements} columns={columns} rowKey="id">
        {' '}
      </Table>
    );
  }
}

export default SchedulingRequirementList;
