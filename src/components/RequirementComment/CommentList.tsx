import React, { Component } from 'react';
import { Avatar, Comment, List, Tooltip } from 'antd';
import moment from 'moment';

interface CommentProps {
  comments: [];
}

export default class CommentList extends Component<CommentProps> {
  static defaultProps = {
    comments: [],
  };

  componentDidMount(): void {
  }

  getDisplayName = (name: string) => name.substr(name.length - 2, name.length);

  delete = (id: number) => {

  };

  render() {
    const { comments } = this.props;
    return (
      comments.length > 0 && (
        <List
          header={`${comments.length} replies`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item: any) => (
            <li>
              <Comment
                author={item.user.name}
                avatar={<Avatar style={{ backgroundColor: 'rgb(34, 149, 255)' }}
                                size="large">{this.getDisplayName(item.user.chineseName)}</Avatar>}
                content={item.content}
                datetime={
                  <Tooltip title={moment.unix(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment.unix(item.createdAt).fromNow()}</span>
                  </Tooltip>
                }
                actions={
                  [
                    <span onClick={() => this.delete(item.id)}>删除</span>,
                  ]
                }
              />
            </li>
          )}
        />
      )
    );
  }
}
