import React, { Component } from 'react'

//redux
import { connect } from 'react-redux';
import {profileFetchThunk} from '../actions/profileActions'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//UI, CSS
import Grid from '@material-ui/core/Grid';

//Components
import ProfileView from '../Component/ProfileView';

const locationOthers = "discover"

class ProfilePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {},
            errorOpen: false,
            errorMessage: null,
        }
        let accessToken = localStorage.getItem('token');
        let id = this.props.match.params;
        this.props.profileFetch(id.id, accessToken)
   
    }

    handleToggleChange = (e) => {
        this.setState({ edit: !this.state.edit })
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
            <Grid container>


                    <TopBar value={locationOthers} />
                    <Grid container style={{width: '100%', marginTop:'10vh'}} />
                <ProfileView notOwnProfile={true} params={this.props.match.params.id} handleErrorCB={this.handleError}/>
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
})

const mapDispatchToProps = dispatch => {
    return {
        profileFetch: (id, accessToken) => {
            dispatch(profileFetchThunk(id, accessToken))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePages);