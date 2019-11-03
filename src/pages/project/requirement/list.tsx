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
import RequirementDateForm from '@/components/RequirementDateForm';

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
  statusFormRef: any;

  dataFormRef: any;

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

  renderId = (value: any) => {
    const { currentProject } = this.props;
    return <Link
      to={`/project/requirement/detail?projectId=${currentProject.id}&id=${value}`}
      target="_blank"
    >
      #{value}
    </Link>;
  };

  submitStatusFlow = () => {
    this.statusFormRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      this.statusFormRef.resetFields();
    });
  };

  submitDate = () => {
    this.dataFormRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      this.dataFormRef.resetFields();
    });
  };

  saveStatusFormRef = (form: any) => {
    this.statusFormRef = form;
  };

  saveDateFormRef = (form: any) => {
    this.dataFormRef = form;
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
            ref={this.saveStatusFormRef}
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
      if (requirement.title.indexOf(search) > -1 || requirement.assignTo.indexOf(search) > -1) {
        searchResults.push(requirement);
      }
    }
    return searchResults;
  };

  getCreatorFilters = (requirements: Requirement[], search: string) => {
    const dataSource = this.getSearchData(requirements, search);
    const filters: any = [];
    const creators: any = [];
    dataSource.map((item: any) => {
      if (creators.indexOf(item.creator)) {
        creators.push(item.creator);
      }
      return null;
    });
    creators.map((item: any) => (
      filters.push({
        text: item,
        value: item,
      })
    ));
    return filters;
  };

  renderDate = (value: string, row: any) => {
    const { end } = row;
    return (
      <Popover content={
        <RequirementDateForm
          ref={this.saveDateFormRef} id={row.id}
          start={value} end={end} onSubmit={this.submitDate}
        />
      } title="更改排期" trigger="click">
        {value} ~ {end}
      </Popover>
    );
  };

  render() {
    const { requirements, search } = this.state;
    const { currentProject } = this.props;
    const creatorFilters = this.getCreatorFilters(requirements, search);
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
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: this.renderStatus,
      },
      {
        title: '创建者',
        dataIndex: 'creator',
        key: 'creator',
        filtered: true,
        filters: creatorFilters,
        onFilter: (value: any, record: any) => record.creator === value,
      },
      {
        title: '指派给',
        dataIndex: 'assignTo',
        key: 'assignTo',
        render: this.renderAssignTo,
      },
      {
        title: '排期',
        dataIndex: 'start',
        key: 'start',
        render: this.renderDate,
      },
    ];
    return (
      <>
        <Row>
          <Link
            to={{
              pathname: `/project/requirement/create?projectId=${currentProject.id}`,
            }}
            title="新建需求"
            target="_blank"
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
