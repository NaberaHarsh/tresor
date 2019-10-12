import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Link from "@material-ui/core/Link";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
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
      skeleton: new Array(5).fill(true),
      loading: false,
    };

  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    console.debug(nextProps, prevProps, "next");
    if (prevProps !== nextProps) {
      console.debug(nextProps, "next");

      return {
        category: nextProps.category,
        dataGet: nextProps.category.length,
        loading: true,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  handleChange = (value) => {
    console.debug(value);

    console.log(this.state.category[value]);

    this.setState({ value });
  };




  render() {
    let a = 0;


    var { category = [] } = this.state;
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
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              variant={window.innerWidth > 600 ? "fullWidth" : "scrollable"}
              TabIndicatorProps={{ style: { background: 'golden' } }}
            >
              {(category.map((data, index) => (
                <Link key={`products-${index}`}
                 href={`/products/${data.catId}/${a}`}
                  data={category}>
                    <Tab

                      label={data.name}
                      {...a11yProps(index)}
                      variant="contained"
                      key={`tab-${index}`}
                    />

                  </Link>

                ))



              )
              }

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
