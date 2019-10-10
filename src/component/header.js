// import React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@material-ui/core/AppBar";
// import Link from "@material-ui/core/Link";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
// import { fade } from "@material-ui/core/styles/colorManipulator";
// import { withStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";
// import MoreIcon from "@material-ui/icons/MoreVert";
// import SubNav from "./SubNav";
// import PersonIcon from "@material-ui/icons/Person";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import Drawer from "@material-ui/core/Drawer";
// import Divider from "@material-ui/core/Divider";
// import DehazeIcon from "@material-ui/icons/Dehaze";
// import APIUrl from "../utils/APIUrl";
// import callApi from "../utils/callApi";
// import Suggestions from "./searchSugg";
// import { connect } from "react-redux";

// const drawerWidth = "100%";
// const styles = theme => ({
//   root: {
//     width: "100%"
//   },
//   grow: {
//     flexGrow: 1
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20
//   },
//   title: {
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block"
//     }
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25)
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto"
//     }
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0
//   },
//   drawerPaper: {
//     width: drawerWidth
//   },
//   drawerHeader: {
//     display: "flex",
//     alignItems: "center",
//     padding: "0 8px",
//     ...theme.mixins.toolbar,
//     justifyContent: "flex-end"
//   },
//   searchIcon: {
//     width: theme.spacing(9),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   inputRoot: {
//     color: "inherit",
//     width: "100%"
//   },
//   inputInput: {
//     paddingTop: theme.spacing(1),
//     paddingRight: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//     paddingLeft: theme.spacing(10),
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: 200
//     }
//   },
//   sectionDesktop: {
//     display: "none",
//     [theme.breakpoints.up("md")]: {
//       display: "flex"
//     }
//   },
//   sectionMobile: {
//     display: "flex",
//     [theme.breakpoints.up("md")]: {
//       display: "none"
//     }
//   }
// });

// class PrimarySearchAppBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       anchorEl: null,
//       mobileMoreAnchorEl: null,
//       category: [],
//       subCategoryList: [],
//       search: [],
//       loading: true,
//       searchText: ""
//     };
//   }

//   static getDerivedStateFromProps(nextProps, prevProps) {
//     if (prevProps.category.length !== nextProps.category.length) {
//       console.debug(nextProps, "next");

//       return {
//         category: nextProps.category
//       };
//     }

//     // Return null if the state hasn't changed
//     return null;
//   }

//   onSearchChange = e => {
//     this.setState({
//       searchText: e.target.value
//     });

//     const requestOptions = {
//       method: "GET",
//       url: APIUrl.url.Search,
//       params: {
//         search: e.target.value
//       }
//     };

//     callApi(requestOptions, (err, response) => {
//       if (err) {
//         return;
//       }
//       this.props.dispatch({
//         type:"SEARCH_LIST",
//         payload:{searchList:response.data.product}
//       });
//       this.setState({
//         search: response.data.product,
//         loading: true
//       });
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSearch(this.query.value);
//     e.currentTarget.reset();
//   };
//   handleProfileMenuOpen = event => {
//     this.setState({ anchorEl: event.currentTarget });
//   };

//   handleMenuClose = () => {
//     this.setState({ anchorEl: null });
//     this.handleMobileMenuClose();
//   };
//   handleDrawerOpen = () => {
//     this.setState({ open: true });
//   };

//   handleDrawerClose = () => {
//     this.setState({ open: false });
//   };
//   handleMobileMenuOpen = event => {
//     this.setState({ mobileMoreAnchorEl: event.currentTarget });
//   };

//   handleMobileMenuClose = () => {
//     this.setState({ mobileMoreAnchorEl: null });
//   };

//   render() {
//     let a = 0;
//     const { anchorEl, mobileMoreAnchorEl } = this.state;
//     const { classes } = {};
//     const isMenuOpen = Boolean(anchorEl);
//     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
//     const { open, category, searchText, search } = this.state;
//     console.debug("cat", this.state.category);

//     const renderMobileMenu = (
//       <Drawer
//         className="login-register-drawer"
//         anchorEl={mobileMoreAnchorEl}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         open={isMobileMenuOpen}
//         onClose={this.handleMenuClose}
//       >
//         <MenuItem>
//           <Link href="/Login">
//             <PersonIcon />
//             Login{" "}
//           </Link>
//         </MenuItem>
//         <br />
//         <MenuItem>
//           <Link href="/Register">
//             <PersonAddIcon />
//             Register{" "}
//           </Link>
//         </MenuItem>
//       </Drawer>
//     );

//     return (
//       <React.Fragment>
//         <div 
//         // className={classes.root}
//         >
//           <AppBar position="static">
//             <Toolbar>
//               <div 
//               // className={classes.sectionMobile}
//               >
//                 <IconButton
//                   style={{ float: "right" }}
//                   aria-haspopup="true"
//                   onClick={this.handleMobileMenuOpen}
//                   color="inherit"
//                 >
//                   <DehazeIcon />
//                 </IconButton>
//               </div>
//               <Link href="/">
//                 <img
//                   style={{
//                     height: "56px",
//                     marginLeft: "30px",
//                     marginTop: "5px",
//                     marginRight: "11px",
//                     marginBottom: "4px"
//                   }}
//                   src="/logo.jpg"
//                   alt=""
//                 />{" "}
//               </Link>

//               <div 
//               // className={classes.grow} 
//               />
//               <div
//                 style={{ marginRight: "10px" }}
//                 // className={classes.sectionDesktop}
//               >
//                 <div
//                   style={{ backgroundColor: "whitesmoke", outline: "auto" }}
//                   // className={classes.search}
//                 >
//                   <div 
//                   // className={classes.searchIcon}
//                   >
//                     <SearchIcon />
//                   </div>
//                   <InputBase
//                     style={{ marginTop: "7px" }}
//                     onChange={this.onSearchChange}
//                     name="searchText"
//                     value={searchText}
//                     placeholder="Search…"
//                     // classes={{
//                     //   root: classes.inputRoot,
//                     //   input: classes.inputInput
//                     // }}
//                   />
//                 </div>

//                 <Link href="/Login">
//                   <p
//                     style={{
//                       marginTop: "10px",
//                       fontSize: "16px",
//                       fontFamily: "Helvetica"
//                     }}
//                   >
//                     <PersonIcon />
//                     Login
//                   </p>
//                 </Link>
//                 <Link href="/Register">
//                   <p
//                     style={{
//                       marginTop: "10px",
//                       marginLeft: "20px",
//                       marginRight: "20px",
//                       fontFamily: "Helvetica",
//                       fontSize: "16px"
//                     }}
//                   >
//                     <PersonAddIcon />
//                     Register
//                   </p>
//                 </Link>
//               </div>

//               <div 
//               // className={classes.sectionMobile} 
//               >
//                 <SearchIcon
//                   style={{ marginBottom: "5px", marginRight: "35px" }}
//                   color="inherit"
//                   aria-label="Open drawer"
//                   onClick={this.handleDrawerOpen}
//                 />
//               </div>
//             </Toolbar>
//           </AppBar>
//           <Drawer
//             // className={classes.drawer}
//             variant="persistent"
//             anchor="bottom"
//             open={open}
//             // classes={{
//             //   paper: classes.drawerPaper
//             // }}
//           >
//             <div
//             //  className={classes.drawerHeader} 
//             >
//               <IconButton onClick={this.handleDrawerClose}>x</IconButton>
//             </div>
//             <Divider />
//             <div
//               style={{
//                 backgroundColor: "whitesmoke",
//                 outline: "auto",
//                 marginTop: "10px"
//               }}
//               // className={classes.search}
//             >
//               <div 
//               // className={classes.searchIcon}
//               >
//                 <SearchIcon />
//               </div>
//               <InputBase
//                 style={{ marginTop: "7px" }}
//                 placeholder="Search…"
//                 // classes={{
//                 //   root: classes.inputRoot,
//                 //   input: classes.inputInput
//                 // }}
//               />
//             </div>

//             {/* <div style={{ padding: '30px' }}>
//               <Typography varient="subtitle-1"> Suggested Search</Typography>
//               {category.map((data, index) => (
//                 <Link

//                   href={`/products/${data.cat_Id}/${a}`}
//                   data={category}
//                 >

//                   <li style={{ fontSize: '13px' }}>{data.name}</li>
//                 </Link>
//               ))}
//             </div> */}
//             <div style={{ padding: "20px" }}>
//               <Typography varient="subtite-1"> Suggested Categories</Typography>
//               {category.map((data, index) => (
//                 <Link href={`/products/${data.catId}/${a}`} data={category}>
//                   <li style={{ fontSize: "13px" }}>{data.name}</li>
//                 </Link>
//               ))}
//             </div>
//           </Drawer>
//           {renderMobileMenu}
//         </div>
//         <SubNav category={category} />
//       </React.Fragment>
//     );
//   }
// }

// PrimarySearchAppBar.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => {
//   return ;
// }

// export default connect(mapStateToProps)(PrimarySearchAppBar);



import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SubNav from "./SubNav";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import DehazeIcon from "@material-ui/icons/Dehaze";
import APIUrl from "../utils/APIUrl";
import callApi from "../utils/callApi";

const drawerWidth = "100%";
const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
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

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      category: [],
      subCategoryList: [],
      search: [],
      loading: true,
      searchText: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (prevProps.category.length !== nextProps.category.length) {
      console.debug(nextProps, "next");

      return {
        category: nextProps.category
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  onSearchChange = e => {
    this.setState({
      searchText: e.target.value
    });

    const requestOptions = {
      method: "GET",
      url: APIUrl.url.Search,
      params: {
        search: e.target.value
      }
    };

    callApi(requestOptions, (err, response) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type:"SEARCH_LIST",
        payload:{searchList:response.data.product}
      });
      this.setState({
        search: response.data.product,
        loading: true
      });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.query.value);
    e.currentTarget.reset();
  };
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    let a = 0;
    const { mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    // const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { open, category, searchText } = this.state;
    console.debug("cat", this.state.category);

    const renderMobileMenu = (
      <Drawer
        className="login-register-drawer"
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          <Link href="/Login">
            <PersonIcon />
            Login{" "}
          </Link>
        </MenuItem>
        <br />
        <MenuItem>
          <Link href="/Register">
            <PersonAddIcon />
            Register{" "}
          </Link>
        </MenuItem>
      </Drawer>
    );

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.sectionMobile}>
                <IconButton
                  style={{ float: "right" }}
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <DehazeIcon />
                </IconButton>
              </div>
              <Link href="/">
                <img
                  style={{
                    height: "56px",
                    marginLeft: "30px",
                    marginTop: "5px",
                    marginRight: "11px",
                    marginBottom: "4px"
                  }}
                  src="/logo.jpg"
                  alt=""
                />{" "}
              </Link>

              <div className={classes.grow} />
              <div
                style={{ marginRight: "10px" }}
                className={classes.sectionDesktop}
              >
                <div
                  style={{ backgroundColor: "whitesmoke", outline: "auto" }}
                  className={classes.search}
                >
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    style={{ marginTop: "7px" }}
                    onChange={this.onSearchChange}
                    name="searchText"
                    value={searchText}
                    placeholder="Search"
                    onClick={this.handleDrawerOpen}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>

                <Link href="/Login">
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "16px",
                      fontFamily: "Helvetica"
                    }}
                  >
                    <PersonIcon />
                    Login
                  </p>
                </Link>
                <Link href="/Register">
                  <p
                    style={{
                      marginTop: "10px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      fontFamily: "Helvetica",
                      fontSize: "16px"
                    }}
                  >
                    <PersonAddIcon />
                    Register
                  </p>
                </Link>
              </div>

              <div className={classes.sectionMobile}>
                <SearchIcon
                  style={{ marginBottom: "5px", marginRight: "35px" }}
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                />
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="bottom"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>x</IconButton>
            </div>
            <Divider />
            <div
              style={{
                backgroundColor: "whitesmoke",
                outline: "auto",
                marginTop: "10px"
              }}
              className={classes.search}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                style={{ marginTop: "7px" }}
                onChange={this.onSearchChange}
                    name="searchText"
                    value={searchText}
                    placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>

            {/* <div style={{ padding: '30px' }}>
              <Typography varient="subtitle-1"> Suggested Search</Typography>
              {category.map((data, index) => (
                <Link

                  href={`/products/${data.cat_Id}/${a}`}
                  data={category}
                >

                  <li style={{ fontSize: '13px' }}>{data.name}</li>
                </Link>
              ))}
            </div> */}
            <div style={{ padding: "20px" }}>
              <Typography varient="subtite-1"> Suggested Categories</Typography>
              {category.map((data, index) => (
                <Link href={`/products/${data.catId}/${a}`} data={category}>
                  <li style={{ fontSize: "13px" }}>{data.name}</li>
                </Link>
              ))}
            </div>
          </Drawer>
          {renderMobileMenu}
        </div>
        <SubNav category={category} />
      </React.Fragment>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
