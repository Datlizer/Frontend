import { createSelector } from 'reselect';

/**
 * Direct selector to the reuseTable state domain
 */
const selectReuseTableDomain = (state) => state.get('reuseTable');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ReuseTable
 */

const makeSelectReuseTable = () => createSelector(
  selectReuseTableDomain,
  (substate) => substate.toJS()
);

export default makeSelectReuseTable;
export {
  selectReuseTableDomain,
};
