import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Link from "@material-ui/core/Link";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import { Container } from "semantic-ui-react";

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
      skeleton: new Array(4).fill(true),
      loading: false,
      expansion:" "
    };
    this.handleClick= this.handleClick.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (prevProps !== nextProps) {

      return {
        category: nextProps.category,
        dataGet: nextProps.category.length,
        loading: true
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

handleClick(id) {

  console.log(id);
  this.setState({expansion:id})
}

  handleChange =  (event, newValue) => {

    console.log(newValue);
    this.setState({ newValue });
  };

  render() {
    let a = 0;
    // toastr.success("welcome");
    var { category = [] } = this.state;
    return (
      <div style={{ backgroundColor: "white !important" }}>
        <AppBar position="static">
          <Container>
            <Hidden mdDown implementation="css">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                centered
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                indicatorColor="default"

              
              >
                {category.map((data, index) => (
                  <Link
                    key={`products-${index}`}
                    href={`/products/${data.catId}/${a}`}
                    data={category}
                  >
                    <Tab
                    onClick={()=> this.handleClick(data.catId)}
                      label={data.name}
                      {...a11yProps(index)}
                      variant="contained"
                      style={{ backgroundColor: "white" }}
                      key={`tab-${index}`}
                    />
                  </Link>
                ))}
              </Tabs>
            </Hidden>
            <Hidden mdUp implementation="css">
              <Tabs
                style={{ textAlign: "center !important" }}
                value={this.state.value}
                onChange={this.handleChange}
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                variant="scrollable"
                indicator="false"

              >
                {category.map((data, index) => (
                  <Link
                    key={`products-${index}`}
                    href={`/products/${data.catId}/${a}`}
                    data={category}
                  >
                    <MenuItem >{data.name}</MenuItem>
                  </Link>
                ))}
              </Tabs>
            </Hidden>
          </Container>
        </AppBar>
      </div>
    );
  }
}

export default SubNav;
