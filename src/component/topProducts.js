import React from "react";
import { Card , CardColumns, CardDeck, Carousel, CarouselItem} from 'react-bootstrap'

import { Container, Link, Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

class Top extends React.Component{
    constructor(props){
        super(props)
    }

render(){
    return(
        <div>
            <h5 style={{ padding: "20px", marginLeft: '20px' }} className="features">
              <center>Top Trending Products</center>
            </h5>
           <Grid container spacing={12}>
  <Grid item md={3} lg={3} sm={12} xs={12}>
  <div className="imgwidth">
  <Card style={{ marginTop:20 }}>
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9W-NPX6OPelnr9ezxXuPeTWzrbuZtj_xxf_Wg9AGcFbLgZRSa" style={{height:200, align:'center'}}/>
  <Card.Body style={{textAlign:'center'}}>
    <Card.Title >Pendant </Card.Title>
  </Card.Body>
</Card>
</div>
</Grid>
<Grid item md={3} lg={3} sm={12} xs={12}>
<div className="imgwidth">
<Card style={{ marginTop:20 }}>
  <Card.Img variant="top" src="https://cdn.shopify.com/s/files/1/0789/0141/products/D7302TZ_1024x1024.png?v=1541094254" style={{height:200}}/>
  <Card.Body style={{textAlign:'center'}}>
    <Card.Title  > Earring</Card.Title>
  </Card.Body>
</Card>
</div>
</Grid>
<Grid item md={3} lg={3} sm={12} xs={12}>
<div className="imgwidth">
<Card style={{ marginTop:20 }}>
  <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0GHFi63e1fPIO-J4pPyK5FezgDz24i5ZZDeJ7tqYdQvA8lc-U" style={{height:200}}/>
  <Card.Body style={{textAlign:'center'}}>
    <Card.Title > Rings</Card.Title>
  </Card.Body>
</Card>
</div>
</Grid>
<Grid item md={3} lg={3} sm={12} xs={12}>
<div className="imgwidth">
<Card style={{ marginTop:20 }}>
  <Card.Img variant="top" src="https://cdn.shopify.com/s/files/1/0248/7892/products/tpr-045-tresor-paris-bracelet-lilac-crystal-16021_x300.jpg?v=1575933736" style={{height:200}}/>
  <Card.Body style={{textAlign:'center'}}>
    <Card.Title  > Bracelets</Card.Title>
  </Card.Body>
</Card>
</div>
</Grid>

</Grid>
</div>     
    )

}
}
export default Top;