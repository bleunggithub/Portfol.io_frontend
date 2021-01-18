import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { registerThunk } from '../actions/registerActions';
import { loginFacebookThunk, loginGoogleThunk } from '../actions/loginActions';

// Social login
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

//UI/ CSS
import './css/signUp.css';
import { Button, Grid, TextField, Checkbox } from '@material-ui/core';
import { Image, Placeholder } from 'cloudinary-react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const textFieldStyle = {
    width: "100%",
	margin: "0.6em 0"
}

const checkboxStyle = {
	textAlign: "left",
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	margin: "2em 0",

}

export class SignUp extends Component {
        constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errorOpen: false,
            errorMessage: null
        }
    }


    //display changes on form data
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    //submit form data
    handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

    this.props.register(userData)
    }

    responseFacebook = userData => {
        if (userData) {
            this.props.loginFacebookRedux(userData)
        }
        return null;
    } 

    responseGoogle = userData => {
        if (userData) {
            this.props.loginGoogleRedux(userData)
        }
        return null;
    } 

            //snackbar close
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            errorOpen:false,
            errorMessage:null
        })
    };

    componentDidUpdate() {
        if (this.props.errorMessage != null) {
            this.setState({
                errorMessage: this.props.errorMessage,
                errorOpen: true
            })
        }
    }
    
    render() {
        // if isAuthenticated, redirect to dashboard
        if (this.props.isAuthenticated) {
            return (<Redirect to="/dashboard" />)
        } else {
        return (
          
            <Grid container justify="center" className="signUp-grid-container">
            <form onSubmit={this.handleSubmit} className="signUp-form">
                <Grid item xs={12} sm={6} md={3} className="signUp-grid-item">
                    <h2 style={{fontFamily: "Montserrat"}}>SIGN UP TO <span className="signUp-highlight">PORTFOL.IO</span></h2>

                    <TextField label="Name" name="name" value={this.state.name} onChange={this.handleChange} style={textFieldStyle} required />
                    <TextField label="Email" name="email" value={this.state.email} onChange={this.handleChange} style={textFieldStyle} required />
                    <TextField label="Password" name="password" type="password" placeholder="6+ characters" value={this.state.password} onChange={this.handleChange} style={textFieldStyle} required />                    
                    <Grid item style={checkboxStyle}>
                        <Checkbox name="checkboxTC" color="primary" inputProps={{ 'aria-label': 'agreeTC' }} required />
                        <label for="checkboxTC" style={{ fontSize: '0.7em' }}>I have read, understood and accept the terms and conditions.</label>
                </Grid>
                <Grid container justify="space-between">
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" type="submit">SIGN UP</Button>
                    </Grid>
                    <Grid item xs={5}>
                    <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        isMobile={false}
                        render={renderProps => (
                            <Image
                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                public_id="portfolio_capstone_project/icons/facebook_l7ml0w"
                                width="32"
                                height="32"
                                loading="lazy"
                                className="signUp-icons-social"
                                onClick={renderProps.onClick}
                            >
                                <Placeholder type="vectorize" />
                            </Image>
                            )} 
                            />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderProps => (
                            <Image
                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                public_id="portfolio_capstone_project/icons/google_niqh9w"
                                width="32"
                                height="32"
                                loading="lazy"
                                className="signUp-icons-social"
                                onClick={renderProps.onClick}
                            >
                                <Placeholder type="vectorize" />
                            </Image>
                            
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                        
                    </Grid>
                    </Grid>
                </Grid>
            </form>

                {/* handle errors */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.errorOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.state.errorMessage}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </Grid>

        )
        }
        
    }
}



//redux
const mapStateToProps = state => ({
    errorMessage: state.login.errorMessage,
    isAuthenticated: state.login.isAuthenticated,
    userType: state.login.userType,
})

const mapDispatchToProps = dispatch => {
    return {
        register: (userData) => {
            dispatch(registerThunk(userData))
        },
        loginFacebookRedux: (userData) => {
            dispatch(loginFacebookThunk(userData))
        },
        loginGoogleRedux: (userData) => {
            dispatch(loginGoogleThunk(userData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);