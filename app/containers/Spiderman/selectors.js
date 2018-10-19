import { createSelector } from 'reselect';

/**
 * Direct selector to the spiderman state domain
 */
const selectSpidermanDomain = (state) => state.get('spiderman');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Spiderman
 */

const makeSelectSpiderman = () => createSelector(
  selectSpidermanDomain,
  (substate) => substate.toJS()
);

export default makeSelectSpiderman;
export {
  selectSpidermanDomain,
};
