import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Deshboard from '../component/Deshboard';
import Product from '../component/Product';
import Details from '../component/Details';
import Register from '../component/Register';
import Login from '../component/Login';
import Forgot from '../component/Forgot';
import Order from '../component/order';
import OrderDetails from '../component/OrderDetails';
import ResetPassword from '../component/ResetPassword';
import { PrivateRoute } from '../utils/PrivateRoute';
import Header from '../component/header';
import Cart from '../component/Cart';
import APIUrl from "../utils/APIUrl";
import callApi from "../utils/callApi";
import { isLogin, getLoginData } from '../utils/session';
import axios from "axios";


class Routes extends Component {
  constructor(props) {
    super(props);


    this.state = {
      banner: [],
      shows: [],
      discount:[],
      orderDiscount:[],
      user_id: " ",
      refreshHead: true,
      cartList: [],
      orderList:[],

    }
  }

  componentDidMount() {
    const cartList = localStorage.getItem("cartList");
    const orderList = localStorage.getItem("orderList");
    const discount = localStorage.getItem("discount");
    const dataGet = localStorage.getItem("dataGet");

    if (cartList && orderList && dataGet && discount &&!navigator.onLine) {
      this.setState({
        lat_cart: JSON.parse(cartList),
        lat_discount: JSON.parse(discount),
        lat_order: JSON.parse(orderList),
        like_cart: JSON.parse(dataGet),
        like_order: JSON.parse(dataGet),
      }, () => {
      });
      return;
    } else if (!navigator.onLine) {
      alert("you are offline");
      return;
    }


    const { user_id } = this.state;
    if (isLogin()) {

      this.state.idData = { user_id: getLoginData().user_id };
    }
    else {
      this.state.idData = { user_id: '0' }
    }

    const data1 = Object.keys(this.state.idData)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(this.state.idData[key])
        );
      })
      .join("&");
    const requestOptions = {
      method: "POST",
      url: APIUrl.url.GetHead,
      data: data1
    };

    const data2 = Object.keys(this.state.idData)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(this.state.idData[key])
        );
      })
      .join("&");
    const requestOptions1 = {
      method: "POST",
      url: APIUrl.url.Order,
      data: data2
    };
    

    axios(requestOptions)
      .then(response => {
        
      })
      .catch(err => { });

      axios(requestOptions1)
      .then(response => {
      })
      .catch(err => { });

    callApi(requestOptions, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem("cartList", JSON.stringify(response.data.cart));
      localStorage.setItem("discount", JSON.stringify(response.data.discount_range));
      localStorage.setItem("dataGet", JSON.stringify(response.data.cart.length));
      this.setState({
        shows: response.data.shows,
        discount:response.data.discount_range,
        dataGet: response.data.shows.length,
        cartList: response.data.cart,
        dataGet: response.data.cart.length,
        loading: true,
        posts: response.data.posts
      });
    });

    
    callApi(requestOptions1, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem("orderList", JSON.stringify(response.data.orders));
      localStorage.setItem("dataGet", JSON.stringify(response.data.orders.length));
      this.setState({
        orderList: response.data.orders,
        dataGet: response.data.orders.length,
        loading: true
      });
    });
  }


  changeQuantity(p, e) {
    let cart = this.state.cartList;
    let i = cart.indexOf(p)
    cart[i].quantity = parseInt(e.target.value);
    this.setState(
      { cartList: cart }
    )
  }



  addToCart(productDetail) {




    this.state.cartList.map(item => {

    });


    let isAvail = this.state.cartList.filter(item => item.product_id === productDetail.product_id);

    if (isAvail.length > 0) {

      if(productDetail.quantity == 0){
        this.setState({cartList: this.state.cartList.filter(item => item.product_id !== productDetail.product_id) })
      }else{
      }
     

    } else {
      let updateCart = this.state.cartList;

      updateCart.push({
        product_id: productDetail.detail.product_id,
        quantity: productDetail.quantity !== undefined ? productDetail.quantity : 1,
        detail: productDetail,
        product_name: productDetail.detail.product_name,
        price: productDetail.detail.price,

      })

      this.setState({ cartList: updateCart });
    }
  }

  render() {

    const { category } = this.state;

    return (
      <BrowserRouter>
        <Header
          category={this.props.category}
          cartItemCount={this.state.cartList.length}
        />

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Deshboard
              data={this.props}
              shows={this.props.shows}
              refreshHead={this.state.refreshHead}
              {...props}
            />}
          />
          <PrivateRoute path="/products/:catId/:subCatId"
            exact={false}
            component={Product}
            addToCart={this.addToCart.bind(this)}

            data={this.props}
          />} />
          <PrivateRoute path='/details/:id'
            component={Details}
            addToCart={this.addToCart.bind(this)}
          />
          <Route path="/register" exact component={Register} />

          <PrivateRoute path="/cart" 
            component={Cart}
            discount={this.state.discount}
               cart={this.state.cartList}
                cartItemCount={this.state.cartList.length}
                addToCart={this.addToCart.bind(this)}
                changeQuantity={this.changeQuantity.bind(this)}
               />

          <Route
            path="/login"
            exact


            render={(props) =>
              <Login
                data={this.props}

                refreshHead={this.state.refreshHead}
                handleRefresh={(isRefresh) => {
                  this.setState({ refreshHead: isRefresh });
                }}
                {...props}
              />}


          />
<PrivateRoute
            path="/order"
            component ={Order}
            order={this.state.orderList}  
          />

<PrivateRoute
            path='/order_detail/:id'
            exact={false}
            component={OrderDetails}

          />

          <Route path="/forgot" exact component={Forgot} />
          <Route path="/reset_password/:token" exact={false} component={ResetPassword} />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default Routes;