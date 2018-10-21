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


import { Cell,Scatter, ZAxis, ScatterChart, RadarChart, RadialBarChart, RadialBar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSpiderman from './selectors';
import reducer from './reducer';
import saga from './saga';
import ReactDOM from 'react-dom';

import { Popover,Table,Layout, Breadcrumb, Row, Col,Card,Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import styled from 'styled-components';
import '../../../node_modules/react-vis/dist/style.css';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryPie, VictoryAxis, VictoryTheme } from 'victory';
import FileSaver from 'file-saver'
import regression from 'regression';
import Nav from 'components/Nav/Loadable';

let result;
let gradient;
let yIntercept;

const { Header, Footer, Content } = Layout;
let carr = [];
let label = [];
let data = [];
let labelData = [];
var dataset = [];
const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#bcbd22", "#bcbd22", "#bcbd22", "#bcbd22", "#bcbd22"];
const spider = [{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
{ name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
{ name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
{ name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
{ name: 'Page E', uv: 1890, pv: 4800, amt: 2181 }]

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
};

const TriangleBar = (props) => {
  const { x, y, width, height } = props.background;
  const { fill } = props;
  console.log("pop",props);
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

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

  // Exports the graph as embedded JS or PNG
  exportChart(asSVG) {

      // A Recharts component is rendered as a div that contains namely an SVG
      // which holds the chart. We can access this SVG by calling upon the first child/
      let chartSVG = ReactDOM.findDOMNode(this.currentChart).children[0];

      if (asSVG) {
          let svgURL = new XMLSerializer().serializeToString(chartSVG);
          let svgBlob = new Blob([svgURL], {type: "image/svg+xml;charset=utf-8"});
          FileSaver.saveAs(svgBlob, "Datlizer" + ".svg");
      } else {
          let svgBlob = new Blob([chartSVG.outerHTML], {type: "text/html;charset=utf-8"});
          FileSaver.saveAs(svgBlob, "Datlizer" + ".html");
      }
  }

  render() {

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <br />
            <br />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Row type="flex" justify="center" align="top">
                <Popover content="Download Chart as SVG">
                  <Button onClick={()=>this.exportChart(true)} type="primary" shape="circle" icon="download" size='large' />
                </Popover>
                <Col span={16}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  {this.props.match.params.type == "pie" ?
                    <PieChart ref={(chart) => this.currentChart = chart} id="currentChart" width={800} height={400}>
                      <Pie data={data} cx={200} cy={200} outerRadius={150} fill="#8884d8" />
                      <Pie data={data} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                    </PieChart>
                    : ''
                  }
                  {this.props.match.params.type == "bar" ?
                    <BarChart ref={(chart) => this.currentChart = chart} id="currentChart" width={600} height={300} data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="uv" fill="url(#colorUv)" />
                    </BarChart>

                    : ''}

                  {this.props.match.params.type == "line" ?
                    <LineChart ref={(chart) => this.currentChart = chart} id="currentChart" width={600} height={300} data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />

                      <Line dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                    : ''}
                  {this.props.match.params.type == "composed" ?
                    <ComposedChart ref={(chart) => this.currentChart = chart} id="currentChart" width={730} height={250} data={data}>
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
                    <RadarChart ref={(chart) => this.currentChart = chart} id="currentChart" outerRadius={90} width={730} height={250} data={data}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} />
                      <Radar name="Sales in an year" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                    : ''}
                  {this.props.match.params.type == "radialbar" ?
                    <RadialBarChart ref={(chart) => this.currentChart = chart} id="currentChart" width={730} height={250} innerRadius="10%" outerRadius="80%" data={data} startAngle={180} endAngle={0}>
                      <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
                      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                      <Tooltip />
                    </RadialBarChart>
                    : ''}
                  {this.props.match.params.type == "scatter" ?
                    <ScatterChart ref={(chart) => this.currentChart = chart} id="currentChart" width={730} height={250}
                      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" name="stature" unit="" />
                      <YAxis dataKey="uv" name="weight" unit=" units" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter name="A school" data={data} fill="#8884d8" />
                    </ScatterChart>
                    : ''}
                    {this.props.match.params.type == "custom" ?
                      <BarChart width={600} height={300} data={data}
                            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                       <XAxis dataKey="name"/>
                       <YAxis/>
                       <CartesianGrid strokeDasharray="3 3"/>
                       <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar/>} label={{ position: 'top' }}>
                         {
                            data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={colors[index % 20]}/>
                            ))
                          }
                       </Bar>
                      </BarChart>
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
                  {this.state.predict ? <h2><br/><br/>Predicted answer is {this.state.ans} </h2> : ''}
                </Col>
              </Row>
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
