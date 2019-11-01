import React, { Component } from 'react';
import E from 'wangeditor';
import styles from './index.less';

interface EditorProps {
  onChange: any;
}

interface EditorState {
  value: any;
}

class Editor extends Component<EditorProps, EditorState> {
  static defaultProps = {
    onChange: () => {
    },
  };

  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount(): void {
    const elem = document.getElementById('editor');
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    const { onChange } = this.props;
    editor.customConfig.onchange = (html: any) => {
      onChange(html);
      this.setState({
        value: html,
      });
    };
    editor.create();
  }

  onChange = (html: any) => {
    this.setState({
      value: html,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div
        id="editor"
        className={styles.editor}
        defaultValue={value}
        onChange={this.onChange}
      />
    );
  }
}

export default Editor;
