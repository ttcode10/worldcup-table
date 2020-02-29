import React from 'react';
import { Layout } from 'antd';
import { ReactComponent as Logo } from './../../logo.svg';

const { Header } = Layout;

const MainHeader = () => {
  return (
    <Header style={{ backgroundColor: '#F8F9FA', height: 48, width: '100%', marginBottom: 32 }}>
      <Logo />
    </Header>
  );
}

export default MainHeader;
