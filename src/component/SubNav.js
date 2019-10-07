import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
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

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class SubNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      anchorEl: false,
      category: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    console.debug(nextProps, prevProps, "next");
    if (prevProps !== nextProps) {
      console.debug(nextProps, "next");

      return {
        category: nextProps.category
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
    const { classes } = this.props;
    let a = 0;
    var { anchorEl, category = [] } = this.state;
    return (
      <div 
        style={{ backgroundColor: "white !important" }}
        className={classes.root}
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
          <Container maxWidth="x-lg">
          <Tabs
           className={window.innerWidth > 900 ? "desktopView" : "mobileView"}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor=""
            // textColor="black"
            variant="scrollable"
            scrollButtons="auto"
            // style={{textAlign: "center", display: "flow-root"}}
            aria-label="scrollable auto tabs example"
          >
           

            {category.map(
              (data, index) => (
               
                   <Link href={`/products/${data.catId}/${a}`} data={category}>
                      <Tab 
                        label={data.name}
                        {...a11yProps(index)}
                        variant="contained"
                        color="primary"
                       
                      />
                    </Link>
                )
            )}
          </Tabs>
          </Container>
        </AppBar>
      </div>
    );
  }
}

SubNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubNav);
