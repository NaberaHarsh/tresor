import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Productlist from './Productlist';
import SideNav from './newCategorySideNav';
import SimpleBreadcrumbs from './Breadcrumbs';

class ProductsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
  
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="xx-lg" className="productCard1">
                <SimpleBreadcrumbs/>
                    <Grid container spacing={3}>
                        <Grid xs={4} sm={4} md={3} lg={3}>
                           <SideNav />
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={9}>
                            <Productlist />
                        </Grid>
                    </Grid>

                    
                </Container>
              
            </React.Fragment>
        );
    }
}

export default ProductsDetails;