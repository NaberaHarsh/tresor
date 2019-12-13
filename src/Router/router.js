import React, { Component } from 'react';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import Deshboard from '../component/Deshboard';
import Product from '../component/Product';
import Details from '../component/Details';
import Register from '../component/Register';
import Login from '../component/Login';
import Forgot from '../component/Forgot';
import ResetPassword from '../component/ResetPassword';
import {PrivateRoute} from '../utils/PrivateRoute';


class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner:[],
      shows:[],
    }
  }


  render() {
    

    return (
      <BrowserRouter>
      
      <Switch>
          <Route path="/" exact  render={(props) => <Deshboard data={this.props} {...props} />} />
          <PrivateRoute path="/products/:catId/:subCatId" exact={false} render={(props) => <Product data={this.props.category} {...props} />} />
          <PrivateRoute path='/details/:id' component={Details} />
           <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/forgot" exact component={Forgot} />
          <Route path="/reset_password/:token" exact={false} component={ResetPassword} />
        </Switch>
        
      </BrowserRouter>
    );  
  }
}

export default Routes;