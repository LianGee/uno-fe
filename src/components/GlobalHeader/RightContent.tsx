import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';

import Avatar from './AvatarDropdown';
import styles from './index.less';
import ProjectDropdown from '@/components/GlobalHeader/ProjectDropdown';

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;
  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <span className={styles.item}>切换项目</span>
      <ProjectDropdown/>
      <Avatar/>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
