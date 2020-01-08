import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import DehazeIcon from "@material-ui/icons/Dehaze";
import APIUrl from "../utils/APIUrl";
import callApi from "../utils/callApi";
import { isLogin, logout, getLoginData } from '../utils/session';
import { Redirect } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Tooltip from '@material-ui/core/Tooltip';


const StyledBadge = withStyles(theme => ({
  badge: {
    right:-5,
    top:4,
    border: `2px solid ${theme.palette.background.paper}`,
    marginRight:'15px'
  },
}))(Badge);







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
      searchText: "",
      logout: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (prevProps.category.length !== nextProps.category.length) {

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
      // this.props.dispatch({
      //   type: "SEARCH_LIST",
      //   payload: { searchList: response.data.product }
      // });
     
      
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
    const { mobileMoreAnchorEl,search } = this.state;
    const { classes } = this.props;
    // const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { open, category, searchText } = this.state;



    const renderMobileMenu = (
      <Drawer
        className="login-register-drawer"
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <br />


        {
          isLogin() ? 

          <MenuItem>
              <span style={{color:'black'}}> Welcome! {getLoginData().name}</span>
        </MenuItem> 
        :

        <MenuItem>
           <Link href="Login">
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <PersonIcon style={{color:'black', marginLeft:"0px"}} />
          <span style={{   fontFamily: "Helvetica",
            color:'black',
            fontSize: '16px'
            }}>Login</span>
        </IconButton>
        </Link>
        </MenuItem> 

       } 
       

       {
          isLogin() ? 

          <MenuItem 
          style={{paddingLeft:'0px'}}
          onClick={() => {
            logout();
              this.setState({logout:true});
           
          }}> 
            <IconButton aria-label="show 17 new notifications" color="inherit">
            <Tooltip title="Signout">
<PowerSettingsNewIcon style={{color:'black', marginLeft:"0px"}} />
</Tooltip>
<span style={{   fontFamily: "Helvetica",
            color:'black',
            fontSize: '16px'
            }}>Signout</span>
        </IconButton>
         </MenuItem> 
        :
        
        <MenuItem>
        <Link href="/Register">
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <PersonAddIcon style={{color:'black', marginLeft:"0px"}} />
          <span style={{   fontFamily: "Helvetica",
            color:'black',
            fontSize: '16px'
            }}>Register</span>
          </IconButton>
        </Link>
      </MenuItem>

       } 
      
      </Drawer>
    );

    if (this.state.logout === true) {

      this.setState({logout : false});
      return <Redirect to='/' />
    }



    return (
      <div>
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
                    marginLeft: "20px",
                    marginTop: "5px",
                    marginRight: "24px",
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
                  style={{ alignItems:'center', backgroundColor: "whitesmoke",height:'40px',marginTop:'10px', outline: "auto", textAlign:"center",marginRight:'180px',position:'relative'}}
                  className={classes.search}
                >
                  <div style={{marginTop:"2px"}} className={classes.searchIcon}>
                    
                    <SearchIcon style={{marginTop:'2px'}}/>
                     
                  </div>
                  <InputBase
                    style={{ marginTop: "4px", width:'400px'}}
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
                
                

                <Link href="/cart">
                <Tooltip title="My Cart">
                <IconButton aria-label="show 4 new mails" color="inherit">
                <StyledBadge badgeContent={this.props.cartItemCount} color="primary" style={{display:'inline'}}>
                <ShoppingCartIcon  style={{color:'black'}} />
              </StyledBadge>
            </IconButton>
            </Tooltip>

      </Link>

                
                
             
                {
          isLogin() ? 
          <Tooltip title="You are logged in">
          <p
          style={{
          
            fontFamily: "Helvetica",
            color:'#515151',
            fontSize: '12px',
            marginTop:'16px'
          }}
        >
        <span className="vertical-align-super" style={{color:'black'}}>Welcome! {getLoginData().name}</span>
        </p>
        </Tooltip>
        :


        
         <Link href="Login">
                   <Tooltip title="Login">
        <IconButton aria-label="show 17 new notifications" color="inherit">
 <PersonIcon style={{color:'black'}} />
        </IconButton>
        </Tooltip>

      </Link>


       } 

{
          isLogin() ? 

          
<div
          onClick={() => {
            logout();
              this.setState({logout:true});
           
          }}
        >
          <Tooltip title="Signout">
<IconButton aria-label="show 17 new notifications" color="inherit">
          <PowerSettingsNewIcon style={{color:'black'}} />
        </IconButton>
                  </Tooltip>
        </div>
        :

        <Link href="/Register">
                     <Tooltip title="Register">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
          <PersonAddIcon style={{color:'black'}} />
            </IconButton>
            </Tooltip>
            </Link>


       } 



              
              </div>

              <div className={classes.sectionMobile}>
                <SearchIcon  
                  style={{ position:'relative',display:'inline',marginLeft:'0px',paddingLeft:'0px', paddingRight:'0px', height:'40px', width:'40px' }}
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                /> 
          <Link href='/cart'>         
      <StyledBadge badgeContent={this.props.cartItemCount} color="primary">
               <Tooltip title="My Cart">
                <ShoppingCartIcon style={{ display:'inline',color:'black', paddingRight:'8px',marginLeft:"0px",marginRight:'0px',  height:'40px', width:'40px'}} />
                </Tooltip>
              </StyledBadge>
            </Link>
      
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
          
            <Divider />

            <div
            
            style={{
              backgroundColor: "whitesmoke",
              outline: "auto",
              padding: "10px",
            }}
            
            >
            <div
              style={{
                backgroundColor: "whitesmoke",
                outline: "auto",
                marginTop: "0px",
                display : 'flex'
              }}
              className={classes.search}
            >

              
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                style={{ marginTop: "4px" }}
                onChange={this.onSearchChange}
                name="searchText"
                value={searchText}
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              >
              
                </InputBase>

                <div className={classes.drawerHeader}>
              <IconButton style={{ fontSize: '30px', color: 'black' }} onClick={this.handleDrawerClose}>x</IconButton>
            </div>
            </div>

           <div >
           <div  style={{ padding: "20px" }}>
              <Typography varient="subtite-1"> SUGGESTIONS</Typography>
             {search.length === 0 ? "No product found" :  search.map((data,index) => (
                <Link 
                key={`search-cat-${index}`}
                href={`/details/${data.product_id}`}
                 data={category}>
                   <Paper style={{padding: '12px', marginBottom: '4px'}}>
                  <li key={index} style={{ fontSize: "16px", color: '#515151' }}>{data.name}</li>
                  </Paper>
                </Link>
              ))}
            </div>
           <div  style={{ padding: "20px" }}>
              <Typography varient="subtite-1"> Suggested Categories</Typography>
              {category.map((data,index) => (
                <Link 
                key={`search-cat-${index}`}
                href={`/products/${data.catId}/${a}`}
                 data={category}>
                  <li key={index} style={{ fontSize: "13px" }}>{data.name}</li>
                </Link>
              ))}
            </div>
            
           </div>

           </div>
          </Drawer>
          {renderMobileMenu}
        </div>
        <SubNav category={category} />
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
