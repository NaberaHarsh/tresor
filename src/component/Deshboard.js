import React, { Component } from "react";
import Coreusel from "./Coreusel";
import AboutOurStore from "./AboutOurStore";
import Catlog from "./Catlog";
import CollectionCarousel from "./CollectionCarousel";
import MultiCarousel from "./MultiCarousel";
import { Grid, Container } from "@material-ui/core";
import APIUrl from "../utils/APIUrl";
import callApi from "../utils/callApi";
import Moving from "./marquee";


class Deshboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      like_product: [],
      lat_product: [],
      activeStep: 0,
      banner: [],
      categoryList: [],
      shows: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState !== nextProps) {
      return {
        banner: nextProps.data.banner,
        categoryList: nextProps.data.category,
        shows: nextProps.data.shows,
        posts: nextProps.data.posts
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    const products = localStorage.getItem("lat_product");
    const likeproduct = localStorage.getItem("like_product");
    if (products && likeproduct &&  !navigator.onLine) {
      this.setState({
        lat_product: JSON.parse(products),
        like_product:JSON.parse(likeproduct)
      }, ()=> {
      });
      return;
    } else if (!navigator.onLine) {
      alert("you are offline");
      return;
    }
    const requestOptions = {
      method: "GET",
      url: APIUrl.url.Dashboard
    };

    callApi(requestOptions, (err, response) => {
      if (err) {
        return;
      }
      localStorage.setItem("lat_product", JSON.stringify(response.data.lat_product));
      localStorage.setItem("like_product", JSON.stringify(response.data.like_product));
      this.setState({
        lat_product: response.data.lat_product,
        like_product: response.data.like_product
      });
    });
  }

  handleStepChange = step => {
    this.setState({
      activeStep: step
    });
  };

  render() {
    const { banner, shows, lat_product, like_product, posts } = this.state;

    return (
      <div>
        <Moving shows={this.props.shows} />
        {banner !== [] ? <Coreusel banner={banner} /> : undefined}
        <Container maxWidth="lg">
          <Grid item xs={12} sm={12}>
          <AboutOurStore />

            {/* <Top /> */}
            
            <CollectionCarousel lat_product={lat_product} />
            <MultiCarousel like_product={like_product} />
            {posts !== [] ? <Catlog shows={posts} /> : undefined}

            <br></br>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Deshboard;
