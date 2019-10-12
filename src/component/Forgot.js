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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      retrievePage: false,
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
    const { email } = this.state;
    const userdata = { email };

    // convert json to form data with '&' seprater
    // const data = Object.keys(userdata)
    //   .map(key => {
    //     return (
    //       encodeURIComponent(key) + "=" + encodeURIComponent(userdata[key])
    //     );
    //   })
    //   .join("&");
    const requestOptions = {
      method: "POST",
      url: APIUrl.url.ForgotPassword,
      data: userdata,

    };
    console.log(requestOptions);
    

    axios(requestOptions)
      .then(response => {
      })
      .catch(err => { });
  };

  render() {
    const { classes } = this.props;
    const { email, retrievePage, token } = this.state;
    console.log(this.state);
    if (retrievePage) {
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
              Please check your email !
          </h6>
            <form className={classes.form} onSubmit={this.handleSubmit}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
               style={{backgroundColor:'black',color:'white'}}
                className={classes.submit}
              >
                Generate Link Here !
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(ForgotPassword);
