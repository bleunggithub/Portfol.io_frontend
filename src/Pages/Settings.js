import React, { Component } from 'react'

//redux
import { connect } from 'react-redux';
import {ownProfileFetchThunk} from '../actions/profileActions'
import {logoutNowThunk} from '../actions/loginActions'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import Submenu from '../Component/Submenu'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


//UI, CSS
import Grid from '@material-ui/core/grid';
import Switch from '@material-ui/core/Switch';

//Components
import ProfileView from '../Component/ProfileView';
import ProfileEdit from '../Component/ProfileEdit';

const locationOwnProfile = "settings"

class ProfilePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            userProfile: {},
            errorOpen: false,
            errorMessage: null,
        }
        let accessToken = localStorage.getItem('token');
        this.props.ownProfileFetch(accessToken)
    }

    handleToggleChange = (e) => {
        this.setState({ edit: !this.state.edit })
    }

    toSettings = () => {
        this.props.history.push("/settings")
    }

    logout = () => {
        this.props.logout()
    }

    changeRedirect = () => {
        this.setState({
            edit: false
        })
    }

    //snackbar close
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            errorOpen: false,
            errorMessage: null
        })
    };

    handleError = (data, error) => {
        this.setState({
            errorMessage: error,
            errorOpen: true
        })
    }

    componentDidUpdate() {
        if (this.props.errorMessage != null) {
            this.setState({
                errorMessage: this.props.errorMessage,
                errorOpen: true
            })
        }
    }

    render() {
        return (
                <Grid container justify="center">
                <TopBar value={locationOwnProfile} />
                <Grid container justify="center" className="dashboard-margin-top-container" />
                <Grid item xs={11} sm={10} style={{ marginTop: "5vh" }}>
                    <Submenu style={{ width: '20vw' }} toSettings={ this.toSettings } logOut={this.logout} />
                </Grid>
                            
                    <Grid component="label" container alignItems="center" justify="center"  style={{ marginBottom: '1em' }}>
                        <Grid item className="profile-switch-label">View</Grid>
                        <Grid item>
                            <Switch size="small" color="primary" checked={this.state.edit} onChange={this.handleToggleChange} name="edit" />
                        </Grid>
                        <Grid item className="profile-switch-label">Edit</Grid>
                    </Grid>
                    {this.state.edit ? (<ProfileEdit redirectCB={this.changeRedirect}  handleErrorCB={ this.handleError}/>
                    ) : (
                        <ProfileView handleErrorCB={ this.handleError}/>)}
                
            {/* handle error */}
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

const mapStateToProps = state => ({
    userData: state.profile.userData,
    errorMessage:state.profile.errorMessage,
})

const mapDispatchToProps = dispatch => {
    return {
        ownProfileFetch: (accessToken) => {
            dispatch(ownProfileFetchThunk(accessToken))
        },
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePages);