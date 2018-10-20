/**
 *
 * Charts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCharts from './selectors';
import reducer from './reducer';
import saga from './saga';
import { LineChart, Line } from 'recharts';
import { Spin, List, Table, Layout, Breadcrumb, Row, Col, Card, Form, Icon, Input, Button, Checkbox, Select, Option } from 'antd';
import Sidebar from 'components/Sidebar';
import 'components/homepage.css';
import Nav from 'components/Nav/Loadable';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';
import { fetchConnRequest, ConnRequest } from './actions';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const { Header, Footer, Content } = Layout;
const { Meta } = Card;
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot,XAxis,YAxis, LineSeries, RadialChart,HeatmapSeries, BarSeries, VerticalBarSeries} from 'react-vis';

import regression from 'regression';

export class Charts extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount(){
    const result = regression.linear([[0, 1], [32, 67], [12, 79]]);
    const gradient = result.equation[0];
    const yIntercept = result.equation[1];
    console.log("m and c is ",gradient," and ",yIntercept);
    console.log("Prediction of x=9 is ",gradient*9+yIntercept);
  }
  render() {
    const data = [
      {x: 0, y: 8,color: 10},
      {x: 1, y: 5,color: 1},
      {x: 2, y: 4,color: 4},
      {x: 3, y: 9,color: 11},
      {x: 4, y: 1,color: 12},
      {x: 5, y: 7,color: 6},
      {x: 6, y: 6,color: 7},
      {x: 7, y: 3,color: 12},
      {x: 8, y: 2,color: 13},
      {x: 9, y: 0,color: 9}
    ];
    const data2=[{angle: 1}, {angle: 5}, {angle: 2}];
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <br />
            <br />
              <LineChart width={400} height={400} data={[{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {uv: 3000, pv: 1398, amt: 2210},
      {uv: 2000, pv: 9800, amt: 2290},
      {uv: 2780, pv: 3908, amt: 2000},
      {uv: 1890, pv: 4800, amt: 2181},
      {uv: 2390, pv: 3800, amt: 2500},
      {uv: 3490, pv: 4300, amt: 2100}]}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              </LineChart>
              <RadialChart
              data={data2}
              width={300}
              height={300} />
              <XYPlot height={300} width={300}>
               <LineSeries data={data} />
             </XYPlot>
             <XYPlot yDomain={[0, 300]} xType="ordinal" height={300} width={300}>
             <VerticalBarSeries data={data} />
              </XYPlot>
              <XYPlot height={300} width={300}>
                <XAxis />
                <YAxis />
                <HeatmapSeries colorRange={["red", "blue"]} data={data}/>
               </XYPlot>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Row gutter={0}>
                <Col span={8}>
                  <Link to="/display/bar">
                  <Card

                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://chartbrew.com/static/media/timeSeriesBar.3e08944c.PNG" />}
                  >
                    <Meta
                      title="Bar Chart"
                    />
                  </Card>
                  </Link>
                </Col>
                <Link to="/display/pie">
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://chartbrew.com/static/media/pieChartPattern.03c8013b.png" />}
                  >
                    <Meta
                      title="Pie Chart"
                    />
                  </Card>

                </Col>
                </Link>
                <Link to="/display/composed">
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://chartbrew.com/static/media/pieChartPattern.03c8013b.png" />}
                  >
                    <Meta
                      title="Composed Chart"
                    />
                  </Card>

                </Col>
                </Link>
                <Col span={8}>
                  <Link to="/display/line">
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://chartbrew.com/static/media/timeSeries.2fc45fbf.PNG" />}
                  >
                    <Meta
                      title="Line Chart"
                    />
                  </Card>
                  </Link>
                </Col>

              </Row>
              <br/><br/>
              <Row gutter={0}>
                <Col span={8}>
                  <Card
                    onClick={()=>{console.log("i")}}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Meta
                      title="Europe Street beat"
                      description="www.instagram.com"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Meta
                      title="Europe Street beat"
                      description="www.instagram.com"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Meta
                      title="Europe Street beat"
                      description="www.instagram.com"
                    />
                  </Card>
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

Charts.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  charts: makeSelectCharts(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'charts', reducer });
const withSaga = injectSaga({ key: 'charts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Charts);
