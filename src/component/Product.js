import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Productlist from './Productlist';
import SideNav from './newCategorySideNav';
// import SimpleBreadcrumbs from './Breadcrumbs';




class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category:[],
            ProductList:[]
         }
    }

    

   
    render() { 



        const {catId,subCatId} = this.props.match.params
        
        return ( 
            <React.Fragment>
                {/* <SimpleBreadcrumbs/> */}
            <Container  maxWidth="lg" className="productCard1" style={{minHeight:"300px"}}>
            
                <Grid container spacing={3}>
                    <Grid item xs={4} sm={4} md={3} lg={3}>
                       <SideNav  getProductByCatId = {this.getProductByCatId} catId={catId} category = {this.props.data.category}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9}>
                        <Productlist subCatId= {subCatId} catId ={catId} addToCart={this.props.addToCart}/>
                    </Grid>
                </Grid>

                
            </Container>
          
        </React.Fragment>
         );
    }
}
 
export default Product;