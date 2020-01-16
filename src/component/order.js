import React, { Component } from "react";
import { Container, Link, Paper, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import Skeleton from "@material-ui/lab/Skeleton";
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import { getLoginData } from '../utils/session';
import axios from "axios";
import APIUrl from "../utils/APIUrl";
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';



class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_id: "",
      quantity: "",
      user_id: " "
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {

    if (prevState !== nextProps) {

      return {
        like_order: nextProps.like_order,
        loading: true
      };
    }

    // Return null to indicate no change to state.
    return null;

  }

  handleSubmit(orderDetail) {
    const { order_id, user_id } = this.state;
    const userdata = { order_id: orderDetail.order_id, user_id: getLoginData().user_id };
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
      method: 'POST',
      url: APIUrl.url.UserOrder,
      data: data,

    };

    axios(requestOptions)
      .then(response => {
        this.props.addToCart(orderDetail);
      })
      .catch(err => { });
  };



  render() {
if(this.props.order.length>0){

  return (

    <div style={{ padding: '10px' }}>
      <hr />
      <p>My Orders</p>
      <hr />
      <Container maxWidth="lg" className="card1">
        <Paper style={{ width: "100% ! important", padding: '20px' }}>
          <Grid container spacing={4}>

            {this.props.order.map(p =>
              <Grid
                style={{ textAlign:"center" }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Paper className="marginB">
                  <div className="Rating" style={{ padding: '24px', }}>
                    <Grid container spacing={4}>
                    <Grid
                     xs={12}
                     sm={12}
                     md={2}
                     lg={2}
                     >
                    <Typography
                      style={{
                        alignItems:'initial',
                        textAlign:'center',
                        color: 'black'
                      }}
                    >
                     <span style={{fontWeight:'bold'}}> Order ID </span>: TJ2020{p.order_id}
                    </Typography>
                    </Grid>
                    <Grid
                     xs={12}
                     sm={12}
                     md={2}
                     lg={2}
                     >
                    <Typography
                      style={{
                        alignItems:'initial',
                        textAlign: "center",
                        color: 'black'
                      }}
                    >
                      <span style={{fontWeight:'bold'}}>Total Amount</span>: {p.amount}
                    </Typography>
                    </Grid>
                    <Grid
                     xs={12}
                     sm={12}
                     md={2}
                     lg={2}
                     >
                    <Typography
                      style={{   
                                             alignItems:'initial',
                        textAlign: "center",
                        color: 'black'
                      }}
                    >
                     <span style={{fontWeight:'bold'}}>No. Of Products</span>: {p.total_products_of_quantity}
                    </Typography>
                    </Grid>
                    <Grid
                     xs={12}
                     sm={12}
                     md={3}
                     lg={3}
                     >
                    <Typography
                      style={{
                        alignItems:'initial',

                        textAlign: "center",
                        color: 'black'
                      }}
                    >
                    <span style={{fontWeight:'bold'}}>  Ordered on</span>:{p.created}
                    </Typography>
                    </Grid>
                    <br />
                    <br />
                    <Grid
                     xs={12}
                     sm={12}
                     md={3}
                     lg={3}
                     >
                    <Link href={`/order_detail/${p.order_id}`}>
                    <Button variant='contained' style={{ backgroundColor: "black", color: 'white' }}
                     onClick={() => {this.handleSubmit(p); }}
                     >
View Details
                       </Button>
                       </Link>
                       </Grid>
                       </Grid>

                  </div>
                </Paper>
              </Grid>)}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
else{
  return (


    <div style={{ padding: '20px' }}>
      <Paper style={{ width: "100% ! important" }}>
        <div style={{ alignItems: 'center', textAlign: 'center', paddingTop: '100px', paddingBottom: '80px' }}>
          <div>
            < LocalMallOutlinedIcon style={{ color: 'grey', height: '100px ', width: '100%' }} />
          </div><br />
          <div style={{ color: 'grey', fontSize: '24px' }}>You have no orders !!!</div>
        </div>
      </Paper>
    </div>

  )

}
}
}

export default Order;
