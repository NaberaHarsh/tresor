import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import APIUrl from "../utils/APIUrl";
import axios from "axios";
import setCookie from "../utils/setCookie";
import { Redirect } from "react-router-dom";

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
    padding: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPass: '',
      isLogin: '',
      errors: { password:'' }

    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  ResetPasword = e => {
    e.preventDefault();
    const { password } = this.state;
    const userdata = { password };
    let errors = {password:''};
    if (!password) {
      errors.password = 'Password is required';
     }
    if(password.length <6){
      errors.passLength= "password must be atleast 6 characters long"
    }
    this.setState({errors});

    if(password.length>=6)
{
    const data = Object.keys(userdata)
      .map(key => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(userdata[key])
        );
      })
      .join("&");
    const requestOptions = {
      method: "POST",
      url: APIUrl.url.ResetPassword,
      data: data
    };

    axios(requestOptions)
      .then(response => {
        if (response.data.status === true) {
          this.setState({
            token: "",
            isLogin: true
          });
        }
      })
      .catch(err => { });
    }
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const { newPass, password, isLogin, token } = this.state;

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
        <Paper style={{ backgroundColor: "ghostwhite", marginBottom: "10px" }}>
          <div className={classes.paper}>

            <Link href="/">
              <img
                style={{
                  height: "56px",
                  marginLeft: "11px",
                  marginRight: "11px",
                  marginTop: "20px",
                  marginBottom: "4px"
                }}
                src="/logo.jpg"
                alt=""
              />{" "}
            </Link>

            <h6 style={{ padding: "10px" }} className="features">
              Reset Password
          </h6>
            <form className={classes.form} noValidate onSubmit={this.ResetPasword}>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={this.handleChange}
                label="new password"
                type="password"
                id="password"
                autoComplete="reset-password"
              />
               {errors.password.length < 6 && <span style={{color: "red"}}>{this.state.errors.passLength}</span>}
                  {errors.password != '' && <span style={{color: "red"}}>{this.state.errors.password}</span>}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPass"
                value={newPass}
                pattern = {password}
                label="Confirm Password"
                onChange={this.handleChange}
                type="password"
                id="password"
                autoComplete="reset-password"
              />
              {errors.password.length < 6 && <span style={{color: "red"}}>{this.state.errors.passLength}</span>}
                  {errors.password != '' && <span style={{color: "red"}}>{this.state.errors.password}</span>}


              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor:"black",color:'white'}}
                className={classes.submit}
              >
                Reset Password
              </Button>

            </form>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(ResetPassword);
