/**
 *
 * Spiderman
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSpiderman from './selectors';
import reducer from './reducer';
import saga from './saga';

import { Table,Layout, Breadcrumb, Row, Col,Card,Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import styled from 'styled-components';
import '../../../node_modules/react-vis/dist/style.css';
import * as V from 'victory';
import { VictoryBar, VictoryChart,VictoryLabel, VictoryPie, VictoryAxis,VictoryTheme } from 'victory';

const { Header, Footer ,Content } = Layout;
let carr=[];
let label=[];
let data=[];
let labelData=[];

export class Spiderman extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {dummy: true};
  }
  componentWillMount(){
    console.log("chart type is ",this.props.match.params.type);
    if(this.props.data){
      console.log("Hi",this.props.data);
      if(this.props.data.length==2){
        var map= {};
        this.props.data[1].data.map(item=>{if(map[item]){
          map[item]++;
        }
        else{
          map[item]=1;
        }
      });
      console.log("map",map);

      let count=1;
      for(var i in map){
        data.push({name:i,uv:map[i]});
        count++;
        carr.push(count);
        if(!label.includes(i)){
          label.push(i);
        }
      }
      this.setState({dummy:false});
      console.log("data",data);
      }


      if(this.props.data.length==3){
        var map= [];
        for(var i=0;i<this.props.data[1].data.length;i++){
          var temp = {name:this.props.data[1].data[i],uv:this.props.data[2].data[i]};
          map.push(temp);
        }
        data=map;
        console.log("data",data);
      }
    }

  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
          <br/>
          <br/>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Row type="flex" justify="center" align="top">
              <Col span={16}>
                {this.props.match.params.type=="pie"?
                  <svg viewBox="0 0 400 400">
                   <VictoryPie
                     theme={VictoryTheme.material}
                     standalone={false}
                     width={400} height={400}
                     data={data}
                     innerRadius={68} labelRadius={100}
                     style={{ labels: { fontSize: 20, fill: "white" } }}
                   />
                   <VictoryLabel
                     textAnchor="middle"
                     style={{ fontSize: 20 }}
                     x={200} y={200}
                     text=""
                   />
               </svg>:''
                }
                {this.props.match.params.type=="bar"?
                  <BarChart width={600} height={300} data={data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>

                  :''}

                  {this.props.match.params.type=="line"?
                    ''
                    :''}
              </Col>
            </Row>
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

Spiderman.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  /*eslint-enable */
  let data1=state.getIn(['tables', 'data']);
  if(!data1){
    data1=state.getIn(['reuseTable', 'data']);
  }
  return {
    spiderman: makeSelectSpiderman(),
    data: data1,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'spiderman', reducer });
const withSaga = injectSaga({ key: 'spiderman', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Spiderman);
