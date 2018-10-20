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


import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSpiderman from './selectors';
import reducer from './reducer';
import saga from './saga';

import { Table, Layout, Breadcrumb, Row, Col, Card, Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import styled from 'styled-components';
import '../../../node_modules/react-vis/dist/style.css';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryPie, VictoryAxis, VictoryTheme } from 'victory';

import regression from 'regression';
let result;
let gradient;
let yIntercept;

const { Header, Footer, Content } = Layout;
let carr = [];
let label = [];
let data = [];
let labelData = [];
var dataset = [];
const spider = [{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
{ name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
{ name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
{ name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
{ name: 'Page E', uv: 1890, pv: 4800, amt: 2181 }]

const Search = Input.Search;

export class Spiderman extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { dummy: true, ans: 0, predict: false };
  }
  componentWillMount() {
    console.log("chart type is ", this.props.match.params.type);
    if (this.props.data) {
      console.log("Hi", this.props.data);
      if (this.props.data.length == 2) {
        var map = {};
        this.props.data[1].data.map(item => {
          if (map[item]) {
            map[item]++;
          }
          else {
            map[item] = 1;
          }
        });
        console.log("map", map);

        let count = 1;
        for (var i in map) {
          data.push({ name: i, uv: map[i] });
          count++;
          carr.push(count);
          if (!label.includes(i)) {
            label.push(i);
          }
        }
        if (this.props.match.params.type == "pie") {
          count = 1;
          data = [];
          carr = [];
          label = [];
          for (var i in map) {
            data.push({ name: i, value: map[i] });
            count++;
            carr.push(count);
            if (!label.includes(i)) {
              label.push(i);
            }
          }
        }
        this.setState({ dummy: false });
        console.log("data", data);

      }


      if (this.props.data.length == 3) {
        var map = [];

        for (var i = 0; i < this.props.data[1].data.length; i++) {
          dataset.push([this.props.data[1].data[i], this.props.data[2].data[i]]);
          var temp = { name: this.props.data[1].data[i], uv: this.props.data[2].data[i] };
          map.push(temp);
        }

        if (this.props.match.params.type == "pie") {
          map = [];
          for (var i = 0; i < this.props.data[1].data.length; i++) {
            var temp = { name: this.props.data[1].data[i], value: this.props.data[2].data[i] };
            map.push(temp);
          }
        }
        data = map;
        console.log("data", data);
      }

    }

  }

  predictData = (value) => {
    console.log(value);
    result = regression.linear(dataset);
    gradient = result.equation[0];
    yIntercept = result.equation[1];
    let ans = gradient * value + yIntercept;
    console.log('prediction of year 2018 is ', gradient * value + yIntercept);
    this.setState({ ans: ans, predict: true });
  }
  render() {

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <br />
            <br />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Row type="flex" justify="center" align="top">
                <Col span={16}>
                  {this.props.match.params.type == "pie" ?
                    <PieChart width={800} height={400}>
                      <Pie data={data} cx={200} cy={200} outerRadius={150} fill="#8884d8" />
                      <Pie data={data} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                    </PieChart>
                    : ''
                  }
                  {this.props.match.params.type == "bar" ?
                    <BarChart width={600} height={300} data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>

                    : ''}

                  {this.props.match.params.type == "line" ?
                    <LineChart width={600} height={300} data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />

                      <Line dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                    : ''}
                  {this.props.match.params.type == "composed" ?
                    <ComposedChart width={730} height={250} data={data}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid stroke="#f5f5f5" />
                      <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                    </ComposedChart>
                    : ''}
                  {this.props.match.params.type == "radar" ?
                    <RadarChart outerRadius={90} width={730} height={250} data={data}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} />
                      <Radar name="Sales in an year" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                    : ''}
                </Col>
              </Row>
            </div>
          </Content>
          <br />
          <Content style={{ margin: '0 16px' }}>
            <br />
            <br />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Row type="flex" justify="center" align="top">
                <Col span={16}>
                  {this.props.data.length == 3 ?
                    <Search
                      placeholder="input data to be predicted"
                      enterButton="Predict"
                      size="large"
                      onSearch={value => this.predictData(value)}
                    />
                    : ''}
                  {this.state.predict ? 'Predicted answer is ' + this.state.ans : ''}
                </Col>
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Team Beta Testers
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
  let data1 = state.getIn(['tables', 'data']);
  if (!data1) {
    data1 = state.getIn(['reuseTable', 'data']);
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
