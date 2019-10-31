import React, { Component } from 'react';
import { Modal } from 'antd';
import SchedulingForm from './CreateForm';

interface SchedulingCreateModalProps {
  visible: boolean;
  title: string;
  onHandleOk: (arg: any) => void;
  onHandleCancel: () => void;
}

class SchedulingCreateModal extends Component<SchedulingCreateModalProps> {
  formRef = {};

  saveFormRef = (inst: any) => {
    this.formRef = inst;
  };

  render() {
    const { visible, title, onHandleOk, onHandleCancel } = this.props;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={() => onHandleOk(this.formRef)}
        onCancel={() => onHandleCancel()}
        width="800px"
      >
        <SchedulingForm wrappedComponentRef={this.saveFormRef} />
      </Modal>
    );
  }
}

export default SchedulingCreateModal;
