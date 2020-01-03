import React, { Component } from 'react';
// import { Table} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Card, Table } from '@material-ui/core';
import { TableHeader } from 'semantic-ui-react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
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


class Cart extends Component{
  constructor(props){
      super(props)

  }


  change(action){
    let quantity=0;
    if(action=="plus")
    quantity++;
    if(action=="minus")
    quantity--;
    return quantity;
  }

  render(){
      const { classes } = this.props;


      return(
<div style={{padding:"10px"}}>
<hr />
  <p>Shopping Cart</p>
  <Grid container space={3}>
  {this.props.db.Cart.map(p=>

<Grid md={8} lg={8} sm={12} xs={12} container space={3} >
  <hr />

<Grid md={6} lg={6} sm={6} xs={6} >

<center><img class="img-fluid" src={p.image} style={{maxHeight:280, maxWidth:280, height:'auto', width:'100%', border:"solid #515151 1px"}}  /></center>

</Grid>
<Grid  md={6} lg={6} sm={6} xs={6} container space={2} >
  <Grid md={6} lg={6} sm={12} xs={12} container space={2} style={{paddingLeft:'10px'}}>
      
<div style={{fontWeight:'bold', textAlign:'center', color:'black', display:'inline' }}>{p.name} </div>
  <div style={{display:'inline'}}>{p.desc}</div>
<Grid md={6} lg={6} sm={8} xs={8}>
{/* <div class="input-group plus-minus-input" style={{display:'inline'}}>
<form>
<div class="input-group-button" style={{display:'inline'}}>
  <button type="button" class="button hollow circle" data-action="minus" data-field="quantity" style={{display:'inline'}} onClick={this.change(data-action)}>
    
    <i class="fa fa-minus" aria-hidden="true"></i>
  </button>
</div>
<input class="input-group-field" type="text" name="quantity" value="0" size="1" style={{display:'inline', textAlign:'center'}} onChange={(e)=>{this.props.changeQuantity(p,e)}}  >{this.props.change}</input>
<div class="input-group-button" style={{display:'inline'}}>
 <button type="button" class="button hollow circle" data-action="plus" data-field="quantity" style={{display:'inline'}} onClick={this.change(data-action)}>
 <i class="fa fa-plus" aria-hidden="true"></i>
 </button> 
</div>
</form>
</div> */}
<form>
                <select onChange={(e)=>{this.props.changeQuantity(p,e)}}>
                  
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option></select></form>


                  </Grid>
                  <Grid md={6} lg={6} sm={4} xs={4}>
                  <DeleteIcon />
</Grid>
</Grid>
<Grid md={6} lg={6} sm={12} xs={12}>
  <h6 style={{ textAlign:'center', color:'black'}}>{p.price}/- Rs. </h6>
  </Grid>
</Grid>

<hr />



</Grid>)}

<Grid md={4} lg={4} sm={12} xs={12} >
  
  <div style={{ padding:'20px', paddingTop:'8px'}}>
<div style={{border:'solid goldenrod 1px', textAlign:'center'}}>
            
  <h2 style={{ paddingTop:'15px', textAlign:'center'}}>Checkout</h2>
  <h6 style={{color:'black'}}>SubTotal: {this.props.db.Cart.reduce((sum,p)=>sum+p.price*p.quantity,0)}</h6>
  <br />
  <Button variant="contained" style={{backgroundColor:'black', color:'white'}}>Proceed To Buy</Button> 
   <br /><br />
   </div>
   </div>
   {/* <center><Button variant="contained" style={{backgroundColor:'black', color:'white', alignItems:'center'}}>  Continue Shopping </Button> </center> */}

</Grid>

  </Grid>


</div>

      )
  }

}

export default withStyles(styles)(Cart);