import React, { Component } from 'react';
import { Badge, Table } from 'antd';
import { queryUsers } from '@/services/user';

interface UserListProps {
}

interface UserListState {
  users: []
}

class UserList extends Component<UserListProps, UserListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount(): void {
    queryUsers().then(res =>
      this.setState({
        users: res.data,
      }),
    );
  }

  renderActive = (value: any) => (
    <Badge
      status={value === 0 ? 'error' : 'success'}
      text={value === 0 ? '离职' : '在职'}
    />
  );

  render() {
    const columns: any = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '中文名',
        key: 'chineseName',
        dataIndex: 'chineseName',
      },
      {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email',
      },
      {
        title: '在职状态',
        key: 'active',
        dataIndex: 'active',
        render: this.renderActive,
      },
    ];
    const { users } = this.state;
    return (
      <Table columns={columns} dataSource={users} rowKey="id"/>
    );
  }
}

export default UserList;
