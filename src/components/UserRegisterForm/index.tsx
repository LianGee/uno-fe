import React, { Component } from 'react';
import { Form, Input } from 'antd';

interface RegisterProps {
  form: any
}

class RegistrationForm extends Component<RegisterProps> {
  confirmPassword = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = this.props.form;
    const password = getFieldValue('password');
    if (value !== password) {
      callback('两次密码不匹配');
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form {...formItemLayout}>
        <Form.Item label="用户名" extra="唯一的英文名，一般是邮箱前缀">
          {
            getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入3-10位英文名',
                  pattern: '^[a-z]+$',
                  min: 3,
                  max: 10,
                },
              ],
            })(<Input/>)
          }
        </Form.Item>
        <Form.Item label="中文名">
          {
            getFieldDecorator('chineseName', {
              rules: [
                {
                  required: true,
                  message: '请填写中文名',
                  pattern: '[\u4e00-\u9fa5]',
                  min: 2,
                  max: 10,
                },
              ],
            })(<Input/>)
          }
        </Form.Item>
        <Form.Item label="邮箱">
          {
            getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                },
                {
                  required: true,
                  message: '请填写公司邮箱',
                },
              ],
            })(<Input/>)
          }
        </Form.Item>
        <Form.Item label="密码" extra="8-16位密码">
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码',
                  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^]{8,16}$',
                },
              ],
            })(<Input.Password/>)
          }
        </Form.Item>
        <Form.Item label="确认密码">
          {
            getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: '请确认密码',
                },
                {
                  validator: this.confirmPassword,
                },
              ],
            })(<Input.Password/>)
          }
        </Form.Item>
      </Form>
    );
  }
}

const RegisterForm = Form.create<RegisterProps>()(RegistrationForm);

export default RegisterForm;
