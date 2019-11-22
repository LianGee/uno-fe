import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import Catalogue from '@/components/DocCatalogue';
import styles from './index.less';
import MarkdownEditor from '@/components/MarkdownEditor';

interface DocProps {
}

interface DocState {
  catalogue?: any;
  currentId?: any;
}

class Doc extends Component<DocProps, DocState> {
  constructor(props: any) {
    super(props);
    this.state = {
      catalogue: [],
    };
  }

  componentDidMount(): void {
    this.setState({
      catalogue: [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        {
          title: 'Tree Node',
          key: '2',
          children: [
            { title: 'Expand to load', key: '3' },
            { title: 'Expand to load', key: '4' },
            { title: 'Tree Node', key: '5', isLeaf: true },
          ],
        },
      ],
      currentId: 1,
    });
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
