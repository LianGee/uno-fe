import React, { Component } from 'react';
import { Transfer } from 'antd';
import { queryFakeList } from '@/pages/project/requirement/service';
import { Requirement } from '@/pages/project/requirement/data';
import { Link } from 'umi';

interface RequirementTransferProps {
  projectId: number;
}

interface RequirementTransferState {
  targetKeys: any
  data: any
}

class RequirementTransfer extends Component<RequirementTransferProps, RequirementTransferState> {
  constructor(props: any) {
    super(props);
    this.state = {
      targetKeys: [],
      data: [],
    };
  }

  componentDidMount(): void {
    const { projectId } = this.props;
    if (projectId) {
      this.getData(projectId);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<RequirementTransferProps>): void {
    if (nextProps !== this.props) {
      this.getData(nextProps.projectId);
    }
  }

  renderItem = (item: any) => {
    const { projectId } = this.props;
    return (
      <Link
        to={`/project/requirement/detail?projectId=${projectId}&id=${item.key}`}
        target="_blank"
      >
        {item.title}
      </Link>
    );
  };

  getData = (projectId: number) => {
    const data: any = [];
    queryFakeList({ projectId }).then(response => {
      // eslint-disable-next-line array-callback-return
      response.map((item: Requirement) => {
        data.push({
          key: item.id,
          title: item.title,
          description: item.content,
          chose: 0,
        });
      });
      this.setState({
        data,
      });
    });
  };

  handleChange = (targetKeys: any) => {
    this.setState({ targetKeys });
  };

  handlerFilter = (inputValue: any, item: any) => item.title.indexOf(inputValue) > -1;

  render() {
    const { data, targetKeys } = this.state;
    return (
      <Transfer
        listStyle={{
          width: 350,
          height: 300,
        }}
        dataSource={data}
        showSearch
        titles={['可交付需求', '已选择']}
        targetKeys={targetKeys}
        onChange={this.handleChange}
        filterOption={this.handlerFilter}
        render={this.renderItem}
      />
    );
  }
}

export default RequirementTransfer;
