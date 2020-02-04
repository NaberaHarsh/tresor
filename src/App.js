import React, { Component } from "react";
import './App.css';
import Footer from './component/footer';
import { connect } from "react-redux";
import Routes from './Router/router.js';
import APIUrl from './utils/APIUrl';
import callApi from './utils/callApi'
import axios from "axios";
import { isLogin, logout, getLoginData } from './utils/session';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      category:[],
      shows:[],
      posts:[],
      activeStep: 0,
      payload: {},
      idData:" ",
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
      });
      return;
    } else if (!navigator.onLine) {
      alert("you are offline");
      return;
    }
    
    const { user_id } = this.state;
    if(isLogin()){

     this.state.idData={user_id:getLoginData().user_id};
    }
    else{
     this.state.idData={user_id:'0'}
    }
      
      const data1 = Object.keys(this.state.idData)
        .map(key => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(this.state.idData[key])
          );
        })
        .join("&");
      const requestOptions = {
        method: "POST",
        url: APIUrl.url.GetHead,
        data: data1
      };
  
      axios(requestOptions)
        .then(response => {
        })
        .catch(err => { });


  
    callApi(requestOptions, (err, response) => {
      if (err) {

        return;
      }
      console.debug(response.data ,"app");
     this.generateCategories(response.data);
     localStorage.setItem("banner", JSON.stringify(response.data.banner));
     localStorage.setItem("shows", JSON.stringify(response.data.shows));
     localStorage.setItem("posts", JSON.stringify(response.data.posts));

      this.setState({
        banner: response.data.banner,
        shows:response.data.shows,
        loading:false,
        posts:response.data.posts,

      });
      
    })
  }

  generateCategories(data){
    let categoryId = 0;
    let catName = "";
    let subCat = [];
    let categories = [];
   {data.category.map((item) => {
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
  
     
   <Routes banner={banner} category = {category} shows = {this.state.shows} posts = {this.state.posts} />
     <Footer/>
    </div>
  )};
}

export default connect(null, )(App);