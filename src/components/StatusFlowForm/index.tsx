import { Button, Form, Radio } from 'antd';
import React from 'react';
import MentionAll from '@/components/Mention';
import { ValueText } from '@/constant/requirement';
import UserSelect from '@/components/UserSelect';

interface StatusFlowFormProps {
  statusFlow: ValueText[],
  form: any,
  onSubmit: any,
  id: number,
  visible?: boolean,
  onVisibleChange?: any;
}

const RegisterStatusFlowForm = (props: StatusFlowFormProps) => {
  const { statusFlow, onSubmit, id } = props;
  const { getFieldDecorator } = props.form;
  return <Form>
    <Form.Item label="流转状态">
      {
        getFieldDecorator('status', {
          rules: [
            {
              required: true,
            },
          ],
        })(<Radio.Group buttonStyle="solid">
          {
            statusFlow.map((item: any) => (
              <Radio.Button value={item.value} key={item.value}>
                {item.text}
              </Radio.Button>
            ))
          }
        </Radio.Group>)
      }
    </Form.Item>
    <Form.Item label="流转给">
      {
        getFieldDecorator('assignTo', {
          rules: [
            {
              required: true,
              message: '请选择指派对象',
            },
          ],
        })(<UserSelect/>)
      }
    </Form.Item>
    <Form.Item label="通知相关负责人">
      {
        getFieldDecorator('content', {
          rules: [
            {
              message: '请填写通知信息',
            },
          ],
          initialValue: null,
        })(<MentionAll rows={2}/>)
      }
      <Button type="primary" key={id} onClick={onSubmit} style={{ float: 'right' }}>通知并流转</Button>
    </Form.Item>
  </Form>;
};
const StatusFlowForm = Form.create<StatusFlowFormProps>()(RegisterStatusFlowForm);
export default StatusFlowForm;
