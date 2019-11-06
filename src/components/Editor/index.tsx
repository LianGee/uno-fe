import React, { Component } from 'react';
import E from 'wangeditor';
import { Icon } from 'antd';
import styles from './index.less';
import { EDITOR_MENU } from './config';

interface EditorProps {
  onChange: any;
  preview?: boolean;
  id?: number;
}

interface EditorState {
  value: any;
  preview?: boolean;
}

class Editor extends Component<EditorProps, EditorState> {
  static defaultProps = {
    onChange: () => {
    },
    preview: true,
    id: 0,
  };

  constructor(props: any) {
    super(props);
    const { preview } = this.props;
    this.state = {
      value: '',
      preview,
    };
  }

  componentDidMount(): void {
    const { id } = this.props;
    const elem = document.getElementById(`editor${id}`);
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    const { onChange } = this.props;
    editor.customConfig.onchange = (html: any) => {
      onChange(html);
      this.setState({
        value: html,
      });
    };
    editor.customConfig.menus = EDITOR_MENU;
    editor.customConfig.zIndex = 100;
    editor.create();
    const toolbars = document.getElementsByClassName('w-e-toolbar');
    for (let i = 0; i < toolbars.length; i += 1) {
      const toolBar: HTMLElement = toolbars[i] as HTMLElement;
      const editIcon = document.getElementById(`icon${id}`);
      if (toolBar && editIcon) {
        editIcon.style.display = 'block';
        toolBar.style.backgroundColor = '#fff';
        toolBar.append(editIcon);
      }
    }
  }

  onChange = (html: any) => {
    this.setState({
      value: html,
    });
  };

  modeChange = () => {
    const { preview } = this.state;
    this.setState({
      preview: !preview,
    });
  };

  render() {
    const { value, preview } = this.state;
    const { id } = this.props;
    return (
      <>
        <div id={`icon${id}`} style={{ display: 'none', marginLeft: 5 }}>
          <Icon type="fullscreen-exit" onClick={this.modeChange}/>
        </div>
        <div style={{ display: preview ? 'block' : 'none' }} id={`preview${id}`}>
          <Icon style={{ float: 'right' }} type="edit" onClick={this.modeChange}/>
          <div
            id={`content${id}`}
            className="w-e-text" style={{ overflow: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
        <div
          id={`editor${id}`}
          className={styles.editor}
          defaultValue={value}
          onChange={this.onChange}
          style={{ display: preview ? 'none' : 'block' }}
        />
      </>
    );
  }
}

export default Editor;
