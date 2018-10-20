/**
 *
 * Visualizer
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
import makeSelectVisualizer from './selectors';
import reducer from './reducer';
import saga from './saga';
import Nav from 'components/Nav/Loadable';

import { Table,Layout, Breadcrumb, Row, Col,Card,Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { fetchRequest, colRequest } from './actions';


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

export class Visualizer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  submit = (values) => {
      console.log(typeof(values));
      console.log('values : ', values);
      const val = values.toObject();
      let { db_type,connection_name,name,address,password,username,port } = val;
      const { history } = this.props;
      this.props.dispatch(fetchRequest({ db_type,connection_name,name,address,password,username,port, history }));

  }

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

  componentDidUpdate(prevProps){
    if(this.props.output){
      console.log("Hi",this.props.output);

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
        <Nav/>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
          <br/>
          <br/>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <form onSubmit={this.props.handleSubmit(values => this.submit(values))}>
                <Field name="connection_name" component={props =><Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Connection Name" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
                <br/><br/>
                <Field name="name" component={props =><Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Database Name" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
                <br/>
                <br/>
                <Field name="db_type" component={props =><Input prefix={<Icon type="database" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Service Type" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
                    <br/>
                    <br/>
                <Field name="address" component={props =><Input prefix={<Icon type="paper-clip" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="IP / Domain Name" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
                  <br/>
                  <br/>
                <Field name="username" component={props =><Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
                  <br/>
                  <br/>
                <Field name="password" component={props =><Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
                  <br/>
                  <br/>
                <Field name="port" component={props =><Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Port Number" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
                  <br/><br/>
              <Button block type="primary" htmlType="submit" className="login-form-button">
                    Fetch
                </Button>
                  <br/>
              </form>

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Datlizer 2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

Visualizer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  /*eslint-enable */
  return {
    visualizer: makeSelectVisualizer(),
    output: state.getIn(['visualizer', 'output']),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'visualizer', reducer });
const withSaga = injectSaga({ key: 'visualizer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: 'form',
  }),
)(Visualizer);
