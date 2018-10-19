import { createSelector } from 'reselect';

/**
 * Direct selector to the tables state domain
 */
const selectTablesDomain = (state) => { return {tables: state.get('tables'), output: state.getIn(['homepage', 'connections', 'details']) } };

const selectTableDetails = (state) => state.getIn(['homepage', 'connections', 'details']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by Tables
 */

const makeSelectTables = () => createSelector(
  selectTablesDomain,
  selectTableDetails,
  (substate) => substate.toJS()
);

export default makeSelectTables;
export {
  selectTablesDomain,
  selectTableDetails
};
