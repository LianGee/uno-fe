import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Button, Card } from 'antd';
import Link from 'umi/link';
import { ConnectState } from '@/models/connect';
import RequirementList from '@/pages/project/requirement/list';
import { Project } from '@/models/project';
import styles from './index.less';


interface RequirementManagerProps extends ConnectState {
  dispatch: Dispatch<any>;
}

interface RequirementManagerState {
  currentProject: Project;
}

@connect((
  { project, user }: RequirementManagerProps) => ({
  project, user,
}))
class RequirementManager extends Component<RequirementManagerProps, RequirementManagerState> {

  render() {
    const { project: { currentProject = {} as Project } } = this.props;
    return (
      <PageHeaderWrapper title={false}>
        <Card>
          <Link to={{
            pathname: '/project/requirement/create',
          }} title="新建需求">
            <Button type="primary" className={styles.newButton}>新建需求</Button>
          </Link>
          {
            currentProject.hasOwnProperty('id') ? <RequirementList currentProject={currentProject}/> : null
          }
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RequirementManager;
