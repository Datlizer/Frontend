import { createSelector } from 'reselect';

/**
 * Direct selector to the visualizer state domain
 */
const selectVisualizerDomain = (state) => state.get('visualizer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Visualizer
 */

const makeSelectVisualizer = () => createSelector(
  selectVisualizerDomain,
  (substate) => substate.toJS()
);

export default makeSelectVisualizer;
export {
  selectVisualizerDomain,
};
