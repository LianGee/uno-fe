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
    this.state = {
      visible: false,
      currentProject: (undefined as unknown) as Project,
    };
  }

  onHandleOk = () => {
    this.formRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      const { currentProject } = this.state;
      save({ ...values, id: currentProject.id }).then(response => {
        if (response.status !== 0) {
          notification.error({ message: response.msg });
        } else {
          notification.success({ message: '更新成功' });
        }
      });
      this.formRef.resetFields();
      this.setState({ visible: false });
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
    const { project } = this.props;
    console.log(project);
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
            <a href="https://ant.design/components/icon-cn/" target="blank">
              <Icon type="arrow-right"/>
            </a>,
          ]}
        >
          <Card.Meta
            title={<a>{project.name}</a>}
            avatar={<img alt="" className={styles.cardLogo} src={project.logo}/>}
            description={
              <section>
                {
                  project.business ? <Tag color="cyan">{project.business.chineseName}</Tag> : null
                }
                <Tag color={color[project.level || 0]}>{priority[project.level || 0]}</Tag>
                <Tag>{type[project.type || 0]}</Tag>
                {project.language !== undefined
                  ? project.language.map(item => <Tag key={item}>{item}</Tag>)
                  : null}
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {project.description}
                </Paragraph>
                <Form {...formItemLayout}>
                  <FormItem label="负责人">
                    {project.owner !== undefined
                      ? project.owner.map(item => <Tag key={item}>{item}</Tag>)
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
