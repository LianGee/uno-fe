import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Mentions, notification, Row, Typography } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { Requirement } from '@/pages/project/requirement/data';
import { queryRequirementById, save } from '@/pages/project/requirement/service';
import RequirementForm from '@/components/RequirementForm';
import RequirementComment from '@/components/RequirementComment';
import { ConnectState } from '@/models/connect';
import { TIME_FORMAT } from '@/constant/global';
import MentionAll from '@/components/Mention';

const { Paragraph } = Typography;
const { Option } = Mentions;

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
      id: undefined as unknown as number,
      comment: [],
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
          requirement: response.data,
          id: query.id,
        });
      });
    }
  }

  onTitleChange = (title: any) => {
    const { requirement } = this.state;
    requirement.title = title;
    this.setState({
      requirement,
    });
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
    const { project, user } = this.props;
    this.formRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      const { scheduling } = values;
      const createRequirement = {
        id: this.state.id,
        title: this.state.requirement.title,
        projectId: project.currentProject.id,
        priority: values.priority,
        type: values.type,
        content: values.content,
        assignTo: values.assignTo,
        start: scheduling[0].format(TIME_FORMAT),
        end: scheduling[1].format(TIME_FORMAT),
        creator: user.currentUser ? user.currentUser.name : undefined,
        status: this.state.requirement.status,
      };
      save(createRequirement).then(response => {
        if (response.status !== 0) {
          notification.info({ message: response.msg });
        } else {
          notification.success({ message: '成功' });
        }
      });
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
    const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
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
              <Form {...formLayout}>
                <Form.Item {...tailFormItemLayout}>
                  <RequirementComment id={id}/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <MentionAll rows={3} onChange={this.onCommentChange}/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" className={styles.submitButton} onClick={this.onSubmit}>
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RequirementDetail;
