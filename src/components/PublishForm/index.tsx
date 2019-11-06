import React, { Component } from 'react';
import { DatePicker, Form, Input } from 'antd';
import { Publish } from '@/pages/project/publish/data';
import Editor from '@/components/Editor';
import RequirementTransfer from '@/components/PublishForm/RequirementTransfer';


interface PublishFormProps {
  publish?: Publish;
  projectId: number;
  form: any;
}

interface PublishFormState {
}

class RegistrationForm extends Component<PublishFormProps, PublishFormState> {
  componentDidMount(): void {
  }

  render() {
    const { projectId } = this.props;
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
              })(<RequirementTransfer projectId={projectId}/>)
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
              })(<Editor id={0} preview={false}/>)
            }
          </Form.Item>
          <Form.Item label="验收报告">
            {
              getFieldDecorator('checkReport', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Editor id={1} preview={false}/>)
            }
          </Form.Item>
        </Form>
      </>
    );
  }
}

const PublishForm = Form.create<PublishFormProps>()(RegistrationForm);

export default PublishForm;
