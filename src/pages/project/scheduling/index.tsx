import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Badge, Calendar, Popover, Timeline } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Moment } from 'moment';
import styles from './index.less';
import SchedulingRequirementList from '@/components/SchedulingRequirementList';
import SchedulingCreateModal from '@/components/SchedulingCreateModal';


interface ProjectSchedulingProps {
  project: any,
  scheduling: any,
  dispatch: Dispatch<any>;
}

interface ProjectSchedulingState {
  visible: boolean;
}

@connect(({ project, scheduling }: { project: any, scheduling: any }) => ({
  project, scheduling,
}))
class ProjectScheduling extends Component<ProjectSchedulingProps, ProjectSchedulingState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'scheduling/fetch',
      payload: {
        count: 8,
      },
    });
  }

  onSelect = (moment: Moment) => {
    const { scheduling } = this.props;
    const date = moment.format('YYYY-MM-DD');
    if (!scheduling.hasOwnProperty(date)) {
      this.openModal();
    }
  };

  dateCellRender = (value: Moment) => {
    const { scheduling } = this.props;
    const date = value.format('YYYY-MM-DD');
    const listData = scheduling[date] || [];
    const len = listData.length;
    return len === 0 ? (
      <div className={styles.emptyRequirement}>
      </div>
    ) : (
      <ul className={styles.events}>
        {listData.map((item: any) => (
          <Popover
            placement="rightBottom"
            content={<SchedulingRequirementList requirements={listData}/>}
            title="Title"
            key={item.id}
          >
            <li key={item.id}>
              <Badge status="success" text={item.content}/>
            </li>
          </Popover>
        ))}
      </ul>

    );
  };

  monthCellRender = (value: Moment) => {
    const { scheduling } = this.props;
    const month = value.format('YYYY-MM');
    const listData = [];
    for (let i = 1; i <= 31; i += 1) {
      const day = i > 10 ? String(i) : `0${i}`;
      if (scheduling[`${month}-${day}`]) {
        listData.push(...scheduling[`${month}-${day}`]);
      }
    }
    const len = listData.length;
    return len !== 0 ? (
      <div className="notes-month">
        <Timeline>
          {
            listData.map(item => (
              <Timeline.Item>{item.content}</Timeline.Item>
              ),
            )
          }
        </Timeline>
      </div>
    ) : null;
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  onHandleCancel = () => {
    this.closeModal();
  };

  onHandleOk = (thisForm: any) => {
    const { validateFieldsAndScroll } = thisForm.props.form;
    validateFieldsAndScroll((errors: any, values: any) => {
      if (!errors || !values) {
        this.closeModal();
      }
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <PageHeaderWrapper title={false}>
        <div className={styles.schedulingContent}>
          <Calendar dateCellRender={this.dateCellRender}
                    monthCellRender={this.monthCellRender}
                    onSelect={(e: any) => this.onSelect(e)}/>
        </div>
        <SchedulingCreateModal visible={visible} title="创建排期"
                               onHandleCancel={this.onHandleCancel}
                               onHandleOk={(thisForm: any) => this.onHandleOk(thisForm)}/>
      </PageHeaderWrapper>
    );
  }
}

export default ProjectScheduling;
