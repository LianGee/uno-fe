import React, { Component } from 'react';
import { Button, Input, Popover, Row, Table, Tag } from 'antd';
import Link from 'umi/link';
import { Project } from '@/models/project';
import { queryFakeList } from '@/pages/project/requirement/service';
import { Requirement } from '@/pages/project/requirement/data';
import { Constant } from '@/constant/requirement';
import { getStatusFlow } from '@/utils/StatusFlow';
import StatusFlowForm from '@/components/StatusFlowForm';
import styles from '@/pages/project/requirement/index.less';

const { Search } = Input;

interface RequirementListProps {
  currentProject: Project;
}

interface RequirementListState {
  requirements: Requirement[];
  search: string;
}

const color = ['cyan', 'volcano', 'magenta'];

class RequirementList extends Component<RequirementListProps, RequirementListState> {
  formRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      requirements: [],
      search: '',
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

  submitStatusFlow = () => {
    this.formRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.formRef.resetFields();
    });
  };

  saveFormRef = (form: any) => {
    this.formRef = form;
  };

  renderType = (value: any) => <Tag color={color[value]}>{Constant.TYPE[value].text}</Tag>;

  renderPriority = (value: any) => <Tag color={color[value]}>{Constant.PRIORITY[value].text}</Tag>;

  renderAssignTo = (value: []) => value.map((item: any) => <Tag key={item}>{item}</Tag>);

  renderStatus = (value: number, row: any) => {
    const statusColor = [
      '#2db7f5', '#f50', '#2db7f5', '#2db7f5', '#2db7f5', '#2db7f5', '#2db7f5', '#87d068',
    ];
    const statusFlow = getStatusFlow(value);
    return (
      <Popover content={
        <div>
          <StatusFlowForm
            ref={this.saveFormRef}
            id={row.id}
            statusFlow={statusFlow}
            onSubmit={this.submitStatusFlow}/>
        </div>
      } title="流转状态" placement="left" trigger="click">
        <Tag color={statusColor[value]}>{Constant.STATUS[value].text}</Tag>
      </Popover>
    );
  };

  onSearch = (value: string) => {
    this.setState({
      search: value,
    });
  };

  getSearchData = (requirements: Requirement[], search: string) => {
    if (search.length === 0) {
      return requirements;
    }
    const searchResults = [];
    for (let i = 0; i < requirements.length; i += 1) {
      const requirement = requirements[i];
      if (requirement.title.indexOf(search) > -1 || requirement.assignTo.indexOf(search) > -1){
        searchResults.push(requirement);
      }
    }
    return searchResults;
  };

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
        render: this.renderType,
      },
      {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        render: this.renderPriority,
        sorter: (a: any, b: any) => a.priority - b.priority,
      },
      {
        title: '创建者',
        dataIndex: 'creator',
        key: 'creator',
      },
      {
        title: '指派给',
        dataIndex: 'assignTo',
        key: 'assignTo',
        render: this.renderAssignTo,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: this.renderStatus,
      },
    ];
    const { requirements, search } = this.state;
    return (
      <>
        <Row>
          <Link
            to={{
              pathname: '/project/requirement/create',
            }}
            title="新建需求"
          >
            <Button type="primary" className={styles.newButton}>
              新建需求
            </Button>
          </Link>
          <Search
            placeholder="搜索表格"
            onSearch={this.onSearch}
            style={{ width: 200, float: 'right' }}
          />
        </Row>
        <Table columns={columns} dataSource={this.getSearchData(requirements, search)} rowKey="id"/>
      </>
    );
  }
}

export default RequirementList;
