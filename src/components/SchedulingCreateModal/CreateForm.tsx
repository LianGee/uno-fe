import React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface SchedulingCreateFormProps extends FormComponentProps {}

class SchedulingCreateForm extends React.Component<SchedulingCreateFormProps> {
  componentDidMount(): void {}

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout}>
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: '请输入标题',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="关联需求"></Form.Item>
      </Form>
    );
  }
}

const SchedulingForm = Form.create<SchedulingCreateFormProps>()(SchedulingCreateForm);
export default SchedulingForm;
