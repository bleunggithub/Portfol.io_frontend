import React, { Component } from 'react';
import axios from 'axios';

//UI, CSS
import Grid from '@material-ui/core/grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import CheckIcon from '@material-ui/icons/Check';

import './css/profile.css';

//Components
import websiteIcon from '../img/icons/website.png'
import facebookIcon from '../img/icons/facebook2.png'
import githubIcon from '../img/icons/github.png'
import linkedinIcon from '../img/icons/linkedin.png'
import twitterIcon from '../img/icons/twitter.png'
import ProjectGrid from './ProjectGrid';
import RoomIcon from '@material-ui/icons/Room';


export default class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            followSuccess: false,
            following: this.props.userData.isFollowing,
        }
        
    }
    
    handleFollow = () => {
        let accessToken = localStorage.getItem('token');
        let id = this.props.params;

        axios.post(`${process.env.REACT_APP_API_SERVER}/users/follow/${id}`, { //!handle backend
            accessToken
        }).then(res => {
            // console.log(res.data)
            this.props.getProfile(id, accessToken)
            this.setState({
                followSuccess: true,
            })
        }).then(() => {
            setTimeout(() => {
                this.setState({followSuccess: false})
            }, 5000)
        })
        
    }

    handleContact = () => {
        
    }

    
    render() {
        return (
            <Grid container className="profile-view-outermost-container">
                <Grid item xs={12} sm={6} >
                    <Grid item xs={12} md={12}>
                        <Grid item xs={12} md={12}>
                            <p className="profile-view-title-text-projects"><Hidden smUp><Avatar alt={this.props.userData.full_name} src={this.props.userData.user_img_url} style={{display:"inline-block", marginRight:"1em"}} /></Hidden>Projects</p>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{minHeight:"20vh"}}>
                            <ProjectGrid/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    <Grid container justify="flex-start" alignItems="flex-start" className="profile-view-personal-details-container">
                        <Grid item xs={2} sm={2}>
                            <Grid item xs={12} className="profile-view-grid-item profile-view-icons-grid">
                                {this.props.userData.website_url ? (<Tooltip title="Website" placement="left"><a href={this.props.userData.website_url} rel="noreferrer" target="_blank"><img src={websiteIcon} alt="website" className="profile-view-link-icons" /></a></Tooltip>): ""}
                                {this.props.userData.github_url ? (<Tooltip title="Github" placement="left"><a href={this.props.userData.github_url} rel="noreferrer" target="_blank"><img src={githubIcon} alt="github" className="profile-view-link-icons" /></a></Tooltip>): ""}
                                {this.props.userData.linkedin_url ? (<Tooltip title="LinkedIn" placement="left"><a href={this.props.userData.linkedin_url} rel="noreferrer" target="_blank"><img src={linkedinIcon} alt="linkedin" className="profile-view-link-icons" /></a></Tooltip>): ""}
                                {this.props.userData.twitter_url ? (<Tooltip title="Twitter" placement="left"><a href={this.props.userData.twitter_url} rel="noreferrer" target="_blank"><img src={twitterIcon} alt="twitter" className="profile-view-link-icons" /></a></Tooltip>): ""}
                                {this.props.userData.facebook_url ? (<Tooltip title="Facebook" placement="left"><a href={this.props.userData.facebook_url} rel="noreferrer" target="_blank"><img src={facebookIcon} alt="facebook" className="profile-view-link-icons" /></a></Tooltip>): ""}
                            </Grid>
                        </Grid>
                        <Grid item xs={10} sm={9} className="profile-view-profile-pic-outer-container">
                            <Grid item xs={4} sm={6} md={7} className="profile-view-grid-item profile-view-profile-pic-container">
                                <img src={this.props.userData.user_img_url} alt={ this.props.userData.full_name } className="profile-view-user-img" />
                            </Grid>  
                            
                            <Grid item xs={12} sm={12} md={12} className="profile-view-grid-item profile-view-name-container">
                                <p className="profile-view-full-name">{this.props.userData.full_name}</p>
                                {this.props.userData.job_title && this.props.userData.company ? 
                                    (<React.Fragment><p className="profile-view-light-text">Currently</p>
                                    <span className="profile-view-current">{this.props.userData.job_title}</span>
                                    <span className="profile-view-light-text-inline"> at </span>
                                    <span className="profile-view-current">{this.props.userData.company}</span></React.Fragment>):""}

                                {this.props.userData.location ? 
                                    (<React.Fragment>
                                       <p className="profile-view-current" style={{marginBottom: "0"}}><RoomIcon fontSize="small" style={{verticalAlign: "sub"}} />Hong Kong</p> 
                                    </React.Fragment>):""}
                                <br />
                                {this.props.userData.sameUser || this.props.userData.facebookUser || this.props.userData.googleUser ? (
                                    <React.Fragment>
                                        <Button variant="contained" disabled disableElevation color="primary" size="small" style={{marginRight:"1em"}}>Follow</Button>
                                        <Button variant="outlined" disabled size="small">Contact</Button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                            {this.props.userData.isFollowing ? (
                                                <Button variant="contained" disableElevation color="primary" size="small" style={{ marginRight: "1em" }} onClick={this.handleFollow}>Unfollow</Button>
                                            ) : (
                                                <Button variant="contained" disableElevation color="primary" size="small" style={{marginRight:"1em"}} onClick={this.handleFollow}>Follow</Button>
                                            )
                                            }
                                            
                                        <Button variant="outlined" size="small" onClick={this.handleContact}>Contact</Button>
                                            {this.state.followSuccess ? <CheckIcon fontSize="small" color="primary" />:""}
                                    </React.Fragment>
                                )}
                            </Grid>
                        </Grid>


                    </Grid>
                

                    <Grid container justify="center" alignContent="center" className="profile-view-summary-container">
                        <Grid container justify="center" className="profile-view-about-me-section">
                            {this.props.userData.summary ? (
                                <React.Fragment>
                                <Grid item xs={1} sm={1} md={1} className="profile-view-vertical-text-container" >
                                    <p className="profile-view-title-text">About Me </p>
                                </Grid>
                            <Grid item xs={9} sm={10} md={10} style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                                <Grid item xs={12}>
                                    <p>{ this.props.userData.summary }</p>    
                                
                                        </Grid>
                                   
                                

                                    </Grid>
                                </React.Fragment>) : ""}
                            <Grid style={{width:"100%", minHeight: '2em'}}></Grid>
                            
                            {this.props.userData.skillsArray ? (

                                <Grid item xs={10}>
                                    <p className="profile-view-light-text">Main Skills</p>
                                    {this.props.userData.skillsArray.map((skill, i) => (
                                        <Chip key={i} color="primary" size="small" variant="outlined" label={skill} style={{ marginRight: "0.5em" }} />
                                    ))}
                                </Grid>) :""}

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

