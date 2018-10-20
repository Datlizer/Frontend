import { createSelector } from 'reselect';

/**
 * Direct selector to the filter state domain
 */
const selectFilterDomain = (state) => state.get('filter');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Filter
 */

const makeSelectFilter = () => createSelector(
  selectFilterDomain,
  (substate) => substate.toJS()
);

export default makeSelectFilter;
export {
  selectFilterDomain,
};
