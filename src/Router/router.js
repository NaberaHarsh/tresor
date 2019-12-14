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
import Header from '../component/header';


class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner:[],
      shows:[],
      refreshHead : true
    }


    
  }


  render() {
    
    console.log(this.props);

    return (
      <BrowserRouter>
      <Header
      category={this.props.category}
      
     /> 
      <Switch>
          <Route 
                path="/" 
                exact  
                render={(props) => <Deshboard 
                  data={this.props} 
                  
                  refreshHead = {this.state.refreshHead}
                {...props} 
                />}
           />
          <PrivateRoute path="/products/:catId/:subCatId" 
          exact={false} 
          component={Product}
          data = {this.props}
          />} />
          <PrivateRoute path='/details/:id' component={Details} />
           <Route path="/register" exact component={Register} />
          <Route 
          path="/login" 
           exact 
          

            render={(props) => 
            <Login 
              data={this.props} 
              
              refreshHead = {this.state.refreshHead}
              handleRefresh={(isRefresh) => {
                console.log("handle refresh called");
                this.setState({refreshHead : isRefresh});
                }}            
                {...props} 
            />}


             />
          <Route path="/forgot" exact component={Forgot} />
          <Route path="/reset_password/:token" exact={false} component={ResetPassword} />
        </Switch>
        
      </BrowserRouter>
    );  
  }
}

export default Routes;