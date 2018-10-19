/**
 *
 * Signin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignin from './selectors';
import reducer from './reducer';
import saga from './saga';
import styled from 'styled-components';

import { Row, Col,Card,Form, Icon, Input, Button, Checkbox } from 'antd';

import { Field, reduxForm } from 'redux-form/immutable';
import { loginRequest } from './actions';





export class Signin extends React.Component { // eslint-disable-line react/prefer-stateless-function

  submit = (values) => {
      console.log(typeof(values));
      console.log('values : ', values);
      const val = values.toObject();
      let { username, password } = val;
      // this.props.dispatch(userdataRequest());
      console.log("User",username);
      console.log("pass",password);
      const { history } = this.props;
      this.props.dispatch(loginRequest({ password, username, history }));
  }

  render() {
    return (
      <Div>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={6}>
        <Card title="Login">
        <br/>
        <br/>
        <form onSubmit={this.props.handleSubmit(values => this.submit(values))}>
          <Field name="username" component={props =><Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
          <br/><br/>
          <Field name="password" component={props =><Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" onChange={e => props.input.onChange(e)} value={props.input.value}/>}/>
          <br/>
          <br/>
        <Button block type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
            <br/>
        </form>
        </Card>
      </Col>
    </Row>
  </Div>
    );
  }
}
//
// Signin.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  signin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signin', reducer });
const withSaga = injectSaga({ key: 'signin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: 'form',
  }),
)(Signin);

const Div = styled.div`
  background-image:url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  position: absolute;
    top: 50%;
    left: 25%;
    height: 30%;
    width: 100%;
    margin: -15% 0 0 -25%;
`;
