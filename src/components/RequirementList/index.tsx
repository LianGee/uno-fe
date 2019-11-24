import React, { Component } from 'react';
import { Button, Input, Mentions, notification, Popover, Row, Table, Tag } from 'antd';
import Link from 'umi/link';
import { Project } from '@/models/project';
import { queryRequirementByProjectId, statusFlowApi, updateDateApi } from '@/pages/project/requirement/service';
import { Requirement } from '@/pages/project/requirement/data';
import { Constant } from '@/constant/requirement';
import { getStatusFlow } from '@/utils/StatusFlow';
import StatusFlowForm from '@/components/StatusFlowForm';
import styles from '@/pages/project/requirement/index.less';
import RequirementDateForm from '@/components/RequirementDateForm';
import { TIME_FORMAT } from '@/constant/global';

const { getMentions } = Mentions;

const { Search } = Input;

interface RequirementListProps {
  currentProject: Project;
}

interface RequirementListState {
  requirements: Requirement[];
  search: string;
  statusFormVisible: {};
  dateFormVisible: {};
}

const color = ['cyan', 'green', 'magenta'];

class RequirementList extends Component<RequirementListProps, RequirementListState> {
  statusFormRef: any;

  dateFormRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      requirements: [],
      search: '',
      statusFormVisible: {},
      dateFormVisible: {},
    };
  }

  componentDidMount(): void {
    this.initData(this.props);
  }

  componentWillUpdate(nextProps: Readonly<RequirementListProps>): void {
    if (nextProps.currentProject !== this.props.currentProject) {
      this.initData(nextProps);
    }
  }

  initData = (props: any) => {
    const { currentProject } = props;
    queryRequirementByProjectId({ projectId: currentProject.id }).then(response => {
      this.setState({
        requirements: response.data,
      });
    });
  };

  renderId = (value: any) => {
    const { currentProject } = this.props;
    return <Link
      to={`/project/requirement/detail?projectId=${currentProject.id}&id=${value}`}
      target="_blank"
    >
      #{value}
    </Link>;
  };

  submitStatusFlow = (id: any) => {
    this.statusFormRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      const statusFlow = {
        id,
        ...values,
        mentions: values.content ? getMentions(values.content).map((item: any) => item.value)
          : null,
      };
      statusFlowApi(statusFlow).then(response => {
        if (response.status === 0) {
          notification.success({ message: '状态流转成功' });
          const { statusFormVisible } = this.state;
          statusFormVisible[id] = false;
          this.setState({ statusFormVisible });
          this.initData(this.props)
        } else {
          notification.error({ message: response.msg });
        }
      });
    });
  };

  submitDate = (id: number) => {
    this.dateFormRef.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      const updateDate = {
        id,
        start: values.scheduling[0].format(TIME_FORMAT),
        end: values.scheduling[1].format(TIME_FORMAT),
        mentions: values.content ? getMentions(values.content).map((item: any) => item.value)
          : null,
        content: values.content,
      };
      updateDateApi(updateDate).then(response => {
        if (response.status === 0) {
          notification.success({ message: '更新日期成功' });
          const { dateFormVisible } = this.state;
          dateFormVisible[id] = {
            start: false,
            end: false,
          };
          this.dateFormRef.resetFields();
          this.setState({ dateFormVisible });
        } else {
          notification.error({ message: response.msg });
        }
      });
    });
  };

  handleVisibleChange = (visible: boolean, id: number, type: string) => {
    const { statusFormVisible, dateFormVisible } = this.state;
    if (type === 'status') {
      statusFormVisible[id] = visible;
    }
    if (type === 'start') {
      dateFormVisible[id] = {
        start: visible,
        end: false,
      };
    }
    if (type === 'end') {
      dateFormVisible[id] = {
        start: false,
        end: visible,
      };
    }
    this.setState({
      statusFormVisible,
      dateFormVisible,
    });
  };

  saveStatusFormRef = (form: any) => {
    this.statusFormRef = form;
  };

  saveDateFormRef = (form: any) => {
    this.dateFormRef = form;
  };

  renderType = (value: any) => <Tag color={color[value]}>{Constant.TYPE[value].text}</Tag>;

  renderPriority = (value: any) => <Tag color={color[value]}>{Constant.PRIORITY[value].text}</Tag>;

  renderAssignTo = (value: []) => value.map((item: any) => <Tag key={item}>{item}</Tag>);

  renderStatus = (value: number, row: any) => {
    const statusColor = [
      'blue', 'rgb(165, 158, 158)', 'blue', 'blue', 'blue', 'blue', 'cyan', 'green',
    ];
    const statusFlow = getStatusFlow(value);
    const { statusFormVisible } = this.state;
    if (!statusFormVisible.hasOwnProperty(row.id)) {
      statusFormVisible[row.id] = false;
    }
    return (
      <Popover
        visible={this.state.statusFormVisible[row.id] || false}
        onVisibleChange={visible => this.handleVisibleChange(visible, row.id, 'status')}
        content={
          <StatusFlowForm
            ref={this.saveStatusFormRef}
            id={row.id}
            statusFlow={statusFlow}
            onSubmit={() => this.submitStatusFlow(row.id)}/>
        } title="流转状态" trigger="click">
        <Tag color={statusColor[value]}>{Constant.STATUS[value].text}</Tag>
      </Popover>
    );
  };

  renderDate = (value: any, row: any, type: any) => {
    const { start, end } = row;
    const { dateFormVisible } = this.state;
    if (!dateFormVisible.hasOwnProperty(row.id)) {
      dateFormVisible[row.id] = {};
      dateFormVisible[row.id][type] = false;
    }
    return (
      <Popover
        visible={dateFormVisible[row.id][type]}
        onVisibleChange={visible => this.handleVisibleChange(visible, row.id, type)}
        content={
          <RequirementDateForm
            ref={this.saveDateFormRef} id={row.id}
            start={start} end={end} onSubmit={() => this.submitDate(row.id)}
          />
        }
        title="更改排期"
        trigger="click">
        {value}
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
      if (creators.indexOf(item.creator) < 0) {
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
        title: '开始日期',
        dataIndex: 'start',
        key: 'start',
        render: (value: any, row: any) => this.renderDate(value, row, 'start'),
      },
      {
        title: '截止日期',
        dataIndex: 'end',
        key: 'end',
        render: (value: any, row: any) => this.renderDate(value, row, 'end'),
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
        <Table
          columns={columns}
          dataSource={this.getSearchData(requirements, search)}
          rowKey="id"
        />
      </>
    );
  }
}

export default RequirementList;
