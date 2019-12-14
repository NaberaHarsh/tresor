import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper, Button, Container, Grid } from "@material-ui/core";
import callApi from "../utils/callApi";
import APIUrl from "../utils/APIUrl";
import { Redirect } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductList: [],
      retrieveId: "",
      retrievePage: false,
      loading: false,
      skeleton: new Array(6).fill(true)
    };
  }

  viewDetails = e => {
    this.setState({
      retrieveId: e,
      retrievePage: true
    });
  };

  componentDidMount() {
    const ProductList = localStorage.getItem("ProductList");
    const dataGet = localStorage.getItem("dataGet");
    if (ProductList && dataGet &&  !navigator.onLine) {
      this.setState({
        lat_product: JSON.parse(ProductList),
        like_product:JSON.parse(dataGet)
      }, ()=> {
        console.log(this.state)
      });
      return;
    } else if (!navigator.onLine) {
      alert("you are offline");
      return;
    }

    let url = "";

    if (this.props.subCatId !== "0") {
      url = `${APIUrl.url.Products}/${this.props.catId}/${this.props.subCatId}`;
    } else {
      url = `${APIUrl.url.Products}/${this.props.catId}`;
    }
    const requestOptions = {
      method: "GET",
      url: url
    };

    callApi(requestOptions, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem("ProductList", JSON.stringify(response.data.product));
      localStorage.setItem("dataGet", JSON.stringify(response.data.product.length));
      this.setState({
        ProductList: response.data.product,
        dataGet: response.data.product.length,
        loading: true
      });
    });
  }

  render() {
    const {
      retrievePage,
      retrieveId,
      skeleton,
      loading,
      ProductList,
      dataGet
    } = this.state;

    if (retrievePage) {
      return (
        <Redirect
          to={{
            pathname: `/Details/${retrieveId}`,
            data: { retrieveId }
          }}
        />
      );
    }

    return (
      <div>
        <Container maxWidth="lg">
          {dataGet!=null ? (
            <h3 className="total-count-product">
              {dataGet === 0
                ? "No Product Found"
                : `No. of Product :${dataGet} `}
            </h3>
          ) : (
              ""
            )}

          <Grid container spacing={2}>
            {loading === true && dataGet !== 0 ? (
              <>
                {ProductList.map((data,index)  => (
                  <Grid 
                    style={{ textAlign: "center" }}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    key={index}
                  >
                    <Paper key={`product-list-${index}`} className="marginB">
                      <img 
                        className="img1"
                        src={`http://admin.tresorjewelryinc.com/tresor-admin/${data.url}`}
                        alt=""
                      />
                      <div className="Rating">
                        <Typography
                          style={{
                            textAlign: "left",
                            height: "70px",
                            marginBottom: "6px",
                            color: 'black'
                          }}
                          variant="subtitle1"
                        >
                          {data.name}
                        </Typography>
                      </div>


                      <Button
                        onClick={() => this.viewDetails(`${data.product_id}`)}
                        style={{ width: "100%", backgroundColor: "black", color: 'white' }}
                        variant="contained"

                      >
                        View Details
                        </Button>

                    </Paper>
                  </Grid>
                ))}{" "}
              </>
            ) : (
                <>
                  {" "}
                  {skeleton.map((item,index) => (
                    <Grid   key={`skele-pro-${index}`}
                      style={{ textAlign: "center" }}
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      
                    >
                      <Paper className="marginB">
                        <Skeleton   variant="rect" className="skeleton-img1" />
                        <div className="Rating">
                          <div>
                            <Skeleton height={6} />
                            <Skeleton height={6} width="80%" />
                          </div>
                        </div>


                        <Button
                          style={{ width: "100%" }}
                          variant="contained"

                        >

                        </Button>

                      </Paper>
                    </Grid>
                  ))}
                </>
              )}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ProductList;
