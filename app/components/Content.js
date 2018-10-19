/*
* HomePage
*
* This is the first thing users see of our App, at the '/' route
*
* NOTE: while this component should technically be a stateless functional
* component (SFC), hot reloading does not currently support SFCs. If hot
* reloading is not a necessity for you then you can refactor it and remove
* the linting exception.
*/

import React from 'react';
import './homepage.css';
import { Layout, Breadcrumb } from 'antd';
import Testchart from './Testchart';

const { Header, Content } = Layout;

class Contentcomponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Testchart/>
        </div>
      </Content>
    );
  }
}

export default Contentcomponent;
