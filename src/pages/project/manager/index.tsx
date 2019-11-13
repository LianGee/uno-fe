import { Dispatch } from 'redux';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Icon, List, notification } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProjectCard from '@/components/ProjectCard';
import styles from './index.less';
import ProjectApplyModal from '@/components/ProjectApplyModal';
import { ConnectState } from '@/models/connect';
import { Project } from '@/models/project';
import { save } from '@/pages/project/manager/service';

interface ProjectProps extends ConnectState {
  dispatch: Dispatch<any>;
}

interface ProjectState {
  visible: boolean;
}

@connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))
class ProjectManager extends Component<ProjectProps, ProjectState> {
  formRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  closeAddProjectModal = () => {
    this.setState({
      visible: false,
    });
  };

  openAddProjectModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleAddProject = () => {
    this.openAddProjectModal();
  };

  handleOk = () => {
    this.formRef.validateFields((err: any, values: any) => {
      if (!err) {
        save(values).then(response => {
          if (response.status === 0) {
            notification.success({ message: '添加成功' });
            this.closeAddProjectModal();
          } else {
            notification.error({ message: response.status });
          }
        });
      }
    });
  };

  handleCancel = () => {
    this.closeAddProjectModal();
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    const {
      project: { projects = [] },
    } = this.props;
    const { visible } = this.state;
    const nullData: Partial<Project> = {};
    return (
      <PageHeaderWrapper title={false}>
        <div className={styles.cardList}>
          <List<any>
            rowKey="id"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...projects, nullData]}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <ProjectCard project={item}/>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button
                    type="dashed"
                    className={styles.newButton}
                    onClick={this.handleAddProject}
                  >
                    <Icon type="plus"/> 新增项目
                  </Button>
                  <ProjectApplyModal
                    ref={this.saveFormRef}
                    visible={visible}
                    title="新增项目"
                    onCreate={this.handleOk}
                    onCancel={this.handleCancel}
                    defaultProject={(undefined as unknown) as Project}
                  />
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ProjectManager;
