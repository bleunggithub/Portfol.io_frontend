import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { registerThunk } from '../actions/registerActions';

//Components, pages
import fbIcon from '../img/icons/facebook.png'
import googleIcon from '../img/icons/google.png'
import { loginFacebookThunk, loginGoogleThunk } from '../actions/loginActions';


// Social login
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

//UI/ CSS
import { Button, Grid, TextField, Checkbox } from '@material-ui/core';
import './css/signUp.css';

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
                        render={renderProps => (<img src={fbIcon} onClick={renderProps.onClick} style={{cursor:'pointer', margin: '0 1em', width: '2em'}} alt="Facebook" />)} 
                            />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderProps => (
                        <img src={googleIcon} onClick={renderProps.onClick} style={{cursor:'pointer', margin: '0 1em', width: '2em'}} alt="Google" />
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                        
                    </Grid>
                    </Grid>
                </Grid>
            </form>

            </Grid>

        )
        }
        
    }
}



//redux
const mapStateToProps = state => ({
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