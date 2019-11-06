import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, Mentions, Row, Typography } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { Requirement } from '@/pages/project/requirement/data';
import { queryRequirementById } from '@/pages/project/requirement/service';
import RequirementForm from '@/components/RequirementForm';
import RequirementComment from '@/components/RequirementComment';
import { ConnectState } from '@/models/connect';

const { Paragraph } = Typography;
const { Option, getMentions } = Mentions;

interface RequirementDetailProps extends ConnectState {
  location: any;
  form: any;
  project: any;
}

interface RequirementDetailState {
  requirement: Requirement;
  isCreate: boolean;
  id: number;
  comment: any;
}

@connect(({ project, user }: RequirementDetailProps) => ({
  project,
  user,
}))
class RequirementDetail extends Component<RequirementDetailProps, RequirementDetailState> {
  formRef: any;

  constructor(props: RequirementDetailProps) {
    super(props);
    this.state = {
      requirement: {} as Requirement,
      isCreate: false,
      id: 0,
      comment: '',
    };
  }

  componentDidMount(): void {
    const { location } = this.props;
    const { query } = location;
    if (location.pathname === '/project/requirement/create') {
      this.setState({
        isCreate: true,
      });
    }
    if (query.id) {
      queryRequirementById(query.id).then(response => {
        this.setState({
          requirement: response,
          id: query.id,
        });
      });
    }
  }

  onTitleChange = (title: any) => {
    console.log(title);
    return title;
  };

  renderTitle = () => {
    const { requirement } = this.state;
    return (
      <Row>
        <Col span={1}>标题:</Col>
        <Col span={23}>
          <Paragraph
            editable={{ onChange: this.onTitleChange }}
            strong
            className={styles.typography}
          >
            {requirement.title}
          </Paragraph>
        </Col>
      </Row>
    );
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  onSubmit = () => {
    const { comment, requirement } = this.state;
    console.log(this.state, getMentions(comment), requirement);
    this.formRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.formRef.resetFields();
    });
  };

  onCommentChange = (comment: any) => {
    this.setState({
      comment,
    });
  };

  onChange = (e: any) => {
    const { requirement } = this.state;
    requirement.assignTo = e.assignTo && e.assignTo.value;
    requirement.creator = e.creator && e.creator.value;
  };

  render() {
    const { requirement, isCreate, id } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <Card title={this.renderTitle()} className={styles.card}>
          {!isCreate && requirement.id === undefined ? null : (
            <>
              <RequirementForm
                ref={this.saveFormRef}
                requirement={requirement}
                onChange={this.onChange}
              />
              <RequirementComment id={id}/>
              <div className={styles.comment}>
                <Mentions rows={3} placeholder="使用@圈人" onChange={this.onCommentChange}>
                  <Option value="afc163">afc163</Option>
                  <Option value="zombieJ">zombieJ</Option>
                  <Option value="yesmeck">yesmeck</Option>
                </Mentions>
                <Button type="primary" className={styles.submitButton} onClick={this.onSubmit}>
                  提交
                </Button>
              </div>
            </>
          )}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RequirementDetail;
