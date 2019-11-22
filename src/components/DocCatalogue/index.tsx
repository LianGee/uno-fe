import React, { Component } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

interface CatalogueProps {
  data?: any;
}

interface CatalogueState {
  data?: any;
}

class Catalogue extends Component<CatalogueProps, CatalogueState> {
  constructor(props: any) {
    super(props);
    const { data } = this.props;
    this.state = {
      data,
    };
  }

  componentWillReceiveProps(nextProps: any): void {
    const { data } = nextProps;
    this.setState({
      data,
    });
  }

  dragEnter = (info: any) => {
    console.log(info);
  };

  drop = (info: any) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data: any, key: any, callback: any) => {
      data.forEach((item: any, index: any, arr: any) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
        return undefined;
      });
    };
    // eslint-disable-next-line react/no-access-state-in-setstate
    const data = [...this.state.data];
    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item: any, index: any, arr: any) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item: any) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item: any) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar: any;
      let i: any;
      loop(data, dropKey, (item: any, index: any, arr: any) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      data,
    });
  };

  loop = (data: any) =>
    data.map((item: any) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.key} title={item.title}>
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title}/>;
    });

  render() {
    const { data } = this.state;
    return (
      <Tree
        draggable
        blockNode
        onDragEnter={this.dragEnter}
        onDrop={this.drop}
        style={{ marginTop: 20 }}
      >
        {
          this.loop(data)
        }
      </Tree>
    );
  }
}

export default Catalogue;
