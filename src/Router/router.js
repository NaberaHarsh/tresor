import React, { Component } from 'react';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import Main from '../component/Main';
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
          <Route path="/" exact  render={(props) => <Main data={this.props} {...props} />} />
          <PrivateRoute path="/products/:catId/:subCatId" exact={false} render={(props) => <Product data={this.props.category} {...props} />} />
          <PrivateRoute path='/Details/:id' component={Details} />
           <Route path="/Register" exact component={Register} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Forgot" exact component={Forgot} />
          <Route path="/ResetPassword/:token" exact={false} component={ResetPassword} />
        </Switch>
        
      </BrowserRouter>
    );  
  }
}

export default Routes;