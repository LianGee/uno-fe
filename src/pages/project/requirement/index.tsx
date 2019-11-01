import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Col, Icon, Row, Statistic } from 'antd';
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

@connect(({ project, user }: RequirementManagerProps) => ({
  project,
  user,
}))
class RequirementManager extends Component<RequirementManagerProps, RequirementManagerState> {
  componentDidMount(): void {
  }

  render() {
    const {
      project: { currentProject = {} as Project },
    } = this.props;
    return (
      <PageHeaderWrapper title={false}>
        <Row type="flex" justify="space-between" className={styles.statistic}>
          <Col span={4} >
            <Statistic title="延期需求"
                       prefix={<Icon type="alert"/>}
                       value={112893} valueStyle={{ color: '#cf1322' }}/>
          </Col>
          <Col span={4}>
            <Statistic title="未开始" prefix={<Icon type="api"/>}
                       value={112893}/>
          </Col>
          <Col span={4}>
            <Statistic title="已完成" prefix={<Icon type="carry-out"/>}
                       value={123} suffix="/112893" valueStyle={{ color: '#3fcf51' }}/>
          </Col>
          <Col span={4}>
            <Statistic title="BUG数量" prefix={<Icon type="bug"/>} value={112893}/>
          </Col>
        </Row>
        <Row>
          <Card>
            {currentProject.hasOwnProperty('id') ? (
              <RequirementList currentProject={currentProject}/>
            ) : null}
          </Card>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default RequirementManager;
