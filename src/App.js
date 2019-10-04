import React, { Component } from "react";
import './App.css';
import Header from './component/header';
import Footer from './component/footer'
import { connect } from "react-redux";
import Routes from './Router/router.js';
import APIUrl from './utils/APIUrl';
import callApi from './utils/callApi'
// import ('./component//multi-js')


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      category:[],
      shows:[],
      activeStep: 0,
      payload: {},
      loading:true
    };
  }


  componentDidMount() {
    const requestOptions = {
      method: "GET",
      url: APIUrl.url.GetHead,
    };

    callApi(requestOptions, (err, response) => {
      if (err) {

        return;
      }
      console.debug(response.data ,"app");
     this.generateCategories(response.data);
      this.setState({
        banner: response.data.banner,
        // category:response.data.category,
        shows:response.data.shows,
        loading:false
      });
      
    })
  }

  generateCategories(data){


    let categoryId = 0;
    let catName = "";
    let subCat = [];
    let categories = [];
    data.category.map((item,index) => {

      if(categoryId != item.cat_id){
        if(categoryId != 0){

            categories.push({
              catId: categoryId,
              name: catName,
              subcat: subCat
            });
        }

        categoryId = item.cat_id;
        catName = item.cat_name;
        subCat = [];
        subCat.push(item);
      }else{
        subCat.push(item);
      }
    });
    if(categoryId != 0){

      categories.push({
        catId: categoryId,
        name: catName,
        subcat: subCat
      });
  }



    this.props.dispatch({ type:"CATEGORY" , payload:{categories}})
    this.setState({
      category:categories
    })
  }

  render(){
    
const {banner,category,shows} = this.state;



    return (
    <div className={this.state.loading===true ? "loaderBackground" : "body"}>
    {this.state.loading===true ?  <div className="loader"></div> : undefined}
     <Header
      category={category}
     /> 
   <Routes banner={banner} category = {category} shows = {shows} />
     <Footer/>
    </div>
  )};
}

export default connect(null, )(App);