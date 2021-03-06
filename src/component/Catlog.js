import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from "@material-ui/core";


class Catlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: []

    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState !== nextProps) {
      console.debug(nextProps);
      
        return {
          shows:nextProps.shows
        };      
      }
  
      // Return null to indicate no change to state.
      return null;
    }
 
  render() {
    const { shows } = this.state;
    return (
      <div>
        <Container maxWidth="lg" className="about_me">
          <Paper style={{ width: "100% ! important", height: "100%",marginBottom:'10px' }}>
          <p style={{ padding: "20px",  color : "#515151" , fontWeight : '800', fontSize: '22px',textAlign:'center'}} >
            {"              Our Catalog".toUpperCase()}
      </p>
            <div className="card-body fea features ">
              <Grid container spacing={4} >
                {shows.map((data, index) => (
                  <Grid key={`show-${index}`} item xs={12} sm={12} md={4} lg={4} className="homepage__key-point col-lg-4">
                    <Grid container  alignItems="center">
                      <div style={{marginleft:'5px',padding:'5px'}}>
                        <img className="imgPort" alt="" style={{height: '400px'}} src={data.url} />
                      </div>
                    </Grid>
                  </Grid>
                ))}

              </Grid>
            </div>
            {/* </section> */}

          </Paper>
        </Container>
      </div>

    );
  }
}

export default Catlog;