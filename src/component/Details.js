import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Grid } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import callApi from '../utils/callApi';
import APIUrl from '../utils/APIUrl';
import Paper from '@material-ui/core/Paper';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}




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
    const { bigImage, ProductDetails, img, Detail } = this.state;
    console.debug('detail', Detail);
    console.debug('img', img);
    console.debug('ProductDetails', ProductDetails);

    return (
      <React.Fragment>
        <Container maxWidth="lg" className="productCard1">
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Card>
                  <img className="img-fluid"
                    src={bigImage} 
                   
                    alt="" />
                </Card>
                <Grid style={{ marginTop: '10px' }} container spacing={2}>
                  {img.map((data, index) => (
                    <Grid item xs={3} sm={3} md={2} lg={2}>
                      <Card>
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
              <Grid md={1} lg={1}></Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="section-heading">
                  <h5
                    
                  >
                    {Detail.model}
                     </h5>
                     <h6>
                    {Detail.name}
                    </h6>
                </div>
                <Paper>
             
            <h6 style={{fontSize:'18px !important'}}>Product Details</h6>
        
    </Paper>
    <div style={{marginTop:'15px',marginBottom:'10px'}}>
    <h5 >
    Description
      </h5>
    <hr/>
    <Typography variant="subtitle2" >
   <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(Detail.description) }} />

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
      </React.Fragment>
    );
  }
}

export default Details;
