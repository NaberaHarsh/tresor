import React, { Component } from "react";
// import { Table} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Container, Paper, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import { getLoginData } from "../utils/session";
import axios from "axios";
import APIUrl from "../utils/APIUrl";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { isLogin } from "../utils/session";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  sectionDesktop: {
    display: "flex",
    width: "100%",
    flexDirection: "row"
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  }
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductDetails: "",
      count: 0,
      product_id: "",
      quantity: "",
      user_id: " ",
      status: " ",
      show: true
    };
  }

  handleSubmit(productDetail) {
    const { product_id, quantity, user_id, status } = this.state;
    const userdata = {
      product_id: productDetail.product_id,
      quantity: productDetail.quantity,
      user_id: getLoginData().user_id,
      status: "exist"
    };
    console.log(userdata);

    // convert json to form data with '&' seprater
    const data = Object.keys(userdata)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(userdata[key])
        );
      })
      .join("&");
    const requestOptions = {
      method: "POST",
      url: APIUrl.url.AddToCart,
      data: data
    };

    axios(requestOptions)
      .then(response => {
        this.props.addToCart(productDetail);
      })
      .catch(err => {});
  }

  IncrementItem(p) {
    let plus = p.quantity++;
    this.setState({ quantity: plus });
  }
  DecreaseItem(p) {
    let minus = p.quantity--;
    this.setState({ quantity: minus });
  }

  processOrder() {
    const { user_id } = this.state;
    const processdata = { user_id: getLoginData().user_id };

    console.log(processdata);

    // convert json to form data with '&' seprater
    const data1 = Object.keys(processdata)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(processdata[key])
        );
      })
      .join("&");
    const requestOptions1 = {
      method: "POST",
      url: APIUrl.url.ProcessOrder,
      data: data1
    };

    axios(requestOptions1)
      .then(response => {})
      .catch(err => {});
  }

  componentDidMount() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"));
    if (counter1 != this.state.count) {
      this.setState({ count: counter1 });
    }
  }

  componentDidUpdate() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"));
    if (counter1 != this.state.count) {
      this.setState({ count: counter1 });
    }
  }

  orderPlaced() {
    alert("your order has been placed");
  }

  getValue(e) {
    let x = e.target.value;
    this.setState({
      search: x
    });
  }

  render() {
    if (this.props.cartItemCount > 0) {
      return (
        <div style={{ padding: "10px" }}>
          <Container maxWidth="lg">
            <Paper elevation={0} style={{ padding: "2px" }}>
              <p style={{ paddingLeft: "28px", fontSize: "16px" }}>
                {" "}
                Shopping Cart
              </p>
            </Paper>
            <br />

            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} xl={8} lg={8} md={8}>
                  <Grid container space={2}>
                    <Grid md={12} lg={12} container space={3}>
                      {this.props.cart.map(p => (

                        <Card style={{width:'100%', marginBottom:'8px', padding:'8px'}}>
                        <Grid
                          md={12}
                          lg={12}
                          sm={12}
                          xs={12}
                          container
                          space={3}
                        >
                          <Grid md={4} lg={4} sm={6} xs={6}>
                            <Link href={`/Details/${p.product_id}`}>
                              <center>
                                <img
                                  class="img-fluid"
                                  src={p.url}
                                  style={{
                                    maxHeight: 120,
                                    maxWidth: 120,
                                    height: "auto",
                                    width: "100%",
                                    border: "solid #515151 1px"
                                  }}
                                />
                              </center>
                            </Link>
                          </Grid>
                          <Grid md={8} lg={8} sm={6} xs={6} container space={2}>
                            <Grid md={3} lg={3} sm={12} xs={12}>
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "black",
                                  display: "block",
                                  fontSize: "14px"
                                }}
                              >
                                {p.product_name}
                              </div>
                            </Grid>
                            <Grid md={3} lg={3} sm={12} xs={12}>
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "black",
                                  fontSize: "14px",
                                  fontWeight: "bold"
                                }}
                              >
                                {p.price}/- Rs.{" "}
                              </div>
                            </Grid>

                            <Grid
                              md={3}
                              lg={3}
                              sm={8}
                              xs={8}
                              style={{ textAlign: "center" }}
                            >
                              <AddIcon
                                onClick={() => {
                                  this.IncrementItem(p);
                                  this.handleSubmit(p);
                                }}
                                style={{
                                  display: "inline",
                                  color: "black",
                                  height: "20px",
                                  width: "20px"
                                }}
                              />
                              <div
                                style={{
                                  display: "inline",
                                  verticalAlign: "super",
                                  paddingLeft: "10px",
                                  color: "black",
                                  fontWeight: "bold",
                                  paddingRight: "10px"
                                }}
                              >
                                {p.quantity}
                              </div>
                              <RemoveIcon
                                style={{
                                  display: "inline",
                                  color: "black",
                                  height: "20px",
                                  width: "20px"
                                }}
                                onClick={() => {
                                  this.DecreaseItem(p);
                                  this.handleSubmit(p);
                                }}
                              />
                            </Grid>
                            <Grid md={3} lg={3} sm={4} xs={4}>
                              <Tooltip title="Delete">
                                <DeleteIcon
                                  style={{
                                    alignItems: "center",
                                    height: "40px",
                                    width: "40px"
                                  }}
                                  onClick={() =>
                                    this.handleSubmit(
                                      Object.assign(p, { quantity: 0 })
                                    )
                                  }
                                />
                              </Tooltip>
                            </Grid>
                          </Grid>

                        </Grid>
                        </Card>

                      ))}
                    </Grid>

                    <Grid md={4} lg={4} sm={12} xs={12}></Grid>
                  </Grid>
              </Grid>

              <Grid item xs={12} sm={12} xl={4} lg={4} md={4}>
              

                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        CHECKOUT
                      </Typography>
                      <h6 style={{ color: "black" }}>
                        Total:{" "}
                        {this.props.cart.reduce(
                          (sum, p) => sum + p.price * p.quantity,
                          0
                        )}
                        /- Rs.
                      </h6>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link href="/order">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "black", color: "white" }}
                        onClick={() => {
                          this.processOrder();
                          this.orderPlaced();
                        }}
                      >
                        Proceed To Buy
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      );
    } else {
      return (
        <div style={{ padding: "20px" }}>
          <Paper style={{ width: "100% ! important" }}>
            <div
              style={{
                alignItems: "center",
                textAlign: "center",
                paddingTop: "100px",
                paddingBottom: "80px"
              }}
            >
              <div>
                <RemoveShoppingCartIcon
                  style={{ color: "grey", height: "100px ", width: "100%" }}
                />
              </div>
              <br />
              <div style={{ color: "grey", fontSize: "24px" }}>
                Your cart is empty !!!
              </div>
            </div>
          </Paper>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Cart);
