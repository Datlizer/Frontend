/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Signin from 'containers/Signin/Loadable';
import Signup from 'containers/Signup/Loadable';
import Visualizer from 'containers/Visualizer/Loadable';
import Spiderman from 'containers/Spiderman/Loadable';
import Tables from 'containers/Tables/Loadable';
import ReuseTable from 'containers/ReuseTable/Loadable';
import Charts from 'containers/Charts/Loadable';


export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/add" component={Visualizer} />
        <Route exact path="/display/:type" component={Spiderman} />
        <Route exact path="/tables" component={Tables} />
        <Route exact path="/select" component={ReuseTable} />
        <Route exact path="/fetch" component={ReuseTable} />
        <Route exact path="/charts" component={Charts} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
