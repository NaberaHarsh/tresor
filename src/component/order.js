import React, { Component } from "react";
import { Container, Link, Paper,Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import Skeleton from "@material-ui/lab/Skeleton";
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";



class Order extends Component {
  constructor(props) {
    super(props);
  }

  
  static getDerivedStateFromProps(nextProps, prevState) {
    
    if (prevState !== nextProps) {   
      
      return {
          like_product: nextProps.like_product,
    loading: true
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
  render() {
    const { like_product, loading, skeleton } = this.state;
    
      
    return (
      
      <div style={{padding:'10px'}}>
          <hr />
          <p>My Orders</p>
          <hr />
      <Container maxWidth="lg" className="card1">
        <Paper style={{ width: "100% ! important",padding:'20px' }}>
        <Grid container spacing={4}>
            
                {this.props.order.map(p  => 
                  <Grid 
                    style={{ textAlign: "center" }}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                  >
                    <Paper  className="marginB">
                      <div className="Rating" style={{padding:'24px'}}>
                        <Typography
                          style={{
                            textAlign: "center",
                            color: 'black'
                          }}
                        >
                          Order ID : {p.orderId}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            color: 'black'
                          }}
                        >
                         Total Amount: {p.amount}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            color: 'black'
                          }}
                        >
                         Ordered on: {p.date}
                        </Typography><br />
<Button variant='contained' style={{ backgroundColor: "black",color:'white'}}>View Details</Button>
                      </div>
                      </Paper>
                </Grid>)}
                      </Grid>
        </Paper>
      </Container>
    </div>
    );
  }
}

export default Order;
