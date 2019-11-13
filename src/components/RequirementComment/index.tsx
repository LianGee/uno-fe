import React, { Component } from 'react';
import CommentList from '@/components/RequirementComment/CommentList';
import { queryRequirementComments } from '@/pages/project/requirement/service';

interface RequirementCommentProps {
  id: number;
}

interface RequirementCommentState {
  comments: [];
}

class RequirementComment extends Component<RequirementCommentProps, RequirementCommentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount(): void {
    const { id } = this.props;
    if (id) {
      queryRequirementComments(id).then(response => {
        this.setState({
          comments: response.data,
        });
      });
    }
  }

  render() {
    const { comments } = this.state;
    return <CommentList comments={comments} />;
  }
}

// @ts-ignore
export default RequirementComment;
