import { Select } from 'antd';
import React, { Component } from 'react';
import { queryAllBusiness } from '@/services/business';

const { Option } = Select;

interface BusinessSelectProps {

}

interface BusinessSelectState {
  value: any;
  businesses: any;
}

class ProjectBusinessSelect extends Component<BusinessSelectProps, BusinessSelectState> {
  constructor(props: any) {
    super(props);
    const { value } = props;
    this.state = {
      value,
      businesses: [],
    };
  }

  componentDidMount(): void {
    queryAllBusiness().then(response => {
      this.setState({
        businesses: response.data,
      });
    });
  }

  render() {
    const { value, businesses } = this.state;
    return (
      <Select defaultValue={value}>
        {
          businesses.map((item: any) => (
            <Option value={item.id} key={item.id}>{item.chineseName}</Option>
          ))
        }
      </Select>
    );
  }
}

export default ProjectBusinessSelect;
