import React, { Component } from "react";
import Coreusel from "./Coreusel";
import AboutOurStore from "./AboutOurStore";
import Catlog from './Catlog';
import CollectionCarousel from './CollectionCarousel';
import MultiCarousel from './MultiCarousel';
import { Grid, Container } from "@material-ui/core";
import APIUrl from '../utils/APIUrl';
import callApi from '../utils/callApi';
import Suggestions from './searchSugg';
import $ from 'jquery';



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




      var itemsMainDiv = ('.MultiCarousel');
      var itemsDiv = ('.MultiCarousel-inner');
      var itemWidth = "";




      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();
      $(itemsDiv).each(function () {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this).parent().attr(dataItems);
          itemsSplit = btnParentSb.split(',');
          $(this).parent().attr("id", "MultiCarousel" + id);


          if (bodyWidth >= 1200) {
              incno = itemsSplit[3];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 992) {
              incno = itemsSplit[2];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 768) {
              incno = itemsSplit[1];
              itemWidth = sampwidth / incno;
          }
          else {
              incno = itemsSplit[0];
              itemWidth = sampwidth / incno;
          }
          $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
          $(this).find(itemClass).each(function () {
              $(this).outerWidth(itemWidth);
          });

          $(".leftLst").addClass("over");
          $(".rightLst").removeClass("over");

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
      
      <React.Fragment>
        <Suggestions />
        {banner!==[] ?  <Coreusel banner = {banner}/> : undefined}
        <Container maxWidth="lg">
          <Grid item xs={12} sm={12}>
           
            <AboutOurStore/>
            <CollectionCarousel lat_product={lat_product}/>
            <MultiCarousel like_product={like_product}/>
           {shows !==[] ?  <Catlog shows={shows}/> : undefined}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Main;


