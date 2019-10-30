import React, { Component } from "react";
import './App.css';
import Header from './component/header';
import Footer from './component/footer'
import { connect } from "react-redux";
import Routes from './Router/router.js';
import APIUrl from './utils/APIUrl';
import callApi from './utils/callApi'


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
    const banner = localStorage.getItem("banner");
    const category = localStorage.getItem("category");
    const shows = localStorage.getItem("shows");
    if (banner && category && shows &&  !navigator.onLine) {
      this.setState({
        banner: JSON.parse(banner),
        shows: JSON.parse(shows),
        category:JSON.parse(category)
      }, ()=> {
        console.log(this.state)
      });
      return;
    } else if (!navigator.onLine) {
      alert("you are offline");
      return;
    }
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
     localStorage.setItem("banner", JSON.stringify(response.data.banner));
     localStorage.setItem("shows", JSON.stringify(response.data.shows));
      this.setState({
        banner: response.data.banner,
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
   { data.category.map((item) => {
     if(categoryId !== item.cat_id){
        if(categoryId !== 0){

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
    })};
    if(categoryId !== 0){
      categories.push({
        catId: categoryId,
        name: catName,
        subcat: subCat
      });
  }


    this.props.dispatch({ type:"CATEGORY" , payload:{categories}})
    localStorage.setItem("category", JSON.stringify(categories));
    this.setState({
      category:categories
    })
  }

  
  render(){
    
const {banner,category,shows} = this.state;



    return (
    <div className="body">
  
     <Header
      category={category}
     /> 
   <Routes banner={banner} category = {category} shows = {shows} />
     <Footer/>
    </div>
  )};
}

export default connect(null, )(App);