import React, { Component } from 'react';
import { Button } from 'antd';
import RegisterForm from '@/components/UserRegisterForm';
import styles from './index.less';

class Register extends Component {
  formRef: any;

  saveFormRef = (inst: any) => {
    this.formRef = inst;
  };

  onSubmit = () => {
    // eslint-disable-next-line consistent-return
    this.formRef.validateFields((err: any, values: any) => {
      if (err) {
        return err;
      }
      window.location.href = '/user/login';
    });
  };

  render() {
    return (
      <div className={styles.register}>
        <RegisterForm ref={this.saveFormRef}/>
        <Button onClick={this.onSubmit} style={{ float: 'right', marginRight: 40 }}>注册</Button>
      </div>
    );
  }
}

export default Register;
