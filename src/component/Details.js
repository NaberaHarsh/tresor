import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import callApi from "../utils/callApi";
import APIUrl from "../utils/APIUrl";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { getLoginData } from "../utils/session";
import InfoIcon from "@material-ui/icons/Info";
import CustomizedSnackbars from "./SnackBars";
import Menu from "@material-ui/core/Menu";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductDetails: {},
      UserDetails: {},
      bigImage: "",
      Detail: {},
      img: [],
      product_id: "",
      quantity: "",
      user_id: "  ",
      status: "",
      open: false,
      range: [],
      menu: null
    };
  }
  handleClick = event => {
    this.setState({ menu: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menu: null });
  };

  handleSubmit(productDetail) {
    const { product_id, quantity, user_id, status } = this.state;
    const userdata = {
      product_id: productDetail.detail.product_id,
      quantity: [1],
      user_id: getLoginData().user_id,
      status: "addnew"
    };
    this.setState({ product_id: product_id });

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
        this.setState({
          isToastOpen: true,
          message: response.data.msg,
          type: "success"
        });
      })
      .catch(err => {
        this.setState({
          isToastOpen: true,
          message: "Something went wrong",
          type: "error"
        });
      });
  }

  componentDidMount() {
    const range = localStorage.getItem("range");
    if (range && !navigator.onLine) {
      this.setState(
        {
          lat_range: JSON.parse(range)
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
      url: `${APIUrl.url.Detailproduct}/${this.props.match.params.id}`
    };

    callApi(requestOptions, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem(
        "range",
        JSON.stringify(response.data.detail.discount_range)
      );
      this.setState({
        range: JSON.parse(response.data.detail.discount_range),
        ProductDetails: response.data,
        Detail: response.data.detail,
        img: response.data.img,
        bigImage: `https://admin.tresorjewelryinc.com/tresor-admin/${response.data.img[0].url}`
      });
    });
  }

  ChangeImage = e => {
    this.setState({
      bigImage: `https://admin.tresorjewelryinc.com/tresor-admin/${e}`
    });
  };

  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {
    const { classes } = this.props;
    const { email } = this.state;

    const { bigImage, img, Detail, range } = this.state;
    return (
      <div>
        <Container maxWidth="lg" className="productCard1">
          <Grid item xs={12} sm={12}>
            <Grid container style={{ width: "100%" }}>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Paper>
                  <Card className="img-fluid">
                    <img className="img-fluid2" src={bigImage} alt="" />
                  </Card>
                </Paper>
                <Grid style={{ marginTop: "10px" }} container spacing={2}>
                  {img.map((data, index) => (
                    <Grid
                      key={`details-img-${index}`}
                      item
                      xs={3}
                      sm={3}
                      md={2}
                      lg={2}
                    >
                      <Card style={{ padding: "5px" }}>
                        <img
                          src={`https://admin.tresorjewelryinc.com/tresor-admin/${data.url}`}
                          alt="productimg"
                          style={{ width: "100%" }}
                          onClick={() => this.ChangeImage(data.url)}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item md={1} lg={1}></Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="section-heading">
                  <p
                    style={{
                      color: "#515151",
                      fontWeight: "800",
                      fontSize: "32px"
                    }}
                  >
                    {Detail.model}
                  </p>
                  <p>{Detail.name}</p>
                </div>

                <Grid container spacing={2}>
                  <Grid md={6} lg={6} sm={6} xs={6}>
                    {Detail.price && (
                      <div className="section-heading">
                        <p>
                          {" "}
                          <span
                            style={{
                              color: "#515151",
                              fontWeight: "600",
                              fontSize: "24px"
                            }}
                          >
                            Price:
                          </span>
                          <span style={{ fontSize: "18px", font: "helvetica" }}>
                            {" "}
                            ${Detail.price} / {Detail.unit_name}{" "}
                          </span>
                        </p>
                      </div>
                    )}
                  </Grid>
                  <Grid md={6} lg={6} sm={6} xs={6}>
                    {Detail.discount_range && this.state.range && (
                      <div className="section-heading">
                        <p>
                          {" "}
                          <span
                            style={{
                              color: "#515151",
                              fontWeight: "600",
                              fontSize: "24px"
                            }}
                          >
                            Discount:
                          </span>
                          <InfoIcon
                            style={{ color: "#135BD2", maxHeight: "22px" }}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={this.handleClick}
                          />
                          <Menu
                            id="simple-menu"
                            anchorEl={this.state.menu}
                            keepMounted
                            open={Boolean(this.state.menu)}
                            onClose={this.handleMenuClose}
                          >
                            <table>
                              <tr>
                                <th
                                  style={{ width: "60px", textAlign: "center" }}
                                >
                                  Qty{" "}
                                </th>
                                <th
                                  style={{ width: "60px", textAlign: "center" }}
                                >
                                  Disount
                                </th>
                              </tr>
                              {this.state.range && this.state.range.map(data => (
                                <tr>
                                  <td
                                    style={{
                                      width: "60px",
                                      textAlign: "center"
                                    }}
                                  >
                                    {data.quantity_from}-{data.quantity_to}
                                  </td>
                                  <td
                                    style={{
                                      width: "70px",
                                      textAlign: "center"
                                    }}
                                  >
                                    {data.quantity_discount}%
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </Menu>
                        </p>
                      </div>
                    )}
                  </Grid>
                </Grid>

                {Detail.description && (
                  <div style={{ marginTop: "12px", marginBottom: "10px" }}>
                    <h5
                      style={{
                        color: "#515151",
                        fontWeight: "800",
                        fontSize: "32px"
                      }}
                    >
                      Description
                    </h5>
                    <hr />
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#515151" }}
                    >
                      {Detail.description && (
                        <div
                          style={{ overflow: "auto" }}
                          dangerouslySetInnerHTML={{
                            __html: this.htmlDecode(Detail.description)
                          }}
                        />
                      )}
                    </Typography>
                    <hr />
                    <p
                      style={{
                        fontSize: "20px",
                        color: "black",
                        fontWeight: "bolder"
                      }}
                    >
                      {Detail.note &&
                        Detail.note
                          .split("\n")
                          .map(item => (
                            <li style={{ fontSize: "14px", color: "#515151" }}>
                              {item}
                            </li>
                          ))}
                    </p>

                    <br />
                  </div>
                )}
                <Button
                  variant="contained"
                  style={{
                    textAlign: "center",
                    backgroundColor: "black",
                    color: "white"
                  }}
                  onClick={() => {
                    this.handleSubmit(this.state.ProductDetails);
                    this.props.addToCart(this.state.ProductDetails);
                  }}
                >
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <CustomizedSnackbars
            isOpen={this.state.isToastOpen}
            message={this.state.message}
            type={this.state.type}
            handleClose={() => this.setState({ isToastOpen: false })}
          />
        </Container>
      </div>
    );
  }
}

export default Details;
