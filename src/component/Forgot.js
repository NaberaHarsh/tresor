import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
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

  form: {
    width: "100%",
    marginTop: theme.spacing(0),
    padding: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Forgot() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper style={{ backgroundColor: "ghostwhite",marginBottom: "10px" }}>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}> */}
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
          {/* </Avatar> */}
          <h6 style={{ padding: "10px" }} className="features">
            Reset Password here !
          </h6>
          <form className={classes.form} noValidate>
              
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            
            <Link href="/ResetPassword" variant="body2">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Reset Password
              </Button>
            </Link>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
