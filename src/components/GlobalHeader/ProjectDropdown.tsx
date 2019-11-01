import React from 'react';

import { Button, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ConnectState } from '@/models/connect';
import { Project } from '@/models/project';

export interface GlobalHeaderRightProps extends ConnectState {
  project: any;
  dispatch: Dispatch<any>;
}

export interface ProjectDropdownState {
  currentProject?: Project;
}

class ProjectDropdown extends React.Component<GlobalHeaderRightProps, ProjectDropdownState> {
  constructor(props: GlobalHeaderRightProps) {
    super(props);
    this.state = {
      currentProject: undefined,
    };
  }

  componentDidMount(): void {}

  changeProject = (e: any) => {
    const { project, dispatch } = this.props;
    const curr = project.projects.filter((item: any) => item.id === Number(e.key)).pop();
    this.setState({
      currentProject: curr,
    });
    if (dispatch) {
      dispatch({
        type: 'project/current',
        payload: { ...curr },
      });
    }
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
    const { currentProject = { name: '' } } = this.state;
    return project.projects.length === 0 ? null : (
      <Dropdown overlay={this.renderMenu}>
        <Button type="primary" ghost>
          <strong>{currentProject.name || project.projects[0].name}</strong>
          <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}

export default connect(({ project, user }: ConnectState) => ({
  project,
  user,
}))(ProjectDropdown);
