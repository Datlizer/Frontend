/**
 *
 * Tables
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
import makeSelectTables from './selectors';
import reducer from './reducer';
import saga from './saga';
import Nav from 'components/Nav/Loadable';
import { Table,Layout, Breadcrumb, Row, Col,Card,Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { colRequest } from './actions';


const { Header, Footer ,Content } = Layout;
let count=1;
let dataTable = [];
let selectedCount=0;
let col=[];
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
    selectedCount=selectedRows.length;
    col=[];
    for(var i in selectedRows){
      col.push({table:selectedRows[i]['tname'],field:selectedRows[i]['field']});
    }
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
    selectedCount=selectedRows.length;
    col=[];
    for(var i in selectedRows){
      col.push({table:selectedRows[i]['tname'],field:selectedRows[i]['field']});
    }
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
    selectedCount=selectedRows.length;
    col=[];
    for(var i in selectedRows){
      col.push({table:selectedRows[i]['tname'],field:selectedRows[i]['field']});
    }
  },
};



export class Tables extends React.Component { // eslint-disable-line react/prefer-stateless-function

  submitCol = (values) => {
      console.log(selectedCount);
      if(selectedCount>=1){
        const { history } = this.props;
        console.log("col",col);
        let connection_name=this.props.output.connection_name;
        console.log("asd",this.props.output.connection_name);
        this.props.dispatch(colRequest({ connection_name,col,history }));
      }
      else{
        console.log("Select atleast 1 Field");
      }
  }

  render() {
    if(this.props.output){
      for(let i in this.props.output.details){
        let x={
          key:count,
          tname:i,
          field:"-",
          dtype:"-"
        }
        count++;
        let temp=[];
        for(let j in this.props.output.details[i]){
          let y={
            key:count,
            tname:i,
            field:this.props.output.details[i][j][0],
            dtype:this.props.output.details[i][j][1]
          }
          count++;
          temp.push(y);
        }
        x["children"]=temp;
        count++;
        dataTable.push(x);
      }

    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
          <br/>
          <br/>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

              <form onSubmit={this.props.handleSubmit(values => this.submitCol(values))}>
              <Table columns={columns} rowSelection={rowSelection} dataSource={dataTable} />
                <Button block type="primary" htmlType="submit" className="login-form-button">
                      Visualize
                  </Button>
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

Tables.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  /*eslint-enable */
  return {
    tables: makeSelectTables(),
    output: state.getIn(['visualizer', 'output']),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'tables', reducer });
const withSaga = injectSaga({ key: 'tables', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: 'form',
  }),
)(Tables);
