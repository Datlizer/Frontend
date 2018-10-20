import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from "react-router-dom";
import './homepage.css';

const { SubMenu } = Menu;
const { Sider } = Layout;

const hist = createHistory();

class Nav extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { activeItem: 'home' }
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentWillRecieveProps(newProps){
    const { history } = newProps.props;
    console.log(history.location.pathname);
    const pathn=history.location.pathname;
    if(pathn==="/"){
      this.setState({ defaultSelectedKeys: ['1'] });
    }
    else if(pathn==="add"){
      this.setState({ defaultSelectedKeys: ['2'] });
    }
    else{
      this.setState({ defaultSelectedKeys: ['3'] });
    }
  }
  componentWillMount(){
    const { history } = this.props;
    console.log(history.location.pathname);
    const pathn=history.location.pathname;
    if(pathn==="/"){
      this.setState({ defaultSelectedKeys: ['1'] });
    }
    else if(pathn==="add"){
      this.setState({ defaultSelectedKeys: ['2'] });
    }
    else{
      this.setState({ defaultSelectedKeys: ['3'] });
    }
  }
  change = (a, b) => {
    const { history } = this.props;
    history.push({pathname: a});
    this.setState({ defaultSelectedKeys: b });
  }

  handleItemClick = (e, { name }) => this.props.history.push({pathname: `/${name}`});

  render() {
    const { location, history } = this.props;
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.toggle}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={this.state.defaultSelectedKeys} mode="inline">
          <Menu.Item key="1" onClick={() => this.change('/', ['1'])}>
            <Icon type="pie-chart" />
            <span>Connections</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => this.change('/add', ['2'])}>
            <Icon type="desktop" />
            <span>Add New Connection</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={() => this.change('/fetch', ['3'])}>
            <Icon type="download" />
            <span>Fetch Tables</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Nav.propTypes = {

};

export default withRouter(Nav);
