import React, { Component } from 'react';
import { Table } from 'antd';
import Link from 'umi/link';
import { Project } from '@/models/project';
import { queryFakeList } from '@/pages/project/requirement/service';
import { Requirement } from '@/pages/project/requirement/data';

interface RequirementListProps {
  currentProject: Project;
}

interface RequirementListState {
  requirements: Requirement[];
}

class RequirementList extends Component<RequirementListProps, RequirementListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      requirements: [],
    };
  }

  componentDidMount(): void {
    const { currentProject } = this.props;
    queryFakeList({ projectId: currentProject.id }).then(response => {
      this.setState({
        requirements: response,
      });
    });
  }

  componentWillUpdate(nextProps: Readonly<RequirementListProps>): void {
    if (nextProps !== this.props) {
      const { currentProject } = nextProps;
      queryFakeList({ projectId: currentProject.id }).then(response => {
        this.setState({
          requirements: response,
        });
      });
    }
  }

  renderId = (value: any) => (
    <Link to={`/project/requirement/detail?id=${value}`} target="_blank">
      #{value}
    </Link>
  );

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: this.renderId,
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
      }, {
        title: '创建者',
        dataIndex: 'creator',
        key: 'creator',
      }, {
        title: '指派给',
        dataIndex: 'assignTo',
        key: 'assignTo',
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      }, {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
      },
    ];
    const { requirements } = this.state;
    return (
      <Table columns={columns} dataSource={requirements} rowKey="id"/>
    );
  }
}

export default RequirementList;
