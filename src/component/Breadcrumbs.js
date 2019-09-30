import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
   
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor:'black',
    color:'white !important',
  },
}));

function handleClick(event) {
  event.preventDefault();

}

export default function SimpleBreadcrumbs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs style={{color:'white !important'}}aria-label="breadcrumb">
          <Link  href="/" onClick={handleClick}>
     Home
          </Link>
          <Link  href="/Category/products" onClick={handleClick}>
         Category
          </Link>
          <Link
            
            href="/Sub-Category/products"
            onClick={handleClick}
            aria-current="page"
          >
           Sub-Category
          </Link>
        </Breadcrumbs>
      </Paper>
    </div>
  );
}