import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from "react-router-dom";
import './homepage.css';

const { SubMenu } = Menu;
const { Sider } = Layout;

const hist = createHistory();
console.log(hist);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      defaultSelectedKeys: ['1']
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  change = (a, b) => {
    const { history } = this.props;
    history.push({pathname: a});
    this.setState({ defaultSelectedKeys: b });
  }

  render() {
    const { location, history } = this.props;
    console.log("LOCATION", location, history);
    // if (location.pathname === '/') {
    //   history.push({ pathname: '/add' })
    // }
    // if (location.pathname === '/add') {
    //   history.push({ pathname: '/' })
    // }
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.toggle}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" onClick={() => this.change('/', ['1'])}>
            <Icon type="pie-chart" />
            <span>Connections</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => this.change('/add', ['2'])}>
            <Icon type="desktop" />
            <span>Add New Connection</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
