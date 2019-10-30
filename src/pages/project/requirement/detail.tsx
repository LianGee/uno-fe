import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Col, Form, Row, Typography } from 'antd';
import styles from './index.less';
import { Requirement } from '@/pages/project/requirement/data';
import { queryRequirementById } from '@/pages/project/requirement/service';
import RequirementForm from '@/components/requirement';

const { Paragraph } = Typography;

interface RequirementDetailProps {
  location: any;
  form: any;
}

interface RequirementDetailState {
  requirement: Requirement;
  isCreate: boolean;
}


class RequirementDetail extends Component<RequirementDetailProps, RequirementDetailState> {
  formRef = null;

  constructor(props: RequirementDetailProps) {
    super(props);
    this.state = {
      requirement: {} as Requirement,
      isCreate: false,
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
    return (<Row>
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
    </Row>);
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    const { requirement, isCreate } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <Card title={this.renderTitle()} className={styles.card}>
          {
            !isCreate && (requirement.id === undefined)
              ? null : <RequirementForm ref={this.saveFormRef} requirement={requirement}/>
          }
        </Card>
      </PageHeaderWrapper>
    );
  }
}

const WrappedRegistrationForm = Form.create<RequirementDetailProps>()(RequirementDetail);
export default WrappedRegistrationForm;
