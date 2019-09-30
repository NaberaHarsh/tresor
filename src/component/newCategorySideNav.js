// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import CloseIcon from '@material-ui/icons/Close';
// import Toolbar from '@material-ui/core/Toolbar';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Checkbox from '@material-ui/core/Checkbox';
// import Typography from '@material-ui/core/Typography';
// import CustomizedTreeView from './sideCategoryNav';
// import FilterListIcon from '@material-ui/icons/FilterList';



// const drawerWidth = 325;
// const drawerTop = 130;
// const rootClasses ={}

//       const {theme} = useTheme();
// const styles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     marginTop: '18px',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       top: drawerTop,
//       flexShrink: 0,
      
//     },
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//     top: drawerTop,
//     height: '100%',
//     position: 'static !important',
  
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
  
//   },
//   closeMenuButton: {
//     marginRight: 'auto',
//     marginLeft: 0,
//   },
// }));

// class ResponsiveDrawer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       mobileOpen:false,
//     }
//   }

//   handleDrawerToggle = () => { 
//     this.state({
//       MobileOpen:false
//     })
// };

//   render() { 
//       // const dummyCategories1 = ['Product1', 'Product2', 'Product3', 'Product4']
//       // const {classes,useStyles} = this.props;
//       // const {theme} = useTheme();
//       const {mobileOpen} = this.state;
 


//     return ( 
      
//       <div 
//       // className={classes.root}
//       >
//       <CssBaseline />
     
//         <Toolbar>
//           <Button
//           variant="contained"
//             color="action"
//             aria-label="Open drawer"
//             edge="start"
//             onClick={this.handleDrawerToggle}
//             // className={classes.menuButton}
//           ><FilterListIcon fontSize="large"></FilterListIcon> Filter
           
//           </Button>
         
//         </Toolbar>
  
    
//       <nav 
//       // className={classes.drawer}
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//     <Hidden smUp implementation="css">
//           <Drawer
//             variant="temporary"
//             // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//             open={mobileOpen}
//             onClose={this.handleDrawerToggle}
//             // classes={{
//             //   paper: classes.drawerPaper,
//             // }}
//             // ModalProps={{
//             //   keepMounted: true, // Better open performance on mobile.
//             // }}
//           >
//             <Button onClick={this.handleDrawerToggle} 
//             // className={classes.closeMenuButton}
//             >
//               <CloseIcon/>
//             </Button>
//            <CustomizedTreeView/>
         
//           </Drawer>
//         </Hidden>
// <Hidden xsDown implementation="css">
//             <Drawer
//               // className={classes.drawer} 
//               variant="permanent"
//               // classes={{
//               //   paper: classes.drawerPaper,
//               // }}
//             >
//            <CustomizedTreeView/>
           
//           </Drawer>  
//         </Hidden>
//       </nav>
     
//     </div>
//     );
//   }
// }
//  ResponsiveDrawer.propTypes = {
//   // Injected by the documentation to work in an iframe.
//   // You won't need it on your project.
//   container: PropTypes.object,
// };
// export default  makeStyles(useStyles)(ResponsiveDrawer);




import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import CustomizedTreeView from './sideCategoryNav';
import FilterListIcon from '@material-ui/icons/FilterList';



const drawerWidth = 325;
const drawerTop = 130;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '18px',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      top: drawerTop,
      flexShrink: 0,
      
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: drawerTop,
    height: '100%',
    position: 'static !important',
  
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));
function ResponsiveDrawer(props) {

  // const dummyCategories1 = ['Product1', 'Product2', 'Product3', 'Product4']
  const handleChange = (i) => { 
  };
  const classes = useStyles();
  const theme = useTheme();
  let [category, setcategory] = React.useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [catId, setCatId] = React.useState("");

function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  if (props.category !== category) {
    // Row changed since last render. Update isScrollingDown.
   
    setcategory(props.category);
    setCatId(props.catId);
  }

console.log(category);

return (
    <div className={classes.root}>
      <CssBaseline />
     
        <Toolbar>
          <Button
          variant="contained"
            color="action"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          ><FilterListIcon fontSize="large"></FilterListIcon> Filter
           
          </Button>
         
        </Toolbar>
  
    
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Button onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </Button>
           <CustomizedTreeView catId={catId} category={category} />
         
          </Drawer>
        </Hidden>
<Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
           <CustomizedTreeView catId={catId} category={category} />
           
          </Drawer>  
        </Hidden>
      </nav>
     
    </div>
  );
}
ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default ResponsiveDrawer;