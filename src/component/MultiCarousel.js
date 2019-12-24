import React, { Component } from "react";
import { Container, Link, Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import { Button } from 'antd';


import Skeleton from "@material-ui/lab/Skeleton";

class MultiCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like_product: [],
      skeleton: new Array(10).fill(true),
      loading: false
    };
  }

  randomKey = (e) => {
    let randomKey = Math.floor(1000 + Math.random() * 9000)
   return randomKey
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
      
      <div>
      <Container maxWidth="lg" className="card1">
        <Paper style={{ width: "100% ! important" }}>
          <h5 style={{ padding: "20px",marginLeft:'20px' }} className="features">
         <center> Most Liked Products</center>
          </h5>
          <div>
            <Container maxWidth="lg">
              <div className="row">
                <div
                 
                  data-items="1,2,4,5"
                  data-slide="1"
                  id="MultiCarousel"
                  data-interval="900"
                >
                  
                  <Grid container spacing={3}>
                    {loading === true && like_product.length !== 0 ? (
                      <>
                        {like_product.map((data, index) => (
                            <Grid key={`like_product-${index}`} item md={3} lg={3} sm={12} xs={12}>
                          <div  className="item"style={{border:"1px solid #aeaeae"}}>
                            {/* <Paper > */}
                              <div className="pad15">
                                <div className="imgwidth">
                                
                                    <img
                                   
                                      className="img2"
                                      src={`http://admin.tresorjewelryinc.com/tresor-admin/${data.url}`}
                                      alt=""
                                    />{" "}
                                
                                </div>
                                <div className="Rating">
                                  <p
                                    style={{
                                      textAlign: "center",
                                      color: "black !important",
                                      fontSize: "18px !important",
                                      marginTop:'40px'
                                    }}
                                   
                                  ><Link href={`/Details/${data.product_id}`}>
                                 {data.name} {" "}
                                </Link>
                                    <br></br><br/>
                                    <br />{" "}
                                  </p>
                                </div>
                              </div>
                            {/* </Paper> */}
                          </div>
                          </Grid>
                        ))}
                      </>
                    ) : 
                        skeleton.map((index) => (
                           <Grid key={this.randomKey()} item md={3} lg={3} sm={12} xs={12}>
                          <div  className="item">
                            <Paper>
                              <div className="pad15">
                                <div className="imgwidth">
                                  <Skeleton
                                    variant="rect"
                                    className="skeleton-img"
                                  />
                                </div>
                                <div className="Rating">
                                  <div>
                                   
                                    <Skeleton height={6} width="80%" />
                                  </div>
                                </div>
                              </div>
                            </Paper>
                          </div>
                          </Grid>
                        ))}
                      
                    
                    </Grid>
                  
                 
                </div>
              </div>
            </Container>
          </div>
        </Paper>
      </Container>
    </div>
    );
  }
}

export default MultiCarousel;
