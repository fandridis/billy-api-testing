import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import User from "../pages/User";

export default ({ childProps }) =>
  <Switch>
    <Route path="/" exact component={Home} props={childProps} />
    <Route path="/user" exact component={User} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
