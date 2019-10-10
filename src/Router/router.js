import React, { Component } from 'react';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import Main from '../component/Main';
import Product from '../component/Product';
import Details from '../component/Details';
import Register from '../component/Register';
import Login from '../component/Login';
import Forgot from '../component/Forgot';
import ResetPassword from '../component/ResetPassword';
// import {PrivateRoute} from '../utils/PrivateRoute';


class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner:[],
      shows:[],
    }
  }


  render() {
    console.log(this.props);
    

    return (
      <BrowserRouter>
      
      <Switch>
          <Route path="/" exact  render={(props) => <Main data={this.props} {...props} />} />
          <Route path="/products/:catId/:subCatId" exact={false} render={(props) => <Product data={this.props.category} {...props} />} />
          <Route path='/details/:id' component={Details} />
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