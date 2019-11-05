import React, { Component } from 'react';
import { Icon, Table } from 'antd';
import { PUBLISH_STATUS } from '@/constant/publish';

interface PublishListProps {
  onRow?: any;
  publishes: any;
}

class PublishList extends Component<PublishListProps> {
  renderStatus = (value: number) => {
    const icons = ['smile', 'check-circle', 'exclamation-circle'];
    const twoToneColors = ['', '#52c41a', '#eb2f96'];
    return (
      <>
        <Icon type={icons[value]} theme="twoTone" twoToneColor={twoToneColors[value]}/>
        {PUBLISH_STATUS[value]}
      </>
    );
  };

  getTableColumn = () => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '交付日',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: this.renderStatus,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '验收',
      dataIndex: 'checker',
      key: 'checker',
    },
  ];

  render() {
    const { onRow, publishes } = this.props;
    return (
      <Table
        columns={this.getTableColumn()}
        dataSource={publishes}
        onRow={onRow}
        rowKey="id"
        size="middle"
      />
    );
  }
}

export default PublishList;
