import React, { Component } from 'react';
import { Table } from 'antd';
import { Constant } from '@/constant/requirement';

interface RequirementListProps {
  requirements?: [],
}

class RequirementList extends Component<RequirementListProps> {
  renderStatus = (value: any) => Constant.STATUS[value].text;

  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '指派给',
        dataIndex: 'assignTo',
        key: 'assignTo',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: this.renderStatus,
      },
      {
        title: '起始',
        dataIndex: 'start',
        key: 'start',
      },
      {
        title: '截止',
        dataIndex: 'end',
        key: 'end',
      },
    ];
    const { requirements } = this.props;
    return <Table
      columns={columns}
      dataSource={requirements}
      size="small"
      pagination={false}
      rowKey="id"
    />;
  }
}

export default RequirementList;
