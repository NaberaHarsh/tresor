import React, { Component } from 'react';
import { Container, Link,Fab,Paper } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


class MultiCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like_product: [],
    }
  }
  componentDidMount() {
    import ('./multi-js')
  }
  
  componentWillReceiveProps(props){
    this.setState({
      like_product:props.like_product
    })
  }
    render() {
       const {like_product} = this.state;
        return (
        
                <React.Fragment>
                      <Container maxWidth='lg' className="card1">
            
                  
                        <Paper style={{width:'100% ! important',height:'400px'}}>
                            <h5 style={{ padding: '10px' }} className="features" >
                            Most Liked Products
      </h5>
      <React.Fragment>
        <Container maxWidth="lg">
          <div className="row">
            <div className="MultiCarousel" data-items="1,2,3,5,6" data-slide="1" id="MultiCarousel" data-interval="900">
              <div className="MultiCarousel-inner">
               {like_product.map((data,index) => (
                  <div className="item" key={index}>
                  <div className="pad15">
                    <div className="imgwidth">
                    <Link href={`/Details/${data.product_id}`}>
                      <img className="img1" src={`http://tresorjewelryinc.com/tresor-admin/${data.url}`} alt="" />
                      </Link>
                    </div>
                    <div className="Rating">
                      <p style={{ textAlign: 'center',color: 'black !important',fontSize: '18px !important' }}  >{data.name}<br />

                      </p>
                    </div>
                    
                    
                  </div>
                </div>
                
               ))}
              </div>
              <Fab size="medium" className="btn btn-primary leftLst"color="secondary" aria-label="add">
          <ArrowBackIosIcon/>
        </Fab>
        <Fab size="medium"  className="btn btn-primary rightLst" color="secondary" aria-label="add">
          <ArrowForwardIosIcon />
        </Fab>
            </div>
          </div>
        </Container>
      </React.Fragment>

                        </Paper>
                   
          
                </Container>
            </React.Fragment>
        );
    }
}

export default MultiCarousel;