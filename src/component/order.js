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
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});





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
    const { classes } = this.props;

if(this.props.order.length>0){

  return (

    <div style={{ padding: '10px' }}>
     
      <div className={classes.sectionDesktop}>
        
      <Container maxWidth="lg" className="card1">
      <div> <Paper elevation={0} style={{padding:'2px'}}>
      <p style={{paddingLeft:'20px', fontSize:"16px"}}> My Orders</p>
      </Paper>
      </div><br/>
          
          <Card style={{width:'100%', paddingTop:'16px'}}>
                  <div className="Rating" style={{ padding: '16px',fontSize:'16px' }}>

        <Grid container spacing={4}>
          <Grid md={2} lg={2}  
                         style={{ textAlign:"center" }}
><span style={{fontWeight:'bold'}}>OrderId</span></Grid>
          <Grid md={2} lg={2} 
          style={{ textAlign:"center" }}
> <span style={{fontWeight:'bold'}}>Amount</span></Grid>
          <Grid md={2} lg={2}  
                         style={{ textAlign:"center" }}
> <span style={{fontWeight:'bold'}}>No. of Products</span></Grid>
          <Grid md={2} lg={2}   
                        style={{textAlign:"center", paddingLeft:'36px'}}
> <span style={{fontWeight:'bold'}}>Date</span></Grid>
          <Grid md={4} lg={4}></Grid>
        </Grid>
        </div>
                </Card>
        
          <Grid container spacing={0}>

            {this.props.order.map((p,index) =>
              <Grid
                style={{ textAlign:"center" }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >

<div  style={{ padding:'16px' }}>

                    <Grid container spacing={4}  style ={index % 2? { backgroundColor : "white" }:{ backgroundColor : "ghostwhite" } }>
                    <Grid
                     xs={12}
                     sm={12}
                     md={2}
                     lg={2}
                     >
                    <Typography
                      style={{
                        paddingTop:'8px',
                        textAlign:'center',
                        color: 'black'
                      }}
                    >
TJ{p.order_date}{p.order_id}
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
                        paddingTop:'8px',                        
                        textAlign: "center",
                        color: 'black'
                      }}
                    >
                    ${p.subtotal} 
                          
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
                        paddingTop:'8px',    
                        textAlign: "center",
                        color: 'black'
                      }}
                    >
                     {p.total_products_of_quantity}
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
                        
                        paddingTop:'8px',
                        textAlign: "center",
                        color: 'black'
                      }}
                    >
                    {p.created}
                    </Typography>
                    </Grid>
                    <br />
                    <br />
                    <Grid
                     xs={12}
                     sm={12}
                     md={3}
                     lg={3}
                     style={{paddingTop:'4px'}}
                     >
                    <Link href={`/order_detail/${p.order_id}`}>
                    <Button variant='contained' style={{ backgroundColor: "black",fontSize:'12px',height:'28px', color: 'white' }}
                     onClick={() => {this.handleSubmit(p); }}
                     >
View Details
                       </Button>
                       </Link>
                       </Grid>
                       </Grid>
</div>
                  
              </Grid>)}
          </Grid>
      </Container>
      </div>
      <div className={classes.sectionMobile}>
        
      <Container maxWidth="lg" className="card1">
      <div> <Paper elevation={4} style={{padding:'2px'}}>
      <p style={{paddingLeft:'4px', fontSize:"16px"}}> My Orders</p>
      </Paper>
      </div>
          <Grid container spacing={2}>

            {this.props.order.map(p =>
              <Grid
                style={{ textAlign:"center" }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Paper>
                  <div className="Rating" style={{paddingBottom:'24px'}} >
                    <Grid container spacing={2}>
                    <Grid
                     xs={12}
                     sm={12}
                     md={2}
                     lg={2}
                     >
                    <Typography
                      style={{
                        paddingLeft:'74px',
                        textAlign:'initial',
                        color: 'black'
                      }}
                    >
                     <span style={{fontWeight:'bold'}}> Order ID </span>:TJ-{p.order_date}-{p.order_id}
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
                        paddingLeft:'74px',
                        textAlign: "initial",
                        color: 'black'
                      }}
                    >
                      <span style={{fontWeight:'bold'}}>Total Amount</span>: {p.subtotal} $
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
                        paddingLeft:'74px',                     
                        textAlign: "initial",
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
                        
                        paddingLeft:'74px',
                        textAlign: "initial",
                        color: 'black'
                      }}
                    >
                    <span style={{fontWeight:'bold'}}>  Date</span>:{p.created}
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
                       <br />
                       </Grid>
                       </Grid>

                  </div>
                </Paper>
              </Grid>)}
          </Grid>
      </Container>
</div>
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

export default withStyles(styles)(Order);
