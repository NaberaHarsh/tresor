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
    const { newPass, password } = this.state;
    const userdata = { newPass, password };
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
        console.log(response.data);
        if (response.data.status === true) {
          this.setState({
            token: "",
            isLogin: true
          });
        }
      })
      .catch(err => { });
  };

  render() {
    const { classes } = this.props;
    const { newPass, password, isLogin, token } = this.state;
    console.log(this.state);
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
                  marginTop: "5px",
                  marginBottom: "4px"
                }}
                src="/logo.jpg"
                alt=""
              />{" "}
            </Link>

            <h6 style={{ padding: "10px" }} className="features">
              Reset Password
          </h6>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={this.handleChange}
                label="Create New Password"
                type="password"
                id="password"
                autoComplete="reset-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPass"
                value={newPass}
                label="Confirm Password"
                onChange={this.handleChange}
                type="password"
                id="password"
                autoComplete="reset-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
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
