import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Col, notification, Row } from 'antd';
import Catalogue from '@/components/DocCatalogue';
import styles from './index.less';
import MarkdownEditor from '@/components/MarkdownEditor';
import { ConnectState } from '@/models/connect';
import { connect } from 'dva';
import { queryByProjectId } from '@/pages/doc/service';

interface DocProps extends ConnectState {
}

interface DocState {
  catalogue?: any;
  currentId?: any;
}

@connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))
class Doc extends Component<DocProps, DocState> {
  constructor(props: any) {
    super(props);
    this.state = {
      catalogue: [],
    };
  }

  componentDidMount(): void {
    const { project } = this.props;
    if (project.currentProject !== undefined) {
      queryByProjectId(project.currentProject.id).then(response => {
        if (response.status !== 0) {
          notification.error(response.msg);
        } else {
          const catalogue = response.data;
          this.setState({ catalogue, currentId: catalogue.length > 0 ? catalogue[0].id : 0 });
        }
      });
    }
  }

  save = (id: number, content: string) => {
    const { catalogue, currentId } = this.state;
    console.log(content);
    if (id !== currentId) {
      catalogue.unshift({
        title: 'untitled',
        key: catalogue[0].key + 1,
      });
    }
    this.setState({
      catalogue,
      currentId: id,
    });
  };

  render() {
    const { catalogue, currentId } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <div className={styles.docStyle}>
          <Row>
            <Col span={4} className={styles.catalogue}>
              <Catalogue data={catalogue}/>
            </Col>
            <Col span={20}>
              <MarkdownEditor save={this.save} id={currentId}/>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Doc;
