import React, { Component } from 'react';
import { Avatar, Comment, List, Tooltip } from 'antd';
import moment from 'moment';
import styles from '@/pages/project/requirement/index.less';

interface CommentProps {
  comments: [];
}

export default class CommentList extends Component<CommentProps> {
  static defaultProps = {
    comments: [],
  };

  componentDidMount(): void {
  }

  render() {
    const { comments } = this.props;
    return (
      comments.length > 0 && (
        <List
          className={styles.comment}
          header={`${comments.length} replies`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item: any) => (
            <li>
              <Comment
                author={item.author.name}
                avatar={<Avatar src={item.author.avatar} alt={item.author.name}/>}
                content={item.content}
                datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            </li>
          )}
        />
      )
    );
  }
}
