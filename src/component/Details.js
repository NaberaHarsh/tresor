import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import callApi from '../utils/callApi';
import APIUrl from '../utils/APIUrl';
import Paper from '@material-ui/core/Paper';








class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductDetails: {},
      bigImage: "",
      Detail: {},
      img: []
    };
  }


  componentDidMount(){
    const requestOptions = {
      method: "GET",
      url: `${APIUrl.url.Detailproduct}/${this.props.match.params.id}`
    };

    callApi(requestOptions, (err, response) => {
      if (err) {

        return;
      }
      console.debug(response.data ,"app");


      this.setState({
              ProductDetails: response.data,
              Detail: response.data.detail,
              img: response.data.img,
              bigImage: `http://tresorjewelryinc.com/tresor-admin/${response.data.img[0].url}`
      })
    })
  }

  ChangeImage = (e) => {
        this.setState({
          bigImage:`http://tresorjewelryinc.com/tresor-admin/${e}`
        })
      }

      
      htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }

  render() {
    const { bigImage,img, Detail } = this.state;
    return (

      <div>
        <Container maxWidth="lg" className="productCard1">
          <Grid item xs={12} sm={12}>
            <Grid container  style={{width:"100%"}}>

              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Paper>
                <Card  className="img-fluid">
                  <img className="img-fluid2"
                    src={bigImage} 
                  
                    alt="" />
                </Card>
                </Paper>
                <Grid style={{ marginTop: '10px' }} container spacing={2}>
                  {img.map((data, index) => (
                    <Grid  key={index} item xs={3} sm={3} md={2} lg={2}>
                      
                      <Card key={`details-img-${index}`} style={{padding:'5px'}}>
                        <img
                          src={`http://tresorjewelryinc.com/tresor-admin/${data.url}`}
                         
                          alt="productimg"
                          style={{ width: "100%" }}
                          onClick={() => this.ChangeImage(data.url)}
                        />
                      </Card>
                     
                    </Grid>
                  ))}

                </Grid>
              </Grid>
              <Grid item md={1} lg={1}></Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="section-heading">
                  <h5>
                    {Detail.model}
                     </h5>
                     <h6>
                    
                    {Detail.name}
                    </h6>
                </div>
                
    <div style={{marginTop:'15px',marginBottom:'10px'}}>
    <h5>
    Description
      </h5>
    <hr/>
    <Typography variant="subtitle2" >
   <div style={{overflow:'auto'}} dangerouslySetInnerHTML={{ __html: this.htmlDecode(Detail.description) }} />

      </Typography>
      <hr/>
    <h6 style={{fontSize:'20px',color:'black',fontWeight:'bolder'}} >
   {Detail.note}
      </h6>
    </div>
              </Grid>
            </Grid>


          </Grid>
        </Container>
      </div>
    );
  }
}

export default Details;
