import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Contact from "../pages/Contact";

export default ({ childProps }) =>
  <Switch>
    <Route path="/" exact component={Home} props={childProps} />
    <Route path="/contact/:from" exact component={Contact} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;


/**
 * How to pass params to a Route
 * 
 *  <Route
 *    path='/routeUrl'
 *    render={(props) => <Contact {...props} someProp={1234} />}
 *  />
 * 
 */
 