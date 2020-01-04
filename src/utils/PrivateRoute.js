import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getCookie from './getCookie';
import { isLogin } from './session';



export  const PrivateRoute = ({component : Component ,data, addToCart, ...rest}) =>  (
    <Route {...rest} render={props => (
        isLogin()
            ? <Component {...props} data={data} addToCart={addToCart}/>
            : <Redirect  to='/Login' />
        
     )
} />
)   



// login();
// props.history.push('/dashboard');