import React, { Component } from 'react'



//UI/CSS
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';


import './css/disclaimer.css'



export default class Disclaimer extends Component {


    handleClose = () => {
        this.props.handleClose();
    }

    handleErrorCB = () => {
        this.props.handleErrorCB("An Error has occurred, please try again.")
    }

    render() {
        return (
            <Grid container justify="center" alignItems="flex-start" style={{ height: "80vh",width: "90vw" }} className="disclaimer-outermost-container">
                    
                <Grid item xs={11} sm={11} md={9} className="disclaimer-content-grid">
                    <Grid container justify="flex-end" alignItems="center" style={{height:'5vh'}}>
                        <Fab color="secondary" className="disclaimer-close-fab" aria-label="close" size="small" style={{margin:'2em 0 1em 0'}} onClick={this.handleClose}>
                            <CloseIcon />
                        </Fab>
                    </Grid>
                    <p className="disclaimer-title">Disclaimer &#8226; Privacy Policy  &#8226; Terms of Use, etc...</p>
                    <Grid container>
                        <Grid item xs={12} sm={12} >
                            <ul>
                                <li>
                                    <u>! Important</u> : Please be aware that this website is a <u>TEST</u> site. 
                                </li>
                                <li>
                                    By signing up, you express consent to grant me access to your personal data (including but not limited to those) detailed in the section below.
                                </li>
                                <li>
                                    I have no intention of collecting data on or tracking how you interact with the website, and also of selling any data collected.
                                </li>
                                <li>
                                    Personal data collected is not shared with any unauthorised third party.
                                </li>
                                <li>
                                    All data collected will be destroyed within 12 months.
                                </li>
                                <li>
                                    Scope of data collected and stored upon signing up (including but not limited to the following):
                                     <ul>
                                        <li>
                                            Local sign up: your name, your email address, your password (hashed with bcrypt)
                                        </li>
                                        <li>
                                            Google sign up: your email, family name, given name, google Id, image URL, access token and token ID
                                        </li>
                                        <li>
                                            Facebook sign up: your name, email, profile picture URL, user ID and access token
                                        </li>
                                     </ul>
                                </li>
                                <li>
                                    Subsequent data collected:
                                     <ul>
                                        <li>
                                            Any personal and project details you entered into the website
                                        </li>
                                     </ul>
                                </li>
                                <li>
                                    Your email address is not made known to any other users, unless otherwise specified, e.g. when you use the 'contact' form to contact another user, your email and name 
                                    will be sent alongside your message, so that the receiver can identify you and reply to you directly.
                                </li>

                                <li>
                                    You may request access to, correction or deletion of your data, please contact me using the contact me form in the front page ('About this project' >> 'Contact Me').
                                </li>
                                <li>
                                    The content of this website is protected by applicable copyright law.
                                </li>
                                <li>
                                    Many of us pour our heart and soul into the work we do. Please refrain yourself from modifying or copying the materials shown on the website, 
                                    unless you have obtained explicit consent from the creator of such material :(
                                </li>
                            </ul>
 
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
