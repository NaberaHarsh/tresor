import React, { Component } from 'react';
// import { Table} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Container, Paper, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import { getLoginData } from '../utils/session';
import axios from "axios";
import APIUrl from "../utils/APIUrl";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { isLogin } from '../utils/session';
import callApi from "../utils/callApi";





const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    sectionDesktop: {
        display: "flex",
        width: '100%',
        flexDirection: 'row'
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    root: {
        width: "100%"
    },
    grow: {
        flexGrow: 1
    }
});


class OrderDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDetailList: [],
            show: true
        }
    }



    componentDidMount() {
        const orderDetailList = localStorage.getItem("orderDetailList");
        const dataGet = localStorage.getItem("dataGet");

        if (orderDetailList && dataGet && !navigator.onLine) {
            this.setState({
                lat_orderDetailList: JSON.parse(orderDetailList),
                like_orderDetailList: JSON.parse(dataGet)
            }, () => {
            });
            return;
        } else if (!navigator.onLine) {
            alert("you are offline");
            return;
        }

        const requestOptions = {
            method: "GET",
            url:`${APIUrl.url.UserOrder}/${this.props.match.params.id}`

        };
        callApi(requestOptions, (err, response) => {
            if (err) {
                return;
            }
            localStorage.setItem("orderDetailList", JSON.stringify(response.data.product));
            localStorage.setItem("dataGet", JSON.stringify(response.data.product.length));
            this.setState({
                orderDetailList: response.data.product,
                dataGet: response.data.product.length,
                loading: true
            });
        });
    }


    render() {
        return (
            <div style={{ padding: "10px" }}>
                <hr />
                <p>Order Details</p>
                <hr />
                <Container maxWidth="lg">
                    <Grid item xs={12} sm={12}>
                        <Paper style={{ width: "100% ! important" }}>

                            <Grid container space={3}>
                                <Grid md={12} lg={12} container space={3}>
                                    <hr style={{ width: "95%" }} />
                                    {this.state.orderDetailList.map(p =>

                                        <Grid md={12} lg={12} sm={12} xs={12} container space={3} >


                                            <Grid md={4} lg={4} sm={6} xs={6} >
                                                <Link href={`/Details/${p.product_id}`}>
                                                    <center><img class="img-fluid" src={p.product_image} style={{ maxHeight: 120, maxWidth: 120, height: 'auto', width: '100%', border: "solid #515151 1px" }} /></center>
                                                </Link>
                                            </Grid>
                                            <Grid md={8} lg={8} sm={6} xs={6} container space={2} >
                                                <Grid md={4} lg={4} sm={12} xs={12}>
                                                    <div style={{ textAlign: 'center', color: 'black', display: 'block', fontSize: '14px' }}>{p.product_name}</div>
                                                </Grid>
                                                <Grid md={4} lg={4} sm={12} xs={12}>
                                                    <div style={{ textAlign: 'center', color: 'black', fontSize: '14px'}}>{p.price}/- Rs. </div>
                                                </Grid>

                                                <Grid md={3} lg={3} sm={12} xs={12} style={{ textAlign: 'center' }}>

                                                    {/* <AddIcon  style={{ display: 'inline', color: 'black', height: '20px', width: "20px" }} /> */}
                                                    
                                                    <div style={{ display: 'inline', verticalAlign: 'super', paddingLeft: '10px', color: 'black',fontSize:'14px', paddingRight: '10px' }}>Quantity:{p.quantity}</div>
                                                    {/* <RemoveIcon style={{ display: 'inline', color: 'black', height: '20px', width: "20px" }} /> */}



                                                </Grid>
                                                 </Grid>

                                            <hr style={{ width: "95%" }} />


                                        </Grid>)}
                                </Grid>

                               
                            </Grid>
                        </Paper>
                    </Grid>
                </Container>
            </div>


        )

    }

}

export default withStyles(styles)(OrderDetails);