import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import APIUrl from "../utils/APIUrl";
import axios from "axios";
import setCookie from "../utils/setCookie";
import { Redirect } from "react-router-dom";
import toastr from 'toastr';

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(0),
    padding: 13
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});



class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogin: false,
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const userdata = { email, password };
    const data = Object.keys(userdata)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(userdata[key])
        );
      })
      .join("&");
    const requestOptions = {
      method: "POST",
      url: APIUrl.url.Login,
      data: data
    };

    axios(requestOptions)
      .then(response => {
        console.log(response);
        toastr.error(response.data.msg,'ERROR');
        console.log(JSON.parse(response.data));
        if (response.data.status === true) {
          console.log(response.data.data.user_id);
          this.setState({
            token:"",
            isLogin: true,
          });
        }
      })
      .catch(err => {
        console.log(err);
        
      });
  };

  render() {
    const { classes } = this.props;
    const { email, password, isLogin, token } = this.state;
    localStorage.setItem('session',JSON.stringify(token));
    if (isLogin) {
      setCookie("token", token, 30);
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

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
              />
            </Link>
            <h6 style={{ padding: "10px" }} className="features">
              Login
            </h6>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={this.handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor:"black",color:'white'}}
                className={classes.submit}
              >
                Login
              </Button>
            </form>
            <Grid container className={classes.form}>
              <Grid item xs>
                <Link href="/Forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  Don't have an account? <br /> Register here !
                </Link>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(SignIn);
