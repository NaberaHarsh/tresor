import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const styles = theme => ({
  root: {
Width: '100%',
        flexGrow: 1,
      },
     
      img: {
        height: '100%',
        objectFit:"fill",
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        width: '100%',
        marginTop: 5,
      },
});

 

class Coreusel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeStep: 0,
      banner:[]
     };
  }

  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState !== nextProps) {
    
    
      return {
        banner:nextProps.banner
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
 
 

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep,banner } = this.state;
    const maxSteps = banner.length;
    
    
    return (
     
         <Grid className={classes.root} item xs={12} sm={12} md={12} lg={12}>
        {banner.length >0 &&<AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {banner.map((data, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={data.url} alt={data.title} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>}
        </Grid>
        
    
    );
  }
}

Coreusel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Coreusel);
