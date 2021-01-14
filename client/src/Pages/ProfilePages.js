import React, { Component } from 'react'

//redux
import { connect } from 'react-redux';
import {profileFetchThunk, ownProfileFetchThunk} from '../actions/profileActions'
import {logoutNowThunk} from '../actions/loginActions'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import Submenu from '../Component/Submenu'


//UI, CSS
import Grid from '@material-ui/core/grid';
import Switch from '@material-ui/core/Switch';

//Components
import ProfileView from '../Component/ProfileView';
import ProfileEdit from '../Component/ProfileEdit';

const locationOthers = "discover"
const locationOwnProfile = "settings"

class ProfilePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            userProfile: {}
        }
        let accessToken = localStorage.getItem('token');
        let id = this.props.match.params;
        JSON.stringify(id)==="{}" ? this.props.ownProfileFetch(accessToken):this.props.profileFetch(id.id, accessToken)
    //   (this.props.location !== "/settings") ? this.getProfile(this.props.params.id, accessToken):this.getOwnProfile(accessToken)
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

    changeRedirect = (data) => {
        this.setState({
            edit: false
        })
    }

    render() {
        return (
                <Grid container>
                {/* fetch own profile with edit toggle if path == 'settings' or no params */}
                {this.props.userData.sameUser ? (
                    <React.Fragment>
                        <TopBar value={locationOwnProfile} />
                        <Submenu item1="YOUR PROFILE" item2="LOGOUT" handleItem1={ this.toSettings } handleItem2={this.logout} />
                            
                    <Grid component="label" container alignItems="center" justify="center"  style={{ margin: '1em 0' }}>
                        <Grid item className="profile-switch-label">View</Grid>
                        <Grid item>
                            <Switch size="small" color="primary" checked={this.state.edit} onChange={this.handleToggleChange} name="edit" />
                        </Grid>
                        <Grid item className="profile-switch-label">Edit</Grid>
                    </Grid>
                    {this.state.edit ? (<ProfileEdit parentCallback={this.changeRedirect}/>
                    ) : (
                    <ProfileView />)}
                    </React.Fragment>
                    ) : (
                // else, render profile only
                <React.Fragment>
                    <TopBar value={locationOthers} />
                    <Grid container style={{width: '100%', marginTop:'11vh'}} />
                    <ProfileView notOwnProfile={true} params={this.props.match.params.id} />
                </React.Fragment>)}
                    

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
        },
        ownProfileFetch: (accessToken) => {
            dispatch(ownProfileFetchThunk(accessToken))
        },
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePages);