/**
 *
 * ReuseTable
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
import makeSelectReuseTable from './selectors';
import reducer from './reducer';
import saga from './saga';



import { Spin, Table, Layout, Breadcrumb, Row, Col, Card, Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { colRequest } from './actions';
import './tables.css';
const antIcon = <Icon type="loading" style={{ fontSize: 44 }} spin />;


const { Header, Footer, Content } = Layout;
let reren = true;
let count = 1;
let dataTable = [];
let selectedCount = 0;
let col = [];
const columns = [{
  title: 'Table Name',
  dataIndex: 'tname',
  key: 'tname',
},
{
  title: 'Field',
  dataIndex: 'field',
  key: 'field',
},
{
  title: 'Datatype',
  dataIndex: 'dtype',
  key: 'dtype',
}];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    selectedCount = selectedRows.length;
    col = [];
    for (var i in selectedRows) {
      col.push({ table: selectedRows[i]['tname'], field: selectedRows[i]['field'] });
    }
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
    selectedCount = selectedRows.length;
    col = [];
    for (var i in selectedRows) {
      col.push({ table: selectedRows[i]['tname'], field: selectedRows[i]['field'] });
    }
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
    selectedCount = selectedRows.length;
    col = [];
    for (var i in selectedRows) {
      col.push({ table: selectedRows[i]['tname'], field: selectedRows[i]['field'] });
    }
  },
};


export class ReuseTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      indicator: "hidden",
      button_class: "login-form-button"
    }

    this.load_indicator = this.load_indicator.bind(this);
  }

  load_indicator() {
    this.setState({ indicator: '', button_class: 'hidden' })
  }

  submitCol = (values) => {
    console.log(selectedCount);
    if (selectedCount >= 1) {
      const { history } = this.props;
      console.log("col", col);
      let connection_name = this.props.output.connection_name;
      console.log("asd", this.props.output.connection_name);
      this.props.dispatch(colRequest({ connection_name, col, history }));
    }
    else {
      console.log("Select atleast 1 Field");
    }
  }

  render() {
    if (this.props.output) {
      if (reren) {
        for (let i in this.props.output.details) {
          let x = {
            key: count,
            tname: i,
            field: "-",
            dtype: "-"
          }
          count++;
          let temp = [];
          for (let j in this.props.output.details[i]) {
            let y = {
              key: count,
              tname: i,
              field: this.props.output.details[i][j][0],
              dtype: this.props.output.details[i][j][1]
            }
            count++;
            temp.push(y);
          }
          x["children"] = temp;
          count++;
          dataTable.push(x);
        }
      }
      reren = false;

    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <br />
            <br />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

              <form onSubmit={this.props.handleSubmit(values => this.submitCol(values))}>
                <Table columns={columns} rowSelection={rowSelection} dataSource={dataTable} />
                <Button block onClick={this.load_indicator} type="primary" htmlType="submit" className={this.state.button_class}>
                      Visualize
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

ReuseTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  /*eslint-enable */
  return {
    reusetable: makeSelectReuseTable(),
    output: state.getIn(['homePage', 'output']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'reuseTable', reducer });
const withSaga = injectSaga({ key: 'reuseTable', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: 'form',
  }),
)(ReuseTable);
