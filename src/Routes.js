import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from './Components/Login';
import Signup from './Components/SignUp';
import Chat from './Components/Chat'
import Profile from "./Components/Profile";

const Routes = () => (
    <Switch>
        <Route exact path= "/" component= {Chat} />
        <Route exact path= "/login" component= {Login} />
        <Route exact path= "/signup" component= {Signup} />
        <Route exact path= "/profile" component= {Profile} />
    </Switch>
);

export default Routes;
