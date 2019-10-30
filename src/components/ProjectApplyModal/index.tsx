import React from 'react';
import { Form, Input, Modal } from 'antd';
import ProjectPrioritySelect from '@/components/ProjectApplyModal/ProjectPrioritySelect';
import ProjectTypeSelect from '@/components/ProjectApplyModal/ProjectTypeSelect';
import ProjectLanguageSelect from '@/components/ProjectApplyModal/ProjectLanguageSelect';
import ProjectBusinessSelect from '@/components/ProjectApplyModal/ProjectBusinessSelect';
import UserSelect from '@/components/User';
import { ProjectConstant } from '@/constant/project';
import { Project } from '@/models/project';

interface ProjectApplyModalProps {
  visible: boolean;
  onCancel: any;
  onCreate: any;
  form: any;
  title: string;
  defaultProject: Project;
}

const defaultValues: Project = {
  name: '',
  priority: ProjectConstant.PRIORITY[0].value,
  description: '',
  type: ProjectConstant.TYPE[0].value,
  language: [ProjectConstant.LANGUAGE[0].value],
  business: 0,
  frontendHost: '',
  backendHost: '',
  owner: [],
  logo: '',
  id: 0,
};

const CreateProjectApplyModal = (props: ProjectApplyModalProps) => {
  const { visible, onCancel, onCreate, form, title, defaultProject } = props;
  const initialValues: Project = defaultProject === undefined ? defaultValues : defaultProject;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      visible={visible}
      title={title}
      width={700}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form {...formItemLayout}>
        <Form.Item label="服务名" extra="请输入小写全英文">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入3-10位小写全英文',
                pattern: '^[a-z]+$',
                min: 3,
                max: 10,
              },
            ],
            initialValue: initialValues.name,
            validateTrigger: 'onBlur',
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="等级">
          {getFieldDecorator('priority', {
            initialValue: initialValues.priority,
            rules: [
              {
                required: true,
                message: '请选择服务等级',
              },
            ],
            validateTrigger: 'onBlur',
          })(ProjectPrioritySelect())}
        </Form.Item>
        <Form.Item label="用途描述" extra="请简述服务用途">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: '5-40字',
                min: 5,
                max: 40,
              },
            ],
            initialValue: initialValues.description,
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="类型">
          {getFieldDecorator('type', {
            initialValue: initialValues.type,
            rules: [
              {
                required: true,
                message: '请选择类型',
              },
            ],
          })(ProjectTypeSelect())}
        </Form.Item>
        <Form.Item label="语言">
          {getFieldDecorator('language', {
            initialValue: initialValues.language,
            rules: [
              {
                required: true,
                message: '请选择语言',
              },
            ],
          })(ProjectLanguageSelect())}
        </Form.Item>
        <Form.Item label="业务线">
          {getFieldDecorator('business', {
            initialValue: initialValues.business,
            rules: [
              {
                required: true,
                message: '请选择业务线',
              },
            ],
          })(ProjectBusinessSelect())}
        </Form.Item>
        <Form.Item label="前端域名" extra="前端/后端域必填一个">
          {getFieldDecorator('frontendHost', {
            initialValue: initialValues.frontendHost,
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="后端域名" extra="前端/后端域必填一个">
          {getFieldDecorator('backendHost', {
            initialValue: initialValues.backendHost,
          })(<Input/>)}
        </Form.Item>
        <Form.Item
          label="负责人"
          extra="至少选择2个，第一个人为主负责人，后面为备岗。核心业务备岗不得少于2个"
        >
          {getFieldDecorator('owner', {
            initialValue: initialValues.owner,
            rules: [
              {
                required: true,
                min: 2,
                message: '负责人不得少于2个',
              },
            ],
          })(<UserSelect/>)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ProjectApplyModal = Form.create<ProjectApplyModalProps>()(CreateProjectApplyModal);

export default ProjectApplyModal;
