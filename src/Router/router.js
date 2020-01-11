import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Deshboard from '../component/Deshboard';
import Product from '../component/Product';
import Details from '../component/Details';
import Register from '../component/Register';
import Login from '../component/Login';
import Forgot from '../component/Forgot';
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
      user_id: " ",
      refreshHead: true,
      cartList: [],

    }
  }

  componentDidMount() {
    const cartList = localStorage.getItem("cartList");
    const dataGet = localStorage.getItem("dataGet");

    if (cartList && dataGet && !navigator.onLine) {
      this.setState({
        lat_cart: JSON.parse(cartList),
        like_cart: JSON.parse(dataGet)
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
    console.log(this.state.idData);

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

    axios(requestOptions)
      .then(response => {
      })
      .catch(err => { });

    callApi(requestOptions, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem("cartList", JSON.stringify(response.data.cart));
      localStorage.setItem("dataGet", JSON.stringify(response.data.cart.length));
      this.setState({
        cartList: response.data.cart,
        dataGet: response.data.cart.length,
        loading: true
      });
    });

    console.log(this.state.cartList)
  }


  changeQuantity(p, e) {
    console.log("hello")
    let cart = this.state.cartList;
    let i = cart.indexOf(p)
    cart[i].quantity = parseInt(e.target.value);
    this.setState(
      { cartList: cart }
    )
  }



  addToCart(productDetail) {


    console.log(this.state.cartList);

    console.log("add to cart", productDetail);

    this.state.cartList.map(item => {

    });


    let isAvail = this.state.cartList.filter(item => item.product_id === productDetail.product_id);

    if (isAvail.length > 0) {

        console.log("inside exist");
      if(productDetail.quantity == 0){
        console.log("item quantity 0");
        this.setState({cartList: this.state.cartList.filter(item => item.product_id !== productDetail.product_id) })
      }else{
        console.log(productDetail.quantity);
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
          <Route path="/cart" exact
            render={() =>
              <Cart cart={this.state.cartList}
                cartItemCount={this.state.cartList.length}
                addToCart={this.addToCart.bind(this)}
                changeQuantity={this.changeQuantity.bind(this)}
              />} />

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
          <Route path="/forgot" exact component={Forgot} />
          <Route path="/reset_password/:token" exact={false} component={ResetPassword} />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default Routes;