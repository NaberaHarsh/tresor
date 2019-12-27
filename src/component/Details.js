import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import callApi from '../utils/callApi';
import APIUrl from '../utils/APIUrl';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";








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
       this.setState({
              ProductDetails: response.data,
              Detail: response.data.detail,
              img: response.data.img,
              bigImage: `http://admin.tresorjewelryinc.com/tresor-admin/${response.data.img[0].url}`
      })
    })
  }

  ChangeImage = (e) => {
        this.setState({
          bigImage:`http://admin.tresorjewelryinc.com/tresor-admin/${e}`
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
                    <Grid  key={`details-img-${index}`} item xs={3} sm={3} md={2} lg={2}>
                      
                      <Card style={{padding:'5px'}}>
                        <img
                          src={`http://admin.tresorjewelryinc.com/tresor-admin/${data.url}`}
                         
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
                  <p style={{
                    color : "#515151",
                    fontWeight: '800',
                    fontSize : '32px'
                  }}>
                    {Detail.model}
                     </p>
                     <p>
                    
                    {Detail.name}
                    </p>
                </div>
                
                {Detail.description && 

    <div style={{marginTop:'12px',marginBottom:'10px'}}>




    <h5 style={{
                    color : "#515151",
                    fontWeight: '800',
                    fontSize : '32px'
                  }}>
    Description
      </h5>
    <hr/>
    <Typography variant="subtitle2" style={{color: '#515151'}}>
                  { Detail.description &&  <div style={{overflow:'auto'}} dangerouslySetInnerHTML={{ __html: this.htmlDecode(Detail.description) }} />
}
      </Typography>
      <hr/>
    <p style={{fontSize:'20px',color:'black',fontWeight:'bolder'}} >
   {Detail.note && Detail.note.split("\n").map(item => <li style={{fontSize:'14px',color:'#515151'}}>{item}</li>)}
      </p>
      
    <br />
    <center><Link href="/cart"><Button variant="contained"  style={{textAlign:"center"}}>Add to Cart</Button></Link></center>
    </div>

      }
            </Grid>

            </Grid>

          </Grid>
        </Container>

      </div>
    );
  }
}

export default Details;
