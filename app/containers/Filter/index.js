/**
 *
 * Filter
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
import makeSelectFilter from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Filter extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Filter</title>
          <meta name="description" content="Description of Filter" />
        </Helmet>
      </div>
    );
  }
}

Filter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filter: makeSelectFilter(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'filter', reducer });
const withSaga = injectSaga({ key: 'filter', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Filter);
