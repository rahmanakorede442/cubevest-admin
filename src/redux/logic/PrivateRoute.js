import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route   render={props => (
        localStorage.getItem('admin')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
    )} />
)