import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class AboutOurStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner:this.props.banner
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (prevState !== nextProps) { 
    
    return {
    banner:nextProps.banner
     
    };
    }
    
    // Return null to indicate no change to state.
    return null;
    }

  render() {


    
    return (
      <React.Fragment>
        
          <Container maxWidth="lg" style={{ textAlign: "center" ,marginTop:'50px'}}>
          <Paper  style={{border:"1px solid #aeaeae"}} className='background'>
           <div style={{padding:'20px'}} >
           <h5 style={{marginTop:'10px',color:'black'}}>
              About Our Store
            </h5>
           
            <Typography variant="subtitle1">
              <strong style={{color:'black'}}>
                We are offering you the unique goods because our product is the
                real treasure.
              </strong>
            </Typography>
            <Typography style={{color:'black'}} variant="subtitle1">
              Tresor Jewelry is a leading manufacturers, wholesalers, exporters
              and suppliers of Pave diamond jewelry, chains & findings in 925
              sterling silver with and without gemstones. We make customer
              design with minimum order quantity. We deals also in semi-precious
              & precious gemstones.
            </Typography>
           </div>
           
           </Paper>
        </Container>
        
      </React.Fragment>
    );
  }
}

export default AboutOurStore;
