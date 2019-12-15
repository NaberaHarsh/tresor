import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import APIUrl from '../utils/APIUrl';
import CustomizedSnackbars from './SnackBars';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
    padding: 20,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      company: '',
      email: '',
      mobile: '',
      tax: '',
      password: '',
      address: '',
      errors: { name: '',company: '', email: '', mobile:'',tax:'',password:'', address:'' }
    }
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const { name, company, email, tax, mobile, address, password } = this.state;
    const userdata = { email, password, name, mobile, tax, address, company };
    let errors = { name: '',company: '', email: '', mobile:'',tax:'',password:'', address:''};
    if (!name) {
      errors.name = 'Name is required';
     }
     if (!company) {
      errors.company = 'Company Name is required';
     }
     if (!email) {
      errors.email = 'Email Address is required';
     }
     if (!mobile) {
      errors.mobile = 'Telephone Number is required';
     }
     if (!tax) {
      errors.tax = 'Tax Id is required';
     }
     if (!password) {
      errors.password = 'Password is required';
     }
     if (!address) {
      errors.address = 'Address is required';
     }
     this.setState({errors});

     
     if(name)
     if(company)
     if(email)
     if(mobile)
     if(tax)
     if(password)
     if(address){
    const data = Object.keys(userdata)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(userdata[key])
        );
      })
      .join("&");
    const requestOptions = {
      method: "POST",
      url: APIUrl.url.Register,
      data: data
    };

    axios(requestOptions)
      .then(response => {
        console.log(response);


        console.log(response.data);
{
          this.setState({isToastOpen:true,message:response.data.msg,type:"error"});

         }

      })
      .catch(err => {
        console.log(err);
        this.setState({isToastOpen:true,message:"Something went wrong",type:"error"});


      });
    }
      
  }
  
  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const { name, company, email, mobile, tax, password, address } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper style={{ marginBottom: "10px", backgroundColor: "ghostwhite" }}>
          <div className={classes.paper}>
            <Link href="/">
              <img
                style={{
                  height: "56px",
                  marginLeft: "11px",
                  marginTop: "20px",
                  marginRight: "11px",
                  marginBottom: "4px"
                }}
                src="/logo.jpg"
                alt=""
              />{" "}
            </Link>
            <h6 style={{ padding: "10px" }} className="features">
              Register Here !
            </h6>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    autoComplete="name"
                  />
                  {errors.name != '' && <span style={{color: "red"}}>{this.state.errors.name}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="company name"
                    label="Company Name"
                    name="company"
                    value={company}
                    onChange={this.handleChange}
                    autoComplete="company name"
                  />
                  {errors.company != '' && <span style={{color: "red"}}>{this.state.errors.company}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    autoComplete="email"
                  />
                  {errors.email != '' && <span style={{color: "red"}}>{this.state.errors.email}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="telephone number"
                    label="Telephone Number"
                    name="mobile"
                    value={mobile}
                    onChange={this.handleChange}
                    autoComplete="telephone number"
                  />
                  {errors.mobile != '' && <span style={{color: "red"}}>{this.state.errors.mobile}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="tax id"
                    label="Tax Id"
                    name="tax"
                    value={tax}
                    onChange={this.handleChange}
                    autoComplete="tax id"
                  />
                  {errors.tax != '' && <span style={{color: "red"}}>{this.state.errors.tax}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {errors.password != '' && <span style={{color: "red"}}>{this.state.errors.password}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    value={address}
                    onChange={this.handleChange}
                    autoComplete="address"
                  />
                  {errors.address != '' && <span style={{color: "red"}}>{this.state.errors.address}</span>}
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onSubmit= {this.onSubmit}
                style={{backgroundColor:"black",color:'white'}}
                className={classes.submit}
              >
                Register
          </Button>
            </form>
            <Grid className={classes.form} container justify="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>

          </div>
        </Paper>
        <CustomizedSnackbars
                isOpen ={this.state.isToastOpen}
                message = {this.state.message}
                type = {this.state.type}
                handleClose={() => this.setState({isToastOpen : false})}
                />
      
      </Container>
    );
  }
}

export default withStyles(styles)(Register);