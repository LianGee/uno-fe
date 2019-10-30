import React, { Component } from 'react';
import { Modal } from 'antd';
import SchedulingCreateForm from '@/components/SchedulingCreateModal/schedulingCreateForm';

interface SchedulingCreateModalProps {
  visible: boolean;
  title: string;
  onHandleOk: (arg: any) => void;
  onHandleCancel: () => void;
}

class SchedulingCreateModal extends Component<SchedulingCreateModalProps> {
  formRef = {};

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
        {/* eslint-disable-next-line no-return-assign */}
        <SchedulingCreateForm wrappedComponentRef={(inst: any) => this.formRef = inst}/>
      </Modal>
    );
  }
}

export default SchedulingCreateModal;
