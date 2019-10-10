import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Hidden from '@material-ui/core/Hidden';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import { Container } from "semantic-ui-react";
import Skeleton from "@material-ui/lab/Skeleton";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};


class SubNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      anchorEl: false,
      category: [],
      skeleton: new Array(5).fill(true),
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    console.debug(nextProps, prevProps, "next");
    if (prevProps !== nextProps) {
      console.debug(nextProps, "next");

      return {
        category: nextProps.category,
        dataGet:  nextProps.category.length,
        loading: true,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  handleChange = (event, value) => {
    console.debug(value);

    this.setState({ value });
  };
  handleClick = (event, index) => {
    if (event === undefined) return;
    console.debug(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget, value: index });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    
    let a = 0;
    var {skeleton,loading,dataGet, category = [] } = this.state;
    return (
      <div
        style={{ backgroundColor: "white !important" }}
        
      >
        <AppBar
          style={{
            // color: "black",
            fontWeight: "bolder",
            fontFamily: "Novecentowide"
          }}
          position="static"
          color="default"
        >
          <Container>
            <Tabs
           className={window.innerWidth > 900 ? "desktopView" : "mobileView"}
            value={this.state.value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="auto"
            // style={{textAlign: "center", display: "flow-root"}}
            aria-label="scrollable auto tabs example"
          >
 {loading === true && dataGet !== 0 ? (
              <>
           
              {category.map((data, index) => (
                <Link
                 
                  href={`/products/${data.catId}/${a}`}
                  data={category}
                >
                  <Hidden xsDown implementation="css">
                  <Tab 
                      
                        label={data.name}
                        {...a11yProps(index)}
                        variant="contained"
                        color="primary"
                       
                      />
                      </Hidden>
                      <Hidden smUp implementation="css" className="mobile-view-sub-nav">
                  {/* <Tab 
                      
                        label={data.name}
                        {...a11yProps(index)}
                        variant="contained"
                        color="primary"
                       
                      /> */}
                      <MenuItem>{data.name}</MenuItem>
                      </Hidden>
                </Link>
              ))}
          {" "}
              </>
            ) : (
              <>
                {" "}
                {skeleton.map(() => (
                  
                   
                        <React.Fragment>
                          <Skeleton height={30} />
                          <Skeleton height={30} width="80%" />
                        </React.Fragment>
                    
                 
                ))}
              </>
            )}
            </Tabs>
          </Container>
        </AppBar>
      </div>
    );
  }
}

// SubNav.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default SubNav;
