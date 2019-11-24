import React, { Component } from 'react';
import { Icon, Row } from 'antd';
import styles from './index.less';

interface ToolbarProps {
  onEdit?: any;
  onNew?: any;
  onSave?: any;
  onPreview?: any;
}

class Toolbar extends Component<ToolbarProps> {
  render() {
    return (
      <Row style={{ marginTop: 5 }}>
        <Icon type="edit" className={styles.toolBarIcon} onClick={this.props.onEdit}/>
        <Icon type="file" className={styles.toolBarIcon} onClick={this.props.onNew}/>
        <Icon type="save" className={styles.toolBarIcon} onClick={this.props.onSave}/>
        <Icon type="fullscreen" className={styles.toolBarIcon} onClick={this.props.onPreview}/>
      </Row>
    );
  }
}

export default Toolbar;
