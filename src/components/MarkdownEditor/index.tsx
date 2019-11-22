import React, { Component } from 'react';
import { Col, Row, Input } from 'antd';
// @ts-ignore
import { markdown } from 'markdown';
import Toolbar from '@/components/MarkdownEditor/toolbar';
import styles from './index.less';
import 'github-markdown-css';

const { TextArea } = Input;

interface MarkdownEditorProps {
  height?: number;
  preview?: boolean;
  save?: any;
  id?: number;
}

interface MarkdownEditorState {
  id: number;
  content: string;
  value: string;
  preview?: boolean;
}

class MarkdownEditor extends Component<MarkdownEditorProps, MarkdownEditorState> {
  static defaultProps = {
    height: 780,
    preview: true,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      id: 0,
      content: '',
      value: '',
      preview: true,
    };
  }

  componentWillReceiveProps(nextProps: any): void {
    const { id } = nextProps;
    // @ts-ignore
    this.setState({ id });
  }

  onChange = (e: any) => {
    this.setState({
      content: e.target.value,
      value: markdown.toHTML(e.target.value),
    });
  };

  onPreview = () => {
    this.setState({ preview: true });
  };

  onEdit = () => {
    const { preview } = this.state;
    this.setState({
      preview: !preview,
    });
  };

  onNew = () => {
    this.setState({
      id: 0,
      preview: false,
      value: '',
    });
  };

  onSave = () => {
    const { content, id } = this.state;
    this.props.save(id, content);
  };

  render() {
    const { height } = this.props;
    const { value, preview } = this.state;
    return (
      <>
        <Row style={{ marginTop: 15 }}>
          {
            preview ? (
                <Row style={{ float: 'right', zIndex: 101 }}>
                  <Toolbar
                    onEdit={this.onEdit}
                    onPreview={this.onPreview}
                    onNew={this.onNew}
                    onSave={this.onSave}
                  />
                </Row>
              ) :
              <Col span={12} className={styles.outLine} style={{ height }}>
                <Row>
                  <Row style={{ float: 'right', zIndex: 101 }}>
                    <Toolbar
                      onEdit={this.onEdit}
                      onPreview={this.onPreview}
                      onNew={this.onNew}
                      onSave={this.onSave}
                    />
                  </Row>
                  <TextArea style={{ height, zIndex: 100, position: 'absolute' }} onChange={this.onChange}>
                  </TextArea>
                </Row>
              </Col>
          }
          <Col span={preview ? 24 : 12}>
            <Row className={styles.preview}>
              {/* eslint-disable-next-line react/no-danger */}
              <div id="preview" dangerouslySetInnerHTML={{ __html: value }} className="markdown-body"/>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default MarkdownEditor;
