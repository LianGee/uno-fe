import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Col, Icon, Row, Statistic } from 'antd';
import { ConnectState } from '@/models/connect';
import { Project } from '@/models/project';
import styles from './index.less';
import RequirementList from '@/components/RequirementList';
import { statistic } from './service';

interface RequirementManagerProps extends ConnectState {
  dispatch: Dispatch<any>;
}

interface RequirementManagerState {
  statistics: any;
}

@connect(({ project, user }: RequirementManagerProps) => ({
  project,
  user,
}))
class RequirementManager extends Component<RequirementManagerProps, RequirementManagerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      statistics: {},
    };
  }

  componentDidMount(): void {
    this.initData(this.props);
  }

  componentWillReceiveProps(nextProps: any): void {
    if (this.props.project !== nextProps.project) {
      this.initData(nextProps);
    }
  }

  initData = (props: any) => {
    const { project: { currentProject } } = props;
    if (currentProject && currentProject.hasOwnProperty('id')) {
      statistic(currentProject.id).then(response => {
        this.setState({
          statistics: response.data,
        });
      });
    }
  };

  render() {
    const {
      project: { currentProject = {} as Project },
    } = this.props;
    const { statistics } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        {
          statistic === undefined ? null :
            <Row type="flex" justify="space-between" className={styles.statistic}>
              <Col span={5}>
                <Statistic title="延期需求"
                           prefix={<Icon type="alert"/>}
                           value={statistics.delay} valueStyle={{ color: '#cf1322' }}/>
              </Col>
              <Col span={5}>
                <Statistic title="未开始" prefix={<Icon type="api"/>}
                           value={statistics.unStarted}/>
              </Col>
              <Col span={5}>
                <Statistic title="已完成" prefix={<Icon type="carry-out"/>}
                           value={statistics.finished} suffix={`/${statistics.total}`}
                           valueStyle={{ color: '#3fcf51' }}/>
              </Col>
              <Col span={5}>
                <Statistic title="BUG数量" prefix={<Icon type="bug"/>} value={statistics.bug}/>
              </Col>
            </Row>
        }
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
