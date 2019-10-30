import React, { Component } from 'react';
import E from 'wangeditor';

interface EditorProps {

}

class Editor extends React.Component<EditorProps> {
  static state = {
    editorContent: '',
  };

  componentDidMount(): void {
    const elem = document.getElementById('editor');
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = (html: any) => {
      this.setState({
        editorContent: html,
      });
    };
    editor.create();
  }

  render() {
    return (
      <div id="editor">
        <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
      </div>
    );
  }
}

export default Editor;
