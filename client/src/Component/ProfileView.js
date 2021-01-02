import React, { Component } from 'react';

//UI, CSS
import Grid from '@material-ui/core/grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

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
    
    render() {
        return (
            <Grid container justify="center">
                <Grid container justify="center" alignContent="center">
                    <Grid item xs={12} md={8}>
                        <p className="profile-view-title-text-projects"><Avatar alt={this.props.userData.full_name} src={this.props.userData.user_img_url} style={{display:'inline-block'}}/>Projects</p>
                    </Grid>
                    <Grid item xs={12} md={8} style={{minHeight:"20vh"}}>
                        <ProjectGrid />
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" className="profile-view-personal-details-container">
                    <Grid item xs={8} md={4} className="profile-view-grid-item profile-view-name-container">
                        <p className="profile-view-full-name">{this.props.userData.full_name}</p>
                        <p className="profile-view-light-text">Currently</p>
                        {/* <p className="profile-view-current">{this.props.userData.current_job_title}</p> */}
                        <span className="profile-view-current">Software Engineer</span> <span className="profile-view-light-text-inline"> at </span>
                        {/* <p className="profile-view-current">{this.props.userData.current_company}</p> */}
                        <span className="profile-view-current">Amazon.co.uk</span><br/>
                        <p className="profile-view-current" style={{marginBottom: "0"}}><RoomIcon fontSize="small" style={{verticalAlign: "sub"}} />Hong Kong</p><br/>
                        <Button variant="contained" disabled disableElevation color="primary" size="small" style={{marginRight:"1em"}}>Follow</Button>
                        <Button variant="outlined" disabled size="small">Contact</Button>
                    </Grid>

                    <Grid item xs={4} md={2} className="profile-view-grid-item profile-view-profile-pic-container">
                        {/* <img src={this.props.userData.user_img_url} alt={ this.props.userData.full_name }/> */}
                        <img src="https://i.imgur.com/wdkAL7s.png" alt={ this.props.userData.full_name } className="profile-view-user-img" />
                    </Grid>
                </Grid>

                <Grid container justify="center" alignContent="center" className="profile-view-summary-container">
                    <Grid item xs={12} sm={1} md={1} className="profile-view-grid-item profile-view-icons-grid">
                        {/* {this.props.userData.website_url ? (<Tooltip title="Website" placement="left"><a href={this.props.userData.website_url} rel="noreferrer" target="_blank"><img src={websiteIcon} alt="website" className="profile-view-link-icons" /></a></Tooltip>): ""} */}
                        <Tooltip title="Website" placement="left"><a href={this.props.userData.website_url} rel="noreferrer" target="_blank"><img src={websiteIcon} alt="website" className="profile-view-link-icons" /></a></Tooltip>
                        {/* {this.props.userData.github_url ? (<Tooltip title="Github" placement="left"><a href={this.props.userData.github_url} rel="noreferrer" target="_blank"><img src={githubIcon} alt="github" className="profile-view-link-icons" /></a></Tooltip>): ""} */}
                        <a href={this.props.userData.github_url} rel="noreferrer" target="_blank"><img src={githubIcon} alt="github" className="profile-view-link-icons" /></a>
                        {/* {this.props.userData.linkedin_url ? (<Tooltip title="LinkedIn" placement="left"><a href={this.props.userData.linkedin_url} rel="noreferrer" target="_blank"><img src={linkedinIcon} alt="linkedin" className="profile-view-link-icons" /></a></Tooltip>): ""} */}
                        <a href={this.props.userData.linkedin_url} rel="noreferrer" target="_blank"><img src={linkedinIcon} alt="linkedin" className="profile-view-link-icons" /></a>
                        {/* {this.props.userData.twitter_url ? (<Tooltip title="Twitter" placement="left"><a href={this.props.userData.twitter_url} rel="noreferrer" target="_blank"><img src={twitterIcon} alt="twitter" className="profile-view-link-icons" /></a></Tooltip>): ""} */}
                        <a href={this.props.userData.twitter_url} rel="noreferrer" target="_blank"><img src={twitterIcon} alt="twitter" className="profile-view-link-icons" /></a>
                        {/* {this.props.userData.facebook_url ? (<Tooltip title="Facebook" placement="left"><a href={this.props.userData.facebook_url} rel="noreferrer" target="_blank"><img src={facebookIcon} alt="facebook" className="profile-view-link-icons" /></a></Tooltip>): ""} */}
                        <a href={this.props.userData.facebook_url} rel="noreferrer" target="_blank"><img src={facebookIcon} alt="facebook" className="profile-view-link-icons" /></a>
                    </Grid>
                    
                    <Grid className="profile-view-about-me-section">
                        {/* {this.props.userData.summary ? ( */}
                        <Grid item xs={1} sm={1} md={1} className="profile-view-vertical-text-container" >
                            <p className="profile-view-title-text">About Me </p>
                        </Grid>
                        <Grid item xs={9} sm={10} md={10} style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                            <Grid item xs={12}>
                                {/* <p>{ this.props.userData.summary }</p>     */}
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapib.</p>    
                                {/* ) : ""} */}
                            </Grid>
                            <Grid item xs={12}>
                                <p className="profile-view-light-text">Main Skills</p>
                                {this.props.userData.skillsArray ? (this.props.userData.skillsArray.map((skill, i) => (
                                    <Chip key={i} color="primary" size="small" variant="outlined" label={skill} style={{marginRight: "0.5em"}}/>
                                ))):""}                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



            </Grid>
        )
    }
}

