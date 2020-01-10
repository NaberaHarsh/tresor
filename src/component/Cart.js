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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




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
        product_id:"",
        quantity:"",
        user_id:" ",
        status:" ",
        clicks: 0,
      show: true
      }
  }

  handleSubmit(productDetail){
    const { product_id, quantity, user_id, status } = this.state;
    const userdata = { product_id:productDetail.product_id, quantity:productDetail.quantity,user_id:getLoginData().user_id, status:'exist' };

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


  IncrementItem(p){
    this.setState({ clicks: this.state.clicks + 1 });
  }
  DecreaseItem(p){
    this.setState({ clicks: this.state.clicks - 1 });
  }
  
  processOrder(){
    const { user_id } = this.state;
    const processdata = { user_id:getLoginData().user_id};

    console.log(processdata);
  
    // convert json to form data with '&' seprater
    const data1 = Object.keys(processdata)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(processdata[key])
        );
      })
      .join("&");
    const requestOptions1 = {
      method: 'POST',
      url: APIUrl.url.ProcessOrder,
      data:data1,

    };

    axios(requestOptions1)
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
  
    refreshPage(){
      window.location.reload();
      console.log('refresh done')
  } 


componentDidUpdate() {
    var counter1 = JSON.parse(localStorage.getItem("Cart"))
    if (counter1 != this.state.count) {
        this.setState({ count: counter1 })
    }
}

orderPlaced(){
  alert("your order has been placed")
    window.location.reload();
}

getValue(e){
  let x=e.target.value;
  this.setState({
      search:x
  })
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

<center><img class="img-fluid" src={p.url} style={{maxHeight:120, maxWidth:120, height:'auto', width:'100%', border:"solid #515151 1px"}}  /></center>

</Grid>
<Grid  md={8} lg={8} sm={6} xs={6} container space={2} >
<Grid md={3} lg={3} sm={12} xs={12}>      
  <div style={{ textAlign:'center',color:'black', display:'block',fontSize:'14px'}}>{p.product_name}</div>
  </Grid>
  <Grid md={3} lg={3} sm={12} xs={12}>
  <div style={{ textAlign:'center', color:'black',fontSize:'14px'}}>{p.price}/- Rs. </div>
  </Grid>
  
    <Grid md={3} lg={3} sm={8} xs={8}  style={{textAlign:'center'}}>

              
                 <div>
        <AddIcon onClick={()=>{this.IncrementItem(p); this.handleSubmit(p)}} style={{display:'inline', height:'20px', width:"20px"}}/>
       <input style={{display:'inline',width:'12px'} } onChange={(e)=>{this.props.changeQuantity(p,e)}}  value={ this.state.clicks } /> 
        <RemoveIcon style={{display:'inline',  height:'20px', width:"20px"}} onClick={()=> {this.DecreaseItem(p); this.handleSubmit(p)}} />
      </div>
                


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
  
  <Button variant="contained" style={{backgroundColor:'black', color:'white'}}
  onClick={()=>{ this.processOrder(); this.orderPlaced()}}
  >Proceed To Buy</Button> 
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