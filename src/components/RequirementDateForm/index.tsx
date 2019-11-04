import { Button, Form, DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
import MentionAll from '@/components/Mention';

const { RangePicker } = DatePicker;

interface StatusFlowFormProps {
  form: any,
  onSubmit: any,
  start: any,
  end: any,
  id?: number,
}

const RegisterRequirementDateForm = (props: StatusFlowFormProps) => {
  const { onSubmit, id, start, end } = props;
  const { getFieldDecorator } = props.form;
  return <Form>
    <Form.Item label="起止时间">
      {
        getFieldDecorator('start', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: [moment(start), moment(end)],
        })(<RangePicker/>)
      }
    </Form.Item>
    <Form.Item label="通知相关负责人">
      {
        getFieldDecorator('information', {
          rules: [
            {
              required: true,
              message: '请填写通知信息',
            },
          ],
        })(<MentionAll rows={2}/>)
      }
      <Button type="primary" key={id} onClick={onSubmit} style={{ float: 'right' }}>通知</Button>
    </Form.Item>
  </Form>;
};
const RequirementDateForm = Form.create<StatusFlowFormProps>()(RegisterRequirementDateForm);
export default RequirementDateForm;
