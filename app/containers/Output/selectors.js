import { createSelector } from 'reselect';

/**
 * Direct selector to the output state domain
 */
const selectOutputDomain = (state) => state.get('output');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Output
 */

const makeSelectOutput = () => createSelector(
  selectOutputDomain,
  (substate) => substate.toJS()
);

export default makeSelectOutput;
export {
  selectOutputDomain,
};
