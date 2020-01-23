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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import callApi from "../utils/callApi";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    textAlign:'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #515151',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});



class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductDetails: "",
      count: 0,
      discount:[],
      product_id: "",
      quantity: "",
      user_id: " ",
      status: " ",
      show: true,
      open:false
    };
  }

  
   handleOpen = () => {
    this.setState({open:true})
  };

   handleClose = () => {
    this.setState({open:false})
    this.reload()
  };

discount(){
  
  const { user_id} = this.state;
    const userdata1 = {
          user_id: getLoginData().user_id,
        };
    console.log(userdata1);

    const data1 = Object.keys(userdata1)
    .map(key => {
      return (
        encodeURIComponent(key) + "=" + encodeURIComponent(userdata1[key])
      );
    })
    .join("&");
  const requestOptions1 = {
    method: "POST",
    url: APIUrl.url.GetHead,
    data: data1
  };

  axios(requestOptions1)
    .then(response => {
      console.log(userdata1)
    })
    .catch(err => {});

    callApi(requestOptions1, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem("discount", JSON.stringify(response.data.cart));
      this.setState({
        discount:response.data.cart,
        loading: true
      });
    });
  

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
        this.discount()
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
      .then(response => {
        this.handleOpen()
      })
      .catch(err => {});
  }

  componentDidMount() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"));
    if (counter1 != this.state.count) {
      this.setState({ count: counter1 });

    const discount = localStorage.getItem("discount");
  
  if ( discount && !navigator.onLine) {
    this.setState({
      lat_discount: JSON.parse(discount)
    }, () => {
    });
    return;
  } else if (!navigator.onLine) {
    alert("you are offline");
    return;
  }
  
  const { user_id} = this.state;
  const userdata1 = {
        user_id: getLoginData().user_id,
      };
  console.log(userdata1);

  const data1 = Object.keys(userdata1)
  .map(key => {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(userdata1[key])
    );
  })
  .join("&");
const requestOptions1 = {
  method: "POST",
  url: APIUrl.url.GetHead,
  data: data1
};

axios(requestOptions1)
  .then(response => {
    console.log(userdata1)
  })
  .catch(err => {});

  callApi(requestOptions1, (err, response) => {
    if (err) {
      return;
    }
    localStorage.setItem("discount", JSON.stringify(response.data.cart));
    this.setState({
      discount:response.data.cart,
      loading: true
    });
  });
console.log(this.state.discount)

    }
  }

  componentDidUpdate() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"));
    if (counter1 != this.state.count) {
      this.setState({ count: counter1 });
    }
  }

 reload(){
   window.location.reload()
 }

  render() 

  {
    const { classes } = this.props

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
                      {this.state.discount.map(p => (

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
                                {p.price} $ {" "}
                              </div>
                              { p.discount == 0 ?"":
                              <div
                              style={{
                                textAlign: "center",
                                color: "black",
                                fontSize: "12px",
                              
                              }}
                              >
                              Discount:{p.discount}%
                              </div>}
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
              

                <Card style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h1" style={{textAlign:'center',textDecoration:'underline'}}>
                        CHECKOUT
                      </Typography>
                      <p style={{ color:'black', textAlign:'center', fontSize:'14px'}}>
                        TOTAL:{" "}
                        
                        {this.props.cart.reduce(
                          (sum, p) => sum + p.price * p.quantity,
                          0
                        )}
                          $
                      </p>
                      
                        <p style={{ textAlign:'center', fontSize:'14px'}} >DISCOUNT : {this.state.discount.reduce(
                          (sum, p) => sum + ((p.price * p.quantity)*(p.discount))/100,
                          0)}
                      $
                        
                    </p>
                    <h6  style={{ color: "black", textAlign:'center', fontSize:'14px' }}>SUBTOTAL:{" "} {this.state.discount.reduce(
                          (sum, p) => (sum + p.price * p.quantity)- ((p.price * p.quantity)*(p.discount))/100,
                          0
                        )}
                        $</h6>
                    </CardContent>
                  
                  <CardActions style={{alignItems:'center'}}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "black", color: "white" }}
                        onClick={() => {
                          this.processOrder();
                        
                        }}
                      >
                        Proceed To Buy
                      </Button>
                     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={this.state.open}>
          <div className={classes.paper} >
            <h2 id="transition-modal-title">Your Order Is Placed</h2>
                               <Link href="/order">
 <Button style={{textAlign:'center',textDecoration:'underline'}}>Proceed To Orders</Button>
                                </Link>

</div>
        </Fade>
      </Modal>
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
