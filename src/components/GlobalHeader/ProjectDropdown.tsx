import React from 'react';

import { Button, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ConnectState } from '@/models/connect';

export interface GlobalHeaderRightProps extends ConnectState {
  project: any;
  dispatch: Dispatch<any>;
}

class ProjectDropdown extends React.Component<GlobalHeaderRightProps> {
  setCurrentProject = (projectId: any) => {
    const { project, dispatch } = this.props;
    const curr = project.projects.filter((item: any) => item.id === Number(projectId)).pop();
    if (dispatch) {
      dispatch({
        type: 'project/current',
        payload: { ...curr },
      });
    }
  };

  changeProject = (e: any) => {
    this.setCurrentProject(e.key);
  };

  renderMenu = () => {
    const { project } = this.props;
    return (
      <Menu onClick={this.changeProject}>
        {project.projects.map((item: any) => (
          <Menu.Item key={item.id}>{item.name}</Menu.Item>
        ))}
      </Menu>
    );
  };

  render(): React.ReactNode {
    const { project } = this.props;
    const curr = project.currentProject;
    return <Dropdown overlay={this.renderMenu}>
      <Button type="primary" ghost>
        <strong>{curr.name}</strong>
        <Icon type="down"/>
      </Button>
    </Dropdown>;
  }
}

export default connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))(ProjectDropdown);
