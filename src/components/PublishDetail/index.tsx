import React, { Component } from 'react';
import { Row } from 'antd';
import { Publish } from '@/pages/project/publish/data';
import styles from './index.less';
import RequirementList from '@/components/PublishDetail/RequirementList';
import { queryFakeList } from '@/pages/project/requirement/service';
import Editor from '@/components/Editor';

interface PublishDetailProps {
  publish: Publish;
}

interface PublishDetailState {
  requirements?: [],
}

class PublishDetail extends Component<PublishDetailProps, PublishDetailState> {
  constructor(props: any) {
    super(props);
    this.state = {
      requirements: [],
    };
  }

  componentDidMount(): void {
    const { publish } = this.props;
    queryFakeList({ projectId: publish.projectId as number }).then(response => {
      this.setState({
        requirements: response,
      });
    });
  }

  render() {
    const { publish } = this.props;
    const { requirements } = this.state;
    return (
      <>
        <Row gutter={[16, 16]}>
          <strong className={styles.title}>{publish.title}【{publish.version}】</strong>
          <span style={{ float: 'right' }}>截止:{publish.deadline}</span>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <strong className={styles.subTitle}>需求清单</strong>
        </Row>
        <Row style={{ margin: 20 }}>
          <RequirementList requirements={requirements}/>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <strong className={styles.subTitle}>测试结论</strong>
        </Row>
        <Row>
          <Editor/>
        </Row>
      </>
    );
  }
}

export default PublishDetail;
