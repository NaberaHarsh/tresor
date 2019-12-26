import React, { Component } from 'react';
// import { Table} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Card } from '@material-ui/core';
import { TableHeader } from 'semantic-ui-react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {

      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row', 

    }
    ,
    check: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center"
    }
});


class Cart extends Component{
    constructor(props){
        super(props)

    }


    render(){
        const { classes } = this.props;


        return(
<div>
    <Grid container space={3}>
        
       
<Grid md={8} lg={8} sm={12} xs={12} container space={3} style={{marginTop:"15px", paddingLeft:'10px'}}>
    
<Paper style={{ marginBottom: "10px", backgroundColor: 'rgb(251, 249, 249)' }}>
          <div className={classes.paper}>

<Grid md={6} lg={6} sm={6} xs={6} >

<center><img class="img-fluid" src='https://cdn.shopify.com/s/files/1/0789/0141/products/D7302TZ_1024x1024.png?v=1541094254' style={{maxHeight:280,paddingLeft:'10px', maxWidth:280, height:'auto', width:'100%'}}  /></center>

</Grid>
<Grid  md={6} lg={6} sm={6} xs={6} container space={2} >
    <Grid md={6} lg={6} sm={12} xs={12} container space={2} style={{paddingLeft:'20px'}}>
        
<h6 style={{ textAlign:'center', color:'black'}}>Product Name</h6>
<p>Sample Description about the product</p><br />
<Grid md={6} lg={6} sm={8} xs={8}>
<div class="input-group plus-minus-input" style={{display:'inline'}}>
  <form>
  <div class="input-group-button" style={{display:'inline'}}>
    <button type="button" class="button hollow circle" data-quantity="minus" data-field="quantity" style={{display:'inline'}}>
      <i class="fa fa-minus" aria-hidden="true"></i>
    </button>
  </div>
  <input class="input-group-field" type="text" name="quantity" value="0" size="1" style={{display:'inline', textAlign:'center'}} />
  <div class="input-group-button" style={{display:'inline'}}>
    <button type="button" class="button hollow circle" data-quantity="plus" data-field="quantity" style={{display:'inline'}}>
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
  </div>
  </form>
</div>


                    </Grid>
                    <Grid md={6} lg={6} sm={4} xs={4}>
                    <DeleteIcon />
</Grid>
</Grid>
<Grid md={6} lg={6} sm={12} xs={12}>
<h6 style={{ textAlign:'center', color:'black'}}>999/- Rs.</h6>
    </Grid>
</Grid>
</div>
</Paper>

</Grid>

<Grid md={4} lg={4} sm={12} xs={12} >
<Paper style={{ margin: "10px", backgroundColor: "rgb(251, 249, 249)" }}>
          <div className={classes.check}>
              
    <h2 style={{ paddingTop:'15px', textAlign:'center'}}>Checkout</h2>
    <h6 style={{color:'black'}}>SubTotal: 999</h6>
    <br />
    <Button variant="contained">Proceed To Buy</Button> 
     <br />
    
   </div>
   </Paper>
</Grid>

    </Grid>


</div>

        )
    }

}
export default withStyles(styles)(Cart);