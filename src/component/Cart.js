import React, { Component } from 'react';
// import { Table} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import { getLoginData } from '../utils/session';
import axios from "axios";
import APIUrl from "../utils/APIUrl";


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  sectionDesktop: {
    display: "flex",
    width:'100%',
    flexDirection:'row'
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  }
});


class Cart extends Component{
  constructor(props){
      super(props)
      this.state={
        ProductDetails:"",
        count:0,
        product_id:" ",
        quantity:"",
        user_id:" ",
        status:" "
      }
  }

  handleSubmit(productDetail){
    const { product_id, quantity, user_id, status } = this.state;
    const userdata = { product_id:this.props.product_id, quantity:this.props.cart.map((p)=>p.quantity), user_id:getLoginData().user_id, status:'exist' };

    console.log(userdata);
  
    // convert json to form data with '&' seprater
    const data = Object.keys(userdata)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(userdata[key])
        );
      })
      .join("&");
    const requestOptions = {
      method: 'POST',
      url: APIUrl.url.AddToCart,
      data:data,

    };

    axios(requestOptions)
      .then(response => {
      })
      .catch(err => { });
  };



  componentDidMount() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"))
    if (counter1 != this.state.count) {
        this.setState({ count: counter1 })
    }
      
    };
  


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

if(this.props.cartItemCount>0){
      return(


<div style={{padding:"10px"}}>
<hr />
  <p>Shopping Cart</p>
  
  <Grid container space={3}>
    <Grid md={8} lg={8} container space={3}>
    <hr />
  {this.props.cart.map(p=>

<Grid md={12} lg={12} sm={12} xs={12} container space={3} >
  

<Grid md={4} lg={4} sm={6} xs={6} >

<center><img class="img-fluid" src={p.image} style={{maxHeight:120, maxWidth:120, height:'auto', width:'100%', border:"solid #515151 1px"}}  /></center>

</Grid>
<Grid  md={8} lg={8} sm={6} xs={6} container space={2} >
<Grid md={3} lg={3} sm={12} xs={12}>      
  <div style={{fontWeight:'bold', textAlign:'center',color:'black', display:'block',fontSize:'18px'}}>{p.name}</div>
  </Grid>
  <Grid md={3} lg={3} sm={12} xs={12}>
  <div style={{ fontWeight:'bold', textAlign:'center', color:'black',fontSize:'18px'}}>{p.price}/- Rs. </div>
  </Grid>
  
    <Grid md={3} lg={3} sm={8} xs={8}  style={{textAlign:'center'}}>

<form >
                <select onClick={()=> this.handleSubmit(this.state.ProductDetails)} style={{ width:'40px',height:'20px'}} onChange={(e)=>{this.props.changeQuantity(p,e)}}>
                  
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option></select></form>


                  </Grid>
                  <Grid md={3} lg={3} sm={4} xs={4}>
                    <Tooltip title="Delete">
                    <DeleteIcon style={{alignItems:'center',height:'40px', width:'40px'}}/>
                    </Tooltip>

</Grid>


</Grid>

<hr />


</Grid>)}
</Grid>

<Grid md={4} lg={4} sm={12} xs={12} >
  
  <div style={{ padding:'20px', paddingTop:'8px'}}>
<div style={{border:'solid goldenrod 1px', textAlign:'center'}}>
            
  <h2 style={{paddingTop:'4px', textAlign:'center'}}>Checkout</h2>
  <h6 style={{color:'black'}}>SubTotal: {this.props.cart.reduce((sum,p)=>sum+p.price*p.quantity,0)}</h6>
  
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
  else{
    return(
      <div style={{alignItems:'center',textAlign:'center', paddingTop:'100px', paddingBottom:'80px' }}>
        <div>
       < RemoveShoppingCartIcon style={{ color:'grey', height:'100px ', width:'100%' }} />
       </div><br />
       <div style={{ color:'grey', fontSize:'24px'}}>There is nothing to show in your cart !!</div>
      </div>
    )
  }
  }

}

export default withStyles(styles)(Cart);