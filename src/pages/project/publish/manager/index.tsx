import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Button, Card, Col, Row, Input } from 'antd';
import { Link } from 'umi';
import { ConnectState } from '@/models/connect';
import PublishList from '@/components/PublishList';
import { queryPublishes } from '@/pages/project/publish/service';
import { Publish } from '@/pages/project/publish/data';


const { Search } = Input;

interface PublishManagerProps extends ConnectState {

}

interface PublishManagerState {
  publishes: [],
  filteredPublishes: [],
}

@connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))
class PublishManager extends Component<PublishManagerProps, PublishManagerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      publishes: [],
      filteredPublishes: [],
    };
  }

  componentDidMount(): void {
    const { project } = this.props;
    if (project.currentProject && project.currentProject.hasOwnProperty('id')) {
      this.initPublishes(project.currentProject.id);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<PublishManagerProps>): void {
    const { project } = nextProps;
    if (this.props !== nextProps && project.currentProject) {
      this.initPublishes(project.currentProject.id);
    }
  }

  initPublishes = (projectId?: number) => {
    queryPublishes({ projectId }).then(response => {
      this.setState({
        publishes: response,
        filteredPublishes: response,
      });
    });
  };

  onSearch = (value: any) => {
    const { publishes } = this.state;
    if (value === undefined) {
      this.setState({
        filteredPublishes: publishes,
      });
    }
    const res: any = [];
    // eslint-disable-next-line array-callback-return
    publishes.map((item: Publish) => {
      if (item.id - value === 0
        || item.title.indexOf(value) >= 0
        || item.checker.indexOf(value) >= 0
        || item.creator.indexOf(value) >= 0
        || item.version.indexOf(value) >= 0
      ) {
        res.push(item);
      }
    });
    this.setState({
      filteredPublishes: res,
    });
  };

  render() {
    const { project: { currentProject } } = this.props;
    const { filteredPublishes } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <Card>
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col span={4}>
              {
                currentProject ?
                  <Link
                    to={{
                      pathname: `/project/publish/create?projectId=${currentProject.id}`,
                    }}
                    target="_blank"
                  >
                    <Button type="primary">创建交付单</Button>
                  </Link>
                  : null
              }
            </Col>
            <Col span={20}>
              <Search
                placeholder="搜索表格"
                onSearch={this.onSearch}
                style={{ width: 200, float: 'right' }}
              />
            </Col>
          </Row>
          <PublishList publishes={filteredPublishes}/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PublishManager;
