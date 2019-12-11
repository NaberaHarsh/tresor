import React, { Component } from "react";
import { Container, Link, Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import Skeleton from "@material-ui/lab/Skeleton";

class CollectionCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat_product: [],
      loading: false,
      skeleton: new Array(10).fill(true)
    };
  }


  randomKey = (e) => {
     let randomKey = Math.floor(1000 + Math.random() * 9000)
    return randomKey
  }


  static getDerivedStateFromProps(nextProps, prevState) {

    if (prevState !== nextProps) {

      return {
        lat_product: nextProps.lat_product,
        loading: true
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
  render() {
    const { lat_product, skeleton, loading } = this.state;
    return (
      <div>
        <Container maxWidth="lg" className="card1">
          <Paper style={{ width: "100% ! important" }}>
            <h5 style={{ padding: "20px", marginLeft: '20px' }} className="features">
              Discover Our Latest Collection
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
                  <div >
                  <Grid container spacing={3}>
                    {loading === true && lat_product.length !== 0 ? (
                      <>
                        {lat_product.map((data, index) => (
                            <Grid  key={`lat-product-${index}`} item  md={3} lg={3} sm={12} xs={12}>
                          <div className="item"style={{border:"1px solid #aeaeae"}}>
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
                                    
                                    <br />{" "}
                                  </p>
                                </div>
                              </div>
                            {/* </Paper> */}
                          </div>
                          </Grid>
                        ))}
                      </>
                    ) : (
                      <>
                        {" "}
                        {skeleton.map((index) => (
                           <Grid key={this.randomKey()} item md={3} lg={3} sm={12} xs={12}>
                          <div className="item">
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
                      </>
                    )}
                    </Grid>
                  </div>
                 
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

export default CollectionCarousel;
