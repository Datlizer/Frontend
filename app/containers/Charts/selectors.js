import { createSelector } from 'reselect';

/**
 * Direct selector to the charts state domain
 */
const selectChartsDomain = (state) => state.get('charts');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Charts
 */

const makeSelectCharts = () => createSelector(
  selectChartsDomain,
  (substate) => substate.toJS()
);

export default makeSelectCharts;
export {
  selectChartsDomain,
};
