import React, { Component } from 'react'

//redux
import { connect } from 'react-redux';
import {profileFetchThunk} from '../actions/profileActions'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'


//UI, CSS
import Grid from '@material-ui/core/grid';

//Components
import ProfileView from '../Component/ProfileView';

const locationOthers = "discover"

class ProfilePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {}
        }
        let accessToken = localStorage.getItem('token');
        let id = this.props.match.params;
        this.props.profileFetch(id.id, accessToken)
   
    }

    handleToggleChange = (e) => {
        this.setState({ edit: !this.state.edit })
    }


    render() {
        return (
            <Grid container>

                <React.Fragment>
                    <TopBar value={locationOthers} />
                    <Grid container style={{width: '100%', marginTop:'11vh'}} />
                    <ProfileView notOwnProfile={true} params={this.props.match.params.id} />
                </React.Fragment>
                    

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