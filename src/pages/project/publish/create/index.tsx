import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import PublishForm from '@/components/PublishForm';
import { Publish } from '@/pages/project/publish/data';

interface PublishCreateProps extends ConnectState {
}

interface PublishCreateState {
  publish: Publish
}

@connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))
class PublishCreate extends Component<PublishCreateProps, PublishCreateState> {
  publishRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      publish: undefined as unknown as Publish,
    };
  }

  componentDidMount(): void {
    const { project: { currentProject } } = this.props;
    if (currentProject) {
      // queryPublishById({ projectId: currentProject.id, publishId: });
    }
    const { publish } = this.state;
    console.log('publish', publish);
  }

  savePublishRef = (inst: any) => {
    this.publishRef = inst;
  };

  render() {
    const { project: { currentProject } } = this.props;
    return (
      <PageHeaderWrapper title={false}>
        <Card>
          {
            currentProject ?
              <PublishForm ref={this.savePublishRef} projectId={currentProject.id}/>
              : null
          }
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PublishCreate;
