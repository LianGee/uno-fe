import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ConnectState } from '@/models/connect';
import PublishDetail from '@/components/PublishDetail';
import { queryPublishes } from '@/pages/project/publish/service';
import PublishList from '@/components/PublishList';


interface PublishProps extends ConnectState {
  dispatch: Dispatch<any>;
}

interface PublishState {
  currentPublish: any;
  publishes?: [];
}

@connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))
class Publish extends Component<PublishProps, PublishState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPublish: undefined,
      publishes: undefined,
    };
  }

  componentDidMount(): void {
    const { project } = this.props;
    if (project.currentProject && project.currentProject.hasOwnProperty('id')) {
      this.initPublishes(project.currentProject.id);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<PublishProps>): void {
    const { project } = nextProps;
    if (this.props !== nextProps && project.currentProject) {
      this.initPublishes(project.currentProject.id);
    }
  }

  initPublishes = (projectId?: number) => {
    queryPublishes({ projectId }).then(response => {
      this.setState({
        publishes: response,
        currentPublish: response[0],
      });
    });
  };

  onRow = (record: any) => ({
    onClick: () => {
      this.setState({
        currentPublish: record,
      });
    },
  });

  render() {
    const { currentPublish, publishes } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              {
                currentPublish && currentPublish.hasOwnProperty('id') ?
                  <PublishList
                    onRow={this.onRow}
                    publishes={publishes}
                  /> : null
              }
            </Col>
            <Col span={12}>
              {
                currentPublish ? <PublishDetail publish={currentPublish}/> : null
              }
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Publish;
