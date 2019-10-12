import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper, Button, Container,Link,Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';

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
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});






class GroupProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        like_product: [],
        skeleton: new Array(10).fill(true),
        loading: false,
        lat_product:[],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    
    if (prevState !== nextProps) {   
      
      return {
          like_product: nextProps.like_product,
          lat_product: nextProps.lat_product,
    loading: true
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    const { like_product,lat_product,loading, skeleton } = this.state;
    const { classes } = this.props;
   

    return (
      <div>
        <Container maxWidth="lg">
         <Grid container spacing={2}>
            {loading === true && like_product !== 0 ? (
              <>
                {like_product.map(data => (
                  <Grid
                    style={{ textAlign: "center" }}
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    lg={3}
                  >
                    <Paper className="marginB">
                      <img
                        className="img1"
                        src={`http://tresorjewelryinc.com/tresor-admin/${data.url}`}
                        alt=""
                      />
                      <div className="Rating">
                        <Typography
                          style={{
                            textAlign: "left",
                            height: "70px",
                            marginBottom: "6px",
                            color:'black'
                          }}
                          variant="subtitle1"
                        >
                          {data.name}
                        </Typography>
                      </div>

                      <ThemeProvider>
                      <Link href={`/Details/${data.product_id}`}>
                        <Button
                          onClick={() => this.viewDetails(`${data.product_id}`)}
                          style={{ width: "100%" ,backgroundColor:"black",color:'white'}}
                          variant="contained"
                          
                        >
                          View Details
                        </Button>
                        </Link>
                      </ThemeProvider>
                    </Paper>
                  </Grid>
                ))}{" "}
              </>
            ) : (
              <>
                {" "}
                {skeleton.map((data, index) => (
                  <Grid
                    style={{ textAlign: "center" }}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                  >
                    <Paper className="marginB">
                      <Skeleton variant="rect" className="skeleton-img1" />
                      <div className="Rating">
                        <div>
                          <Skeleton height={6} />
                          <Skeleton height={6} width="80%" />
                        </div>
                      </div>

                      <ThemeProvider>
                        <Button
                          style={{ width: "100%" }}
                          variant="contained"
                          color="teal"
                        >
                          
                        </Button>
                      </ThemeProvider>
                    </Paper>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
          {/* {second grid} */}
          {/* <Grid container spacing={2}>
            {loading === true && lat_product !== 0 ? (
              <>
                {lat_product.map(data => (
                  <Grid
                    style={{ textAlign: "center" }}
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    lg={3}
                  >
                    <Paper className="marginB">
                      <img
                        className="img1"
                        src={`http://tresorjewelryinc.com/tresor-admin/${data.url}`}
                        alt=""
                      />
                      <div className="Rating">
                        <Typography
                          style={{
                            textAlign: "left",
                            height: "70px",
                            marginBottom: "6px",
                            color:'black'
                          }}
                          variant="subtitle1"
                        >
                          {data.name}
                        </Typography>
                      </div>

                      <ThemeProvider>
                      <Link href={`/Details/${data.product_id}`}>
                        <Button
                          onClick={() => this.viewDetails(`${data.product_id}`)}
                          style={{ width: "100%" ,backgroundColor:"black",color:'white'}}
                          variant="contained"
                          
                        >
                          View Details
                        </Button>
                        </Link>
                      </ThemeProvider>
                    </Paper>
                  </Grid>
                ))}{" "}
              </>
            ) : (
              <>
                {" "}
                {skeleton.map((data, index) => (
                  <Grid
                    style={{ textAlign: "center" }}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                  >
                    <Paper className="marginB">
                      <Skeleton variant="rect" className="skeleton-img1" />
                      <div className="Rating">
                        <div>
                          <Skeleton height={6} />
                          <Skeleton height={6} width="80%" />
                        </div>
                      </div>

                      <ThemeProvider>
                        <Button
                          style={{ width: "100%" }}
                          variant="contained"
                          color="teal"
                        >
                          
                        </Button>
                      </ThemeProvider>
                    </Paper>
                  </Grid>
                ))}
              </>
            )}
          </Grid> */}
         
        </Container>
        
      </div>
    );
  }
}

export default withStyles(styles) (GroupProducts);
