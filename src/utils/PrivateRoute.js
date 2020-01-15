import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getCookie from './getCookie';
import { isLogin } from './session';



export  const PrivateRoute = ({component : Component ,data,order, cart,cartItemCount,changeQuantity,  addToCart, ...rest}) =>  (
    <Route {...rest} render={props => (
        isLogin()
            ? <Component {...props} data={data} addToCart={addToCart} order={order} cart={cart} cartItemCount={cartItemCount}
            changeQuantity={changeQuantity}/>
            : <Redirect  to='/Login' />
        
     )
} />
)   



// login();
// props.history.push('/dashboard');