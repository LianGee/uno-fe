import { Button, DatePicker, Form, Radio } from 'antd';
import React from 'react';
import moment from 'moment';
import { Constant, ValueText } from '@/constant/requirement';
import Editor from '@/components/Editor';
import UserSelect from '@/components/UserSelect';
import { Requirement } from '@/pages/project/requirement/data';
import MentionAll from '@/components/Mention';
import RequirementComment from '@/components/RequirementComment';

const { RangePicker } = DatePicker;

interface RequirementFormProps {
  form: any;
  requirement: Requirement;
  onChange: any;
  onSubmit: any;
}

function contentChange(e: any) {
  console.log(e);
}

const RegisterRequirementForm = (props: RequirementFormProps) => {
  const { getFieldDecorator } = props.form;
  const { requirement, onSubmit } = props;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 4,
      },
    },
  };
  return (
    <Form {...formItemLayout}>
      <Form.Item label="优先级">
        {getFieldDecorator('priority', {
          initialValue: requirement.priority,
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Radio.Group>
            {Constant.PRIORITY.map((item: ValueText) => (
              <Radio value={item.value} key={item.value}>
                {item.text}
              </Radio>
            ))}
          </Radio.Group>,
        )}
      </Form.Item>
      <Form.Item label="类型">
        {getFieldDecorator('type', {
          initialValue: requirement.type,
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Radio.Group>
            {Constant.TYPE.map((item: ValueText) => (
              <Radio value={item.value} key={item.value}>
                {item.text}
              </Radio>
            ))}
          </Radio.Group>,
        )}
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
        })(<Editor onChange={contentChange} preview={window.location.href.indexOf('/requirement/detail') > -1}/>)}
      </Form.Item>
      <Form.Item label="指派给">
        {getFieldDecorator('assignTo', {
          rules: [
            {
              required: true,
              message: '必须指派给相关人员处理',
            },
          ],
          initialValue: requirement.assignTo,
        })(<UserSelect/>)}
      </Form.Item>
      <Form.Item label="排期">
        {getFieldDecorator('scheduling', {
          initialValue: requirement.start ?
            [moment(requirement.start), moment(requirement.end)] : [],
        })(<RangePicker/>)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {
          getFieldDecorator('comment', {})(<MentionAll rows={3}/>)
        }
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button style={{ float: 'right' }} onClick={onSubmit}>提交</Button>
      </Form.Item>
      {
        requirement.id !== undefined ? <Form.Item {...tailFormItemLayout}>
          <RequirementComment id={requirement.id}/>
        </Form.Item> : null
      }
    </Form>
  );
};

const RequirementForm = Form.create<RequirementFormProps>({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
})(RegisterRequirementForm);
export default RequirementForm;
