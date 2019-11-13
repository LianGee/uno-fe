import React from 'react';
import { Card, Form, Icon, notification, Tag, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import styles from './index.less';
import { priority, type } from '@/constant/project';
import { Project } from '@/models/project';
import ProjectApplyModal from '@/components/ProjectApplyModal';
import { save } from '@/pages/project/manager/service';

const { Paragraph } = Typography;

export interface ProjectCardProps {
  project: Partial<Project>;
}

export interface ProjectCardState {
  visible: boolean;
  currentProject: Project;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class ProjectCard extends React.Component<ProjectCardProps, ProjectCardState> {
  formRef: any;

  constructor(props: any) {
    super(props);
    const { project } = props;
    this.state = {
      visible: false,
      currentProject: project,
    };
  }

  onHandleOk = () => {
    this.formRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      const { currentProject } = this.state;
      const project = {
        ...values,
        id: currentProject.id,
        logo: currentProject.logo,
      };
      save(project).then(response => {
        if (response.status !== 0) {
          notification.error({ message: response.msg });
        } else {
          notification.success({ message: '更新成功' });
          this.setState({ visible: false });
          window.location.reload();
        }
      });
      this.formRef.resetFields();
    });
  };

  onHandleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  onCardEdit = () => {
    const { project } = this.props;
    this.setState({
      visible: true,
      currentProject: project as Project,
    });
  };

  render() {
    const { currentProject } = this.state;
    const color = ['geekblue', 'volcano', 'magenta'];
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      labelAlign: 'left' as any,
    };

    return (
      <section>
        <Card
          hoverable
          className={styles.card}
          actions={[
            <Icon type="edit" key="edit" onClick={this.onCardEdit}/>,
            <a href={currentProject.frontendHost} target="_blank" rel="noopener noreferrer">
              <Icon type="arrow-right"/>
            </a>,
          ]}
        >
          <Card.Meta
            title={<a>{currentProject.name}</a>}
            avatar={<img alt="" className={styles.cardLogo} src={currentProject.logo}/>}
            description={
              <section>
                {
                  currentProject.business ?
                    <Tag color="cyan">{currentProject.business.chineseName}</Tag> : null
                }
                <Tag color={color[currentProject.level || 0]}>
                  {priority[currentProject.level || 0]}
                </Tag>
                <Tag>{type[currentProject.type || 0]}</Tag>
                {currentProject.language !== undefined
                  ? currentProject.language.map(item => <Tag key={item}>{item}</Tag>)
                  : null}
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {currentProject.description}
                </Paragraph>
                <Form {...formItemLayout}>
                  <FormItem label="负责人">
                    {currentProject.owner !== undefined
                      ? currentProject.owner.map(item => <Tag key={item}>{item}</Tag>)
                      : null}
                  </FormItem>
                </Form>
              </section>
            }
          />
        </Card>
        <ProjectApplyModal
          ref={this.saveFormRef}
          visible={this.state.visible}
          title="修改项目信息"
          onCreate={this.onHandleOk}
          onCancel={this.onHandleCancel}
          defaultProject={this.state.currentProject}
        />
      </section>
    );
  }
}
