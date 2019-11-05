import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import PublishForm from '@/components/PublishForm';
import { Publish } from '@/pages/project/publish/data';
import { Card } from 'antd';

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
  }

  savePublishRef = (inst: any) => {
    this.publishRef = inst;
  };

  render() {
    return (
      <PageHeaderWrapper title={false}>
        <Card>
          <PublishForm ref={this.savePublishRef}/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PublishCreate;
