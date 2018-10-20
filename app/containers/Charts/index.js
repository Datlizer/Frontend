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


            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Row gutter={0}>
                <Col span={8}>
                  <Link to="/display/bar">
                  <Card

                    hoverable
                    style={{ width: 340 }}
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
                    style={{ width: 300 }}
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
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://chartbrew.com/static/media/pieChartPattern.03c8013b.png" />}
                  >
                    <Meta
                      title="Composed Chart"
                    />
                  </Card>

                </Col>
                </Link>
              </Row>
              <br/>
                <Row gutter={0}>
                <Link to="/display/radar">
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 340 }}
                    cover={<img alt="example" src="https://chartbrew.com/static/media/radarChart.63a285ab.PNG" />}
                  >
                    <Meta
                      title="Radar Chart"
                    />
                  </Card>

                </Col>
                </Link>
                <Link to="/display/radialbar">
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 320 }}
                    cover={<img alt="example" src="https://i.stack.imgur.com/5QPJh.png" />}
                  >
                    <Meta
                      title="Radial Bar Chart"
                    />
                  </Card>

                </Col>
                </Link>
                <Link to="/display/scatter">
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.mathsisfun.com/data/images/scatter-ice-cream1.svg" />}
                  >
                    <Meta
                      title="Scatter Chart"
                    />
                  </Card>

                </Col>
                </Link>
              </Row>
              <br/>
              <Row>
                <Col span={8}>
                  <Link to="/display/line">
                  <Card
                    hoverable
                    style={{ width: 340 }}
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
