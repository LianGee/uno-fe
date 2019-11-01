import React, { Component } from 'react';
import { Mentions } from 'antd';
import { query } from '@/services/user';

const { Option } = Mentions;

interface MentionAllProps {
  placeholder: string;
  rows: number;
  onChange: any;
}

interface MentionAllState {
  value: string;
  users: [];
}

class MentionAll extends Component<MentionAllProps, MentionAllState> {
  static defaultProps = {
    placeholder: '使用@圈人',
    rows: 1,
    onChange: () => {
    },
  };

  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      users: [],
    };
  }

  componentDidMount(): void {
    query().then(res =>
      this.setState({
        users: res,
      }),
    );
  }

  render() {
    const { placeholder, rows, onChange } = this.props;
    const { value, users } = this.state;
    return <Mentions defaultValue={value} rows={rows} placeholder={placeholder} onChange={onChange}>
      {
        users.map((item: any) => (
          <Option key={item.id} value={item.name}>
            {item.name}
          </Option>
        ))
      }
    </Mentions>;
  }
}

export default MentionAll;
