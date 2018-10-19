/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';


import { Spin, List, Table, Layout, Breadcrumb, Row, Col, Card, Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import Nav from 'components/Nav/Loadable';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { fetchConnRequest, ConnRequest } from './actions';
import './homepage.css'
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const antIcon = <Icon type="loading" style={{ fontSize: 44 }} spin />;

const { Header, Footer, Content } = Layout;
let data = [];
let count = 1;
let dataTable = [];
let selectedCount=0;
let connection="";
let reren=true;
const columns = [{
  title: 'Connection Name',
  dataIndex: 'name',
  key: 'name',
},
{
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
},
{
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    selectedCount = selectedRows.length;
    connection = "";
    if (selectedRows.length == 1) {
      connection = selectedRows[0]['name'];
    }
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
    selectedCount = selectedRows.length;
    connection = "";
    if (selectedRows.length == 1) {
      connection = selectedRows[0]['name'];
    }
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
    selectedCount = selectedRows.length;
    connection = "";
    if (selectedRows.length == 1) {
      connection = selectedRows[0]['name'];
    }
  },
};

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);

    this.state = {
      indicator: "hidden",
      button_class: "login-form-button"
    }

    this.load_indicator = this.load_indicator.bind(this);
  }

  load_indicator(){
    this.setState({indicator:'',button_class:'hidden'})
  }

  submitConn = (values) => {
    console.log(selectedCount);
    if (selectedCount == 1) {
      const { history } = this.props;
      console.log("asd", connection);
      const connection_name = connection;
      this.props.dispatch(ConnRequest({ connection_name, history }));
    }
    else {
      console.log("Select only 1 connection");
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchConnRequest());
  }

  componentDidUpdate(prevProps) {
    if (this.props.connections) {
      console.log("Hi", this.props.connections);
    }

  }

  render() {
    if(this.props.connections){
      if(reren){
        for(let i in this.props.connections){
          let x={
            key:count,
            name:this.props.connections[i].connection_name,
            address:this.props.connections[i].address,
            type:this.props.connections[i].db_type
          }
          count++;
          dataTable.push(x);
        }
      }
      reren=false;
      console.log("ooo",dataTable);

    }


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <br />
            <br />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <form onSubmit={this.props.handleSubmit(values => this.submitConn(values))}>
                <Table columns={columns} rowSelection={rowSelection} dataSource={dataTable} />
                <Button block onClick={this.load_indicator} type="primary" htmlType="submit" className={this.state.button_class}>
                  Select Connection
                </Button>
                <Row className={this.state.indicator}>
                  <Col span={6} offset={11}><Spin indicator={antIcon} size="large" /></Col>
                </Row>
              </form>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Team Co-ordi's @ Hackinout 2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};



function mapStateToProps(state) {
  /*eslint-enable */
  return {
    homepage: makeSelectHomePage(),
    connections: state.getIn(['homePage', 'connections']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: 'form',
  }),
)(HomePage);
