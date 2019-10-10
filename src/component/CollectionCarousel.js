import React, { Component } from "react";
import { Container, Link, Fab, Paper } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Skeleton from "@material-ui/lab/Skeleton";

class As extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat_product: [],
      loading: false,
      skeleton: new Array(10).fill(true)
    };
  }
  componentDidMount() {
    import("./multi-js");
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
      <React.Fragment>
        <Container maxWidth="lg" className="card1">
          <Paper style={{ width: "100% ! important", height: "420px" }}>
            <h5 style={{ padding: "10px",marginLeft:'20px' }} className="features">
              Discover Our Latest Collection
            </h5>
            <React.Fragment>
              <Container maxWidth="lg">
                <div className="row">
                  <div
                    className="MultiCarousel"
                    data-items="1,2,4,5"
                    data-slide="1"
                    id="MultiCarousel"
                    data-interval="900"
                  >
                    <div className="MultiCarousel-inner">
                      {loading === true && lat_product.length !== 0 ? (
                        <>
                          {lat_product.map((data, index) => (
                            <div className="item" key={index} style={{border:"1px solid #aeaeae"}}>
                              {/* <Paper > */}
                                <div className="pad15">
                                  <div className="imgwidth">
                                    <Link href={`/Details/${data.product_id}`}>
                                      <img
                                        className="img2"
                                        src={`http://tresorjewelryinc.com/tresor-admin/${data.url}`}
                                        alt=""
                                      />{" "}
                                    </Link>
                                  </div>
                                  <div className="Rating">
                                    <p
                                      style={{
                                        textAlign: "center",
                                        color: "black !important",
                                        fontSize: "18px !important",
                                        marginTop:'40px'
                                      
                                      }}
                                    >
                                      {data.name}
                                      <br />{" "}
                                    </p>
                                  </div>
                                </div>
                              {/* </Paper> */}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {" "}
                          {skeleton.map(( index) => (
                            <div className="item" key={index}>
                              <Paper>
                                <div className="pad15">
                                  <div className="imgwidth">
                                    <Skeleton
                                      variant="rect"
                                      className="skeleton-img"
                                    />
                                  </div>
                                  <div className="Rating">
                                    <React.Fragment>
                                      <Skeleton height={6} />
                                      <Skeleton height={6} width="80%" />
                                    </React.Fragment>
                                  </div>
                                </div>
                              </Paper>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    <Fab
                      size="medium"
                      className="btn btn-primary leftLst"
                      color="secondary"
                      aria-label="add"
                    >
                      <ArrowBackIosIcon />
                    </Fab>
                    <Fab
                      size="medium"
                      className="btn btn-primary rightLst"
                      color="secondary"
                      aria-label="add"
                    >
                      <ArrowForwardIosIcon />
                    </Fab>
                  </div>
                </div>
              </Container>
            </React.Fragment>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

export default As;
