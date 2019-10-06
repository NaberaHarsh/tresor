import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper, Button, Container, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import callApi from "../utils/callApi";
import APIUrl from "../utils/APIUrl";
import { Redirect } from "react-router-dom";

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
      retrievePage: false
    };
  }

  viewDetails = e => {
    this.setState({
      retrieveId: e,
      retrievePage: true
    });
  };

  componentDidMount() {
    console.log(this.props.subCatId);

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

      this.setState({
        ProductList: response.data.product,
        dataGet:response.data.product.length
      });
    });
  }

  render() {
    const { retrievePage, retrieveId, ProductList,dataGet } = this.state;
    console.log(ProductList.length);
    
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
      <React.Fragment>
        <Container maxWidth="lg">
          
     {dataGet ?  <h3 className="total-count-product">{dataGet === 0 ? "No Product Found" : `No. of Product :${dataGet} `}</h3> : ""}
  
        <Grid container spacing={2}>
           
           {ProductList.map(data => (
             <Grid
               style={{ textAlign: "center" }}
               item
               xs={12}
               sm={12}
               md={4}
               lg={4}
             >
               <Paper className="marginB">
                 <img
                   className="img1"
                   src={`http://tresorjewelryinc.com/tresor-admin/${data.url}`}
                   alt=""
                 />
                 <div className="Rating">
                   <Typography
                     style={{ textAlign: "left", marginBottom: "30px" }}
                     variant="subtitle1"
                   >
                     {data.name}
                   </Typography>
                 </div>

                 <ThemeProvider>
                   <Button
                     onClick={() => this.viewDetails(`${data.product_id}`)}
                     style={{ width: "100%" }}
                     variant="contained"
                     color="teal"
                     className=""
                   >
                     View Details
                   </Button>
                 </ThemeProvider>
               </Paper>
             </Grid>
           ))}
         </Grid>
     
        </Container>
      </React.Fragment>
    );
  }
}

export default ProductList;
