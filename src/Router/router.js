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
import Cart from '../component/Cart'


class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner:[],
      shows:[],
      refreshHead : true
    }

    this.state.db={
      Cart:[
        {
          name:'Pearl Earring',
          image:'.././favicon/rrr.jpg',
          desc:'This is a sample description about the earring. It has size, color and merial used.',
          price:'999',
          quantity:'1',
        },
        {
          name:'New pendant',
          image:'.././favicon/pendant.jpg',
          desc:'This is a sample description about the Pendant. It has size, color and merial used.',
          price:'999',
          quantity:'1'
        
        },
        {
          name:'Bracelet',
          image:'.././favicon/bracelet.jpg',
          desc:'This is a sample description about the Bracelet. It has size, color and merial used.',
          price:'999',
          quantity:'1'
        }
      ]
    }


    
  }

  changeQuantity(p,e){
    let db = this.state.db;
    let i = db.Cart.indexOf(p)
     db.Cart[i].quantity = parseInt(e.target.value); 
    this.setState(
      {db:db}
    )
    console.log(db);
  }

  render() {
    

    return (
      <BrowserRouter>
      <Header
      category={this.props.category}
      db={this.state.db}
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
                      <Route path="/cart" exact render={()=> <Cart db={this.state.db} changeQuantity={this.changeQuantity.bind(this)}  /> } />

          <Route 
          path="/login" 
           exact 
          

            render={(props) => 
            <Login 
              data={this.props} 
              
              refreshHead = {this.state.refreshHead}
              handleRefresh={(isRefresh) => {
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