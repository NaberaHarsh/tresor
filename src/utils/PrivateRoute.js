import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getCookie from './getCookie';


export  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        getCookie('token')
            ? <Component {...props} />
            : <Redirect  to='/Login' />
        
     )
} />
)   
