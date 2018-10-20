/**
 *
 * Output
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
import makeSelectOutput from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Output extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Output</title>
          <meta name="description" content="Description of Output" />
        </Helmet>
      </div>
    );
  }
}

Output.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  output: makeSelectOutput(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'output', reducer });
const withSaga = injectSaga({ key: 'output', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Output);
