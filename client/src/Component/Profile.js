import React, { Component } from 'react';
import axios from 'axios';


//UI, CSS
import Grid from '@material-ui/core/grid';
import Switch from '@material-ui/core/Switch';
import './css/profile.css';

//Components
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            userProfile: {}
        }

      let accessToken = localStorage.getItem('token');
      (this.props.match === undefined) ? this.getOwnProfile(accessToken) : this.getProfile(this.props.match.params.userId, accessToken)
      //   (this.props.location == "/settings") ? this.getOwnProfile(accessToken) : ""
    }
    
    getOwnProfile = (accessToken) => {
        axios.post(`${process.env.REACT_APP_API_SERVER}/users/getOwnProfile/`, {
            accessToken
        }).then(res => {
            // console.log(res.data)
            this.setState({userProfile: res.data})
        })
    }

    getProfile = () => {

    }
    
    handleToggleChange = (e) => {
        this.setState({ edit: !this.state.edit })
    }

    render() {
        return (
            <Grid container>
                {this.props.match === undefined ? (
                    <Grid component="label" container alignItems="center" justify="center"  style={{ margin: '1em 0' }}>
                        <Grid item className="profile-switch-label">View</Grid>
                        <Grid item>
                            <Switch size="small" color="primary" checked={this.state.edit} onChange={this.handleToggleChange} name="edit" />
                        </Grid>
                        <Grid item className="profile-switch-label">Edit</Grid>
                    </Grid>
                ) : ""}
                
                {this.state.edit ? <ProfileEdit userData={ this.state.userProfile }/> : <ProfileView userData={ this.state.userProfile }/>}

            </Grid>
        )
    }
}
