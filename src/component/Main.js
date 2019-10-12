import React, { Component } from "react";
import Coreusel from "./Coreusel";
import AboutOurStore from "./AboutOurStore";
import Catlog from './Catlog';
import CollectionCarousel from './CollectionCarousel';
import MultiCarousel from './MultiCarousel';
import { Grid, Container } from "@material-ui/core";
import APIUrl from '../utils/APIUrl';
import callApi from '../utils/callApi';





class Main extends Component {
  constructor(props) {
    super(props);
 
   
    this.state = {
      like_product:[],
      lat_product:[],
      activeStep: 0,
      banner:[],
      categoryList:[],
      shows:[],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState !== nextProps) {
   
    
      return {
        banner:nextProps.data.banner,
        categoryList:nextProps.data.category,
        shows:nextProps.data.shows,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      url: APIUrl.url.Dashboard,
      
    };
  
    callApi(requestOptions, (err, response) => {
      if (err) {

        return;
      }

     
      this.setState({
       lat_product:response.data.lat_product,
       like_product:response.data.like_product
      });




    })
  }


  handleStepChange = (step) => {
    this.setState({
      activeStep: step
    })
  }


  render() {

    const { banner,shows,lat_product,like_product } = this.state;
    return (
      
      <div>
      
        {banner!==[] ?  <Coreusel banner = {banner}/> : undefined}
        <Container maxWidth="lg">
          <Grid item xs={12} sm={12}>
           
            <AboutOurStore/>
            <CollectionCarousel lat_product={lat_product}/>
            <MultiCarousel like_product={like_product}/>
           {shows !==[] ?  <Catlog shows={shows}/> : undefined}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Main;


