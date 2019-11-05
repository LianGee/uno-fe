import React, { Component } from 'react';
import { DatePicker, Form, Input } from 'antd';
import { Publish } from '@/pages/project/publish/data';
import { queryFakeList } from '@/pages/project/requirement/service';
import Editor from '@/components/Editor';
import RequirementList from '@/components/PublishForm/RequirementList';


interface PublishFormProps {
  publish?: Publish;
  form: any;
}

interface PublishFormState {
  requirements?: [],
}

class RegistrationForm extends Component<PublishFormProps, PublishFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      requirements: [],
    };
  }

  componentDidMount(): void {
    const { publish } = this.props;
    if (publish) {
      queryFakeList({ projectId: publish.projectId as number }).then(response => {
        this.setState({
          requirements: response,
        });
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <>
        <Form {...formItemLayout}>
          <Form.Item label="标题">
            {
              getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input/>)
            }
          </Form.Item>
          <Form.Item label="截止日期">
            {
              getFieldDecorator('deadline', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<DatePicker/>)
            }
          </Form.Item>
          <Form.Item label="版本号(git)">
            {
              getFieldDecorator('version', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input/>)
            }
          </Form.Item>
          <Form.Item label="需求清单">
            {
              getFieldDecorator('requirements', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<RequirementList/>)
            }
          </Form.Item>
          <Form.Item label="测试结论">
            {
              getFieldDecorator('testConclusion', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Editor preview={false}/>)
            }
          </Form.Item>
        </Form>
      </>
    );
  }
}

const PublishForm = Form.create<PublishFormProps>()(RegistrationForm);

export default PublishForm;
