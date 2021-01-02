import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { loginUserThunk } from '../actions/loginActions';

//Components, pages
import TopBar from '../Component/TopBar'
import fbIcon from '../img/icons/facebook.png'
import googleIcon from '../img/icons/google.png'
import { loginFacebookThunk, loginGoogleThunk } from '../actions/loginActions';


// Social login
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

//UI/ CSS
import { Button, Grid, TextField } from '@material-ui/core';
import './css/logIn.css';

const textFieldStyle = {
    width: "100%",
	margin: "0.6em 0"
}


//TopBar props
const location = "logIn";

export class Login extends Component {
        constructor(props) {
        super(props);
        this.state = {
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
    
    render() {
        // if isAuthenticated, redirect to dashboard
        if (this.props.isAuthenticated) {
            return (<Redirect to="/dashboard" />)
        } else {
        return (
        <React.Fragment>
            <TopBar value={ location } />
            
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
                        render={renderProps => (<img src={fbIcon} onClick={renderProps.onClick} style={{cursor:'pointer', margin: '0 1em', width: '2em'}} alt="Facebook"/>)} 
                            />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderProps => (
                        <img src={googleIcon} onClick={renderProps.onClick} style={{cursor:'pointer', margin: '0 1em', width: '2em'}} alt="Google"/>
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

        </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);