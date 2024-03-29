import React, { Component } from 'react';
import { Select } from 'antd';
import { queryUsers } from '@/services/user';
import { CurrentUser } from '@/models/user';

const { Option } = Select;

interface UserSelectProps {
  width: string;
  onChange: any;
}

interface UserSelectState {
  users: CurrentUser[];
  value: [];
}

class UserSelect extends Component<UserSelectProps, UserSelectState> {
  static defaultProps = {
    width: '100%',
    onChange: () => {},
  };

  constructor(props: any) {
    super(props);
    const { value } = props;
    this.state = {
      users: [],
      value: value === undefined ? [] : value,
    };
  }

  componentDidMount(): void {
    queryUsers().then(res =>
      this.setState({
        users: res.data,
      }),
    );
  }

  render() {
    const { width, onChange } = this.props;
    const { users, value } = this.state;
    console.log('--->', this.props);
    return (
      <Select mode="multiple" style={{ width }} defaultValue={value} onChange={onChange}>
        {users.map((item: CurrentUser) => (
          <Option value={item.name} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    );
  }
}

export default UserSelect;
