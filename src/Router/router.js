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
import Cart from '../component/Cart';



class Routes extends Component {
  constructor(props) {
    super(props);


    this.state = {
      banner:[],
      shows:[],
      refreshHead : true,
      cart : []
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



  addToCart(productDetail){

    console.log("add to cart" , productDetail);
   
    this.state.cart.map(item => {

    });


    let isAvail = this.state.cart.filter(item => item.productId === productDetail.detail.product_id);

    if(isAvail.length > 0){

    }else{
      let updateCart = this.state.cart;

      updateCart.push({
        productId: productDetail.detail.product_id,
        quantity: 1,
        detail : productDetail,
        name : productDetail.detail.name,
        price : productDetail.detail.price,

      })
      
      this.setState({cart: updateCart});
    }
  }

  render() {
    
    const {  category } = this.state;

    return (
      <BrowserRouter>
      <Header
      category={this.props.category}
      cartItemCount={this.state.cart.length}
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
          <PrivateRoute path='/details/:id' 
          component={Details}
                                addToCart={this.addToCart.bind(this)}
 />
           <Route path="/register" exact component={Register} />
                      <Route path="/cart" exact 
                      render={()=> 
                      <Cart cart={this.state.cart} 
                      changeQuantity={this.changeQuantity.bind(this)}  
                      /> } />

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