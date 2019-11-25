import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Mentions, notification, Row, Typography } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { Requirement } from '@/pages/project/requirement/data';
import { queryRequirementById, save } from '@/pages/project/requirement/service';
import RequirementForm from '@/components/RequirementForm';
import { ConnectState } from '@/models/connect';
import { TIME_FORMAT } from '@/constant/global';

const { Paragraph } = Typography;
const { getMentions } = Mentions;

interface RequirementDetailProps extends ConnectState {
  location: any;
  form: any;
  project: any;
}

interface RequirementDetailState {
  requirement: Requirement;
  id: number;
  isCreate: boolean;
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
      id: undefined as unknown as number,
      isCreate: false,
    };
  }

  componentDidMount(): void {
    this.init();
  }

  init = () => {
    const { location } = this.props;
    const { query } = location;
    if (query.id) {
      queryRequirementById(query.id).then(response => {
        this.setState({
          requirement: response.data,
          id: query.id,
        });
      });
      this.setState({ isCreate: false });
    } else {
      this.setState({ isCreate: true });
    }
  };

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
        info: {
          requirementId: this.state.id,
          recipient: values.comment ? getMentions(values.comment).map((item: any) => item.value)
            : undefined,
          content: values.comment,
        },
      };
      save(createRequirement).then(response => {
        if (response.status !== 0) {
          notification.info({ message: response.msg });
        } else {
          notification.success({ message: '成功' });
          this.init();
        }
      });
    });
  };

  onChange = (e: any) => {
    const { requirement } = this.state;
    requirement.assignTo = e.assignTo && e.assignTo.value;
    requirement.creator = e.creator && e.creator.value;
  };

  render() {
    const { requirement, isCreate } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <Card title={this.renderTitle()} className={styles.card}>
          {
            (requirement.id !== undefined && !isCreate) || isCreate ? <RequirementForm
              ref={this.saveFormRef}
              requirement={requirement}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            /> : null
          }
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RequirementDetail;
