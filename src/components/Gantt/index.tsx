import React, { Component } from 'react';
import Gantt from 'frappe-gantt';
import '@/../node_modules/frappe-gantt/dist/frappe-gantt.css';
import { Radio } from 'antd';
import { Project } from '@/models/project';

interface ScheduleGanttProps {
  project?: Project;
  mode?: string;
  tasks?: [];
}

interface ScheduleGanttState {
  gantt?: any;
}

class ScheduleGantt extends Component<ScheduleGanttProps, ScheduleGanttState> {
  ganttRef: any;

  static defaultProps = {
    project: undefined,
    mode: 'week',
    gantt: undefined,
  };

  componentDidMount(): void {
    const tasks = [
      {
        id: 'Task 1',
        name: 'Redesign website',
        start: '2016-12-28',
        end: '2016-12-31',
        progress: 20,
        dependencies: 'Task 2, Task 3',
      },
    ];
    const gantt = new Gantt(this.ganttRef, tasks);
    this.setState({
      gantt,
    });
  }

  saveRef = (node: any) => {
    this.ganttRef = node;
  };

  onModeChange = (e: any) => {
    const { gantt } = this.state;
    gantt.change_view_mode(e.target.value);
  };

  render() {
    const { mode } = this.props;
    return (
      <div>
        <Radio.Group defaultValue={mode} buttonStyle="solid" onChange={this.onModeChange}>
          <Radio.Button value="Day">天</Radio.Button>
          <Radio.Button value="Week">周</Radio.Button>
          <Radio.Button value="Month">月</Radio.Button>
        </Radio.Group>
        <svg ref={this.saveRef}/>
      </div>
    );
  }
}

export default ScheduleGantt;
