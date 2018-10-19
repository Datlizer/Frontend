/**
 *
 * Asynchronously loads the component for ReuseTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
