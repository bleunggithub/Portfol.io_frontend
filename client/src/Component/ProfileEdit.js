import React, { Component } from 'react';
import axios from 'axios';

//UI, CSS
import Grid from '@material-ui/core/grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import './css/profile.css';

//Components
import websiteIcon from '../img/icons/website.png'
import facebookIcon from '../img/icons/facebook2.png'
import githubIcon from '../img/icons/github.png'
import linkedinIcon from '../img/icons/linkedin.png'
import twitterIcon from '../img/icons/twitter.png'
import ProjectGrid from './ProjectGrid';
import RoomIcon from '@material-ui/icons/Room';


export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userImg: "",
            isLoading: false
        }
    }
    
    //handle input field changes
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    //upload profile picture
    uploadProfilePic = (e) => {
        this.setState({ candidateImg: e.target.files[0].name })
        this.uploadProfilePicImgur(e);
    }

    //imgur api call
    uploadProfilePicImgur = (e) => {
        const formdata = new FormData()
        formdata.append("image", e.target.files[0])
        this.setState({ isLoading: true })
        
        fetch("https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/image/", {
            method: 'post',
            headers: {
                Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
            },
            body: formdata
        }).then(data => data.json()).then(data => { 
            console.log(data.data.link)
            this.setState({ candidateImgUrl: data.data.link })
            this.setState({ isLoading: false })
            
        })
    }

    changeProfilePicture = (e) => {
        e.preventDefault();

    //     const candidateData = {
    //         id: this.props.userData.id,
    //         candidateImgUrl: this.state.candidateImgUrl,
    //     }
    // //axios api call to backend
    // this.props.updateProfileThunk(candidateData)
    //     this.setState({
    //         candidateImgUrl: "",
    //         candidateImg: ""
    //     })
    }

    render() {
        return (
            <Grid container justify="center">

                <Grid container justify="center" alignItems="center" className="profile-view-personal-details-container">
                    <Grid item xs={8} md={4} className="profile-view-grid-item profile-view-name-container">

                        <form onSubmit={this.changeName} method="POST" className="formStyleCenter">
                            <div className="formFlexDivCenter">
                                <TextField label="Update Name" name="fullName" value={this.state.fullName} placeholder={this.props.userData.full_name} onChange={this.handleChange} className="textFieldStyle" required />
                                <Button variant="outlined" color="primary" size="small" type="submit" style={{margin:"1em"}}>confirm</Button>
                            </div>
                        </form>

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

                <Grid container justify="center" alignContent="center">
                    <Grid item xs={12} md={8}>
                        <p className="profile-view-title-text-projects"> Projects</p>
                    </Grid>
                    <Grid item xs={12} md={8} style={{minHeight:"20vh"}}>
                        <ProjectGrid />
                    </Grid>
                </Grid>

            </Grid>



        )
    }
}

//002-girl: https://i.imgur.com/wdkAL7s.png
//003-man: https://i.imgur.com/t7FVhRO.png
//020-delivery man: https://i.imgur.com/YZQ4iOr.png
//028-girl: https://i.imgur.com/o9qKWxf.png


// userData:
// current_company: null
// current_job_title: null
// email: "pc20001060@hotmail.com"
// facebookUser: true
// facebook_url: null
// full_name: "Betty Bee"
// github_url: null
// googleUser: false
// linkedin_url: null
// projects: Array(1)
// 0: {project_id: 3, users_id: 4, project_img_url: "https://images.unsplash.com/photo-1572177812156-58…D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80", project_title: "No project yet.", project_summary: "", …}
// length: 1
// __proto__: Array(0)
// skills: null
// summary: null
// twitter_url: null
// user_img_url: "https://i.imgur.com/f2ZLSvq.png"
// website_url: null

{/* <Grid container wrap="wrap">
    <form onSubmit={this.changeProfilePicture} method="POST" className="formStyleCenter">
        <input accept="image/*" style={{ display: 'none' }} type="file" id="contained-button-file" onChange={this.uploadProfilePic} />
        <div style={{height:"1.5em", width:"100%", margin: "0.5em 0" }}>{this.state.userImg}</div>
        <div className="formFlexDivCenter">
            <label htmlFor="contained-button-file" style={{margin:"1em"}}>
                <Button variant="outlined" color="primary" size="small" component="span"> Change </Button>
            </label>
            {this.state.isLoading ? (<CircularProgress color="secondary" size="1.5em" />) : ""}
            {this.state.isLoading ? 
                <Button variant="outlined" color="primary" size="small" type="submit" style={{ margin: "1em" }} disabled>Submit</Button> :
                <Button variant="outlined" color="primary" size="small" type="submit" style={{ margin: "1em" }}>Submit</Button>
        }
        </div>
    </form>
</Grid> */}