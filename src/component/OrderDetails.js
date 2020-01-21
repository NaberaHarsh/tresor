import React, { Component } from "react";
// import { Table} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Container, Paper, Link } from "@material-ui/core";
import { withStyles, responsiveFontSizes } from "@material-ui/core/styles";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import { getLoginData } from "../utils/session";
import axios from "axios";
import APIUrl from "../utils/APIUrl";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { isLogin } from "../utils/session";
import callApi from "../utils/callApi";

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

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetailList: [],
      List: [],
      show: true
    };
  }

  componentDidMount() {
    const orderDetailList = localStorage.getItem("orderDetailList");
    const List = localStorage.getItem("List");
    const dataGet = localStorage.getItem("dataGet");

    if (orderDetailList && dataGet && List && !navigator.onLine) {
      this.setState(
        {
          lat_orderDetailList: JSON.parse(orderDetailList),
          lat_List: JSON.parse(List),
          like_orderDetailList: JSON.parse(dataGet)
        },
        () => {}
      );
      return;
    } else if (!navigator.onLine) {
      alert("you are offline");
      return;
    }

    const requestOptions = {
      method: "GET",
      url: `${APIUrl.url.UserOrder}/${this.props.match.params.id}`
    };
    callApi(requestOptions, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem(
        "orderDetailList",
        JSON.stringify(response.data.product)
      );
      localStorage.setItem("List", JSON.stringify(response.data));
      localStorage.setItem(
        "dataGet",
        JSON.stringify(response.data.product.length)
      );
      this.setState({
        orderDetailList: response.data.product,
        dataGet: response.data.product.length,
        List: response.data,
        loading: true
      });
    });
  }

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <Container maxWidth="lg">
          <Paper elevation={0} style={{ padding: "2px" }}>
            <Grid container space={2}>
              <Grid md={6} lg={6} sm={4} xs={4}>
                <p style={{ paddingLeft: "16px", fontSize: "14px" }}>
                  Order Details
                </p>
              </Grid>
              <Grid md={6} lg={6} sm={8} xs={8}>
                <p
                  style={{
                    textAlign: "right",
                    paddingRight: "16px",
                    fontSize: "14px"
                  }}
                >
                  Order Id:TJ-{this.state.List.order_date}-{this.state.List.order_id}
                </p>
              </Grid>
            </Grid>{" "}
          </Paper> 
          <br />
          <Grid item xs={12} sm={12}>
              <Grid container space={3}>
                <Grid md={12} lg={12} container space={3}>
                  {this.state.orderDetailList.map(p => (
                 <Card style={{width:'100%', marginBottom:'8px', padding:'8px'}}>

                    <Grid md={12} lg={12} sm={12} xs={12} container space={3}>
                      <Grid md={4} lg={4} sm={6} xs={6}>
                        <Link href={`/Details/${p.product_id}`}>
                          <center>
                            <img
                              class="img-fluid"
                              src={p.product_image}
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
                        <Grid md={4} lg={4} sm={12} xs={12}>
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
                        <Grid md={4} lg={4} sm={12} xs={12}>
                          <div
                            style={{
                              textAlign: "center",
                              color: "black",
                              fontSize: "14px"
                            }}
                          >
                            {p.price} ${" "}
                          </div>
                        </Grid>

                        <Grid
                          md={3}
                          lg={3}
                          sm={12}
                          xs={12}
                          style={{ textAlign: "center" }}
                        >
                          {/* <AddIcon  style={{ display: 'inline', color: 'black', height: '20px', width: "20px" }} /> */}

                          <div
                            style={{
                              display: "inline",
                              verticalAlign: "super",
                              paddingLeft: "10px",
                              color: "black",
                              fontSize: "14px",
                              paddingRight: "10px"
                            }}
                          >
                            Quantity:{p.quantity}
                          </div>
                          {/* <RemoveIcon style={{ display: 'inline', color: 'black', height: '20px', width: "20px" }} /> */}
                        </Grid>
                      </Grid>
                    </Grid>
                    </Card>
                  ))}
                </Grid>
              </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(OrderDetails);
