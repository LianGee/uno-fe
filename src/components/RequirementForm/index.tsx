import { Form, Input, Radio } from 'antd';
import React from 'react';
import { Constant, ValueText } from '@/constant/requirement';
import Editor from '@/components/Editor';
import UserSelect from '@/components/User';
import { Requirement } from '@/pages/project/requirement/data';

interface RequirementFormProps {
  form: any;
  requirement: Requirement;
  onChange: any;
}

function contentChange(e: any) {
  console.log(e);
}

const RegisterRequirementForm = (props: RequirementFormProps) => {
  const { getFieldDecorator } = props.form;
  const { requirement } = props;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  return (
    <Form {...formItemLayout}>
      <Form.Item label="创建者">
        {
          getFieldDecorator('creator', {
            initialValue: requirement.creator,
            rules: [{
              required: true,
            }],
          })(<Input/>)
        }
      </Form.Item>
      <Form.Item label="优先级">
        {getFieldDecorator('priority', {
          initialValue: requirement.priority,
          rules: [
            {
              required: true,
            },
          ],
        })(<Radio.Group>
          {
            Constant.PRIORITY.map((item: ValueText) => (
                <Radio value={item.value} key={item.value}>{item.text}</Radio>
              ),
            )
          }
        </Radio.Group>)}
      </Form.Item>
      <Form.Item label="类型">
        {getFieldDecorator('type', {
          initialValue: requirement.type,
          rules: [
            {
              required: true,
            },
          ],
        })(<Radio.Group>
          {
            Constant.TYPE.map((item: ValueText) => (
                <Radio value={item.value} key={item.value}>{item.text}</Radio>
              ),
            )
          }
        </Radio.Group>)}
      </Form.Item>
      <Form.Item label="内容">
        {getFieldDecorator('content', {
          rules: [
            {
              required: true,
              min: 15,
              message: '最少15字',
            },
          ],
          initialValue: requirement.content,
        })(<Editor onChange={contentChange}/>)}
      </Form.Item>
      <Form.Item label="指派给">
        {getFieldDecorator('assignTo', {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: requirement.assignTo,
        })(<UserSelect/>)}
      </Form.Item>
    </Form>
  );
};

const RequirementForm = Form.create<RequirementFormProps>({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
})(RegisterRequirementForm);
export default RequirementForm;
