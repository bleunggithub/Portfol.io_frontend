import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import {profileFetchThunk, ownProfileFetchThunk} from '../actions/profileActions'

//UI, CSS
import Grid from '@material-ui/core/grid';
import Switch from '@material-ui/core/Switch';
import './css/profile.css';

//Components
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            userProfile: {}
        }
        let accessToken = localStorage.getItem('token');
        let id = this.props.params;
        (JSON.stringify(id)==="{}") ? this.props.ownProfileFetch(accessToken):this.props.profileFetch(id.id, accessToken)
        
    //   (this.props.location !== "/settings") ? this.getProfile(this.props.params.id, accessToken):this.getOwnProfile(accessToken)

    }
    
    
    handleToggleChange = (e) => {
        this.setState({ edit: !this.state.edit })
    }

    render() {
        return (
            <Grid container>
                {this.props.location === "/settings" || JSON.stringify(this.props.params) === "{}" ? (
                    <React.Fragment>
                    <Grid component="label" container alignItems="center" justify="center"  style={{ margin: '1em 0' }}>
                        <Grid item className="profile-switch-label">View</Grid>
                        <Grid item>
                            <Switch size="small" color="primary" checked={this.state.edit} onChange={this.handleToggleChange} name="edit" />
                        </Grid>
                        <Grid item className="profile-switch-label">Edit</Grid>
                    </Grid>
                    {this.state.edit ? (<ProfileEdit />
                    ) : (
                    <ProfileView />)}
                    </React.Fragment>
                ) : (
                    <ProfileView notOwnProfile={true} params={this.props.params.id} />)}
                

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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
