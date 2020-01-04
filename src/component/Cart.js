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
      this.state={
        count:0
      }
  }

  componentDidMount() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"))
    if (counter1 != this.state.count) {
        this.setState({ count: counter1 })
    }
}

componentDidUpdate() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"))
    if (counter1 != this.state.count) {
        this.setState({ count: counter1 })
    }
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
    <Grid md={8} lg={8} container space={3}>
    <hr />
  {this.props.db.Cart.map(p=>

<Grid md={12} lg={12} sm={12} xs={12} container space={3} >
  

<Grid md={6} lg={6} sm={6} xs={6} >

<center><img class="img-fluid" src={p.image} style={{maxHeight:120, maxWidth:120, height:'auto', width:'100%', border:"solid #515151 1px"}}  /></center>

</Grid>
<Grid  md={6} lg={6} sm={6} xs={6} container space={2} >
  <Grid md={6} lg={6} sm={12} xs={12} container space={2} style={{paddingLeft:'10px'}}>
      
  <div style={{fontWeight:'bold', textAlign:'center', color:'black'}}>{p.name}</div>
  <div></div>
<Grid md={6} lg={6} sm={8} xs={8}>

<form>
                <select style={{ width:'40px'}} onChange={(e)=>{this.props.changeQuantity(p,e)}}>
                  
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
  <div style={{ fontWeight:'bold', textAlign:'center', color:'black'}}>{p.price}/- Rs. </div>
  </Grid>
</Grid>

<hr />


</Grid>)}
</Grid>

<Grid md={4} lg={4} sm={12} xs={12} >
  
  <div style={{ padding:'20px', paddingTop:'8px'}}>
<div style={{border:'solid goldenrod 1px', textAlign:'center'}}>
            
  <h2 style={{paddingTop:'4px', textAlign:'center'}}>Checkout</h2>
  <h6 style={{color:'black'}}>SubTotal: {this.props.db.Cart.reduce((sum,p)=>sum+p.price*p.quantity,0)}</h6>
  
  <Button variant="contained" style={{backgroundColor:'black', color:'white'}}>Proceed To Buy</Button> 
   <br /><br />
   </div>
   </div>
   {/* <center><Button variant="contained" style={{backgroundColor:'black', color:'white', alignItems:'center'}}>  Continue Shopping </Button> </center> */}

</Grid>

  </Grid>
{console.log(this.props.db.Cart.length)}
</div>

      )
  }

}

export default withStyles(styles)(Cart);