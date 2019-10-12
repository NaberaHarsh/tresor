import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Link } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import footerbg from "./footerbg.jpg";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
// import InputBase from "@material-ui/core/InputBase";
// import AddIcon from '@material-ui/icons/Add';
class Fotter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div
          style={{
            backgroundImage: "url(" + footerbg + ")",
            backgroundColor: "#222224",
            color: "#fff"
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Typography style={{ marginTop: "20px" }} variant="subtitle2">
                  FREQUENTLY ASKED QUESTIONS
                </Typography>
                <List component="nav" aria-label="secondary mailbox folders">
                  <ListItem className="list">
                    <ListItemText primary="- Where i can buy these product?" />
                  </ListItem>
                  <ListItem className="list">
                    <ListItemText primary="- Why i need login?" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Typography style={{ marginTop: "20px" }} variant="subtitle2">
                  SOCIAL MEDIA
                </Typography>
                <List component="nav" aria-label="secondary mailbox folders">
                  <Link href="/">
                    <ListItem className="list">
                      <ListItemText primary="Facebook" />
                    </ListItem>
                    <ListItem className="list">
                      <ListItemText primary="Twitter" />
                    </ListItem>
                    <ListItem className="list">
                      <ListItemText primary="Google+" />
                    </ListItem>
                    <ListItem className="list">
                      <ListItemText primary="Pinterest" />
                    </ListItem>
                  </Link>
                </List>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Typography style={{ marginTop: "20px" }} variant="subtitle2">
                  CONTACT US
                </Typography>
                <div className="address">
                  <Typography variant="body2">
                    TRESOR JEWEL <br />
                    42 West 48th Street,
                    <br />
                    Suite #303 New York,
                    <br />
                    NY-10036
                  </Typography>
                </div>
                
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
              <div className="footer-div">
              <Typography style={{ marginTop: "20px" }} variant="subtitle2">
                  <span></span>
                </Typography>
                  <Typography
                    className="address"
                    style={{ align: "left" }}
                    variant="body2"
                  >
                    <MailOutlineIcon /> <span>tresorjewelryinc@gmail.com</span>
                  </Typography>
                  <Typography className="address" variant="body2">
                    <MobileScreenShareIcon /><span> (212) 471-0021 </span>
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
          <hr className="footer-hr" />
          <Typography style={{ padding: "4px",marginLeft:'10px' }} variant="subtitle2">
            Copyright 2019 TRESOR JEWEL. All rights reserved.
          </Typography>
        </div>
      </div>
    );
  }
}

export default Fotter;
