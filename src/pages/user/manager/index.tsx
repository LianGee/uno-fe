import React, { Component } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import UserList from '@/components/UserList';

interface UserManagerProps extends ConnectState {
}

@connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))
class UserManager extends Component<UserManagerProps> {
  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <UserList/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserManager;
