import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { loginUserThunk } from '../actions/loginActions';
import { loginFacebookThunk, loginGoogleThunk } from '../actions/loginActions';


// Social login
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';


//UI/ CSS
import { Button, Grid, TextField } from '@material-ui/core';
import './css/logIn.css';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Image, Placeholder } from 'cloudinary-react';

const textFieldStyle = {
    width: "100%",
	margin: "0.6em 0"
}

class LogIn extends Component {
        constructor(props) {
        super(props);
        this.state = {
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
            email: this.state.email,
            password: this.state.password,
        }

    this.props.login(userData)
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
        <React.Fragment>
            
            <Grid container justify="center" className="logIn-grid-container">
            <form onSubmit={this.handleSubmit} className="logIn-form">
                <Grid item xs={12} sm={6} md={3} className="logIn-grid-item">
                    <h2 style={{fontFamily: "Montserrat"}}>LOG IN TO <span className="logIn-highlight">PORTFOL.IO</span></h2>

                    <TextField label="Email" name="email" value={this.state.email} onChange={this.handleChange} style={textFieldStyle} required />
                    <TextField label="Password" name="password" type="password" placeholder="6+ characters" value={this.state.password} onChange={this.handleChange} style={textFieldStyle} required />                    

                <Grid container justify="space-between" style={{marginTop: '2em'}}>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" type="submit">LOG IN</Button>
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
                                className="logIn-icons-social"
                                onClick={renderProps.onClick}
                            >
                                <Placeholder type="vectorize" />
                            </Image>
                        )} 
                            />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <Image
                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                public_id="portfolio_capstone_project/icons/google_niqh9w"
                                width="32"
                                height="32"
                                loading="lazy"
                                className="logIn-icons-social"
                                onClick={renderProps.onClick}
                            >
                                <Placeholder type="vectorize" />
                            </Image>
                        )}
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

        </React.Fragment>
        )
        }
        
    }
}



//redux
const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated,
    errorMessage: state.login.errorMessage,
    userType: state.login.userType,
})

const mapDispatchToProps = dispatch => {
    return {
        login: (userData) => {
            dispatch(loginUserThunk(userData))
        },
        loginFacebookRedux: (userData) => {
            dispatch(loginFacebookThunk(userData))
        },
        loginGoogleRedux: (userData) => {
            dispatch(loginGoogleThunk(userData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);