import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


//redux
import { connect } from 'react-redux';
import { followProfileThunk } from '../actions/profileActions'

//images
import { Image, Placeholder } from 'cloudinary-react';

//UI, CSS
import Grid from '@material-ui/core/grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';


import './css/profile.css';
import './css/projectGrid.css';


//Components
import ProjectGrid from './ProjectGrid';
import RoomIcon from '@material-ui/icons/Room';


class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            followSuccess: false,
            isFollowing: this.props.userData.isFollowing,
            email_subject: "",
            email_message: "",
            emailSuccess: false,
            projectDetails: [],
        }
    }
    
    componentDidMount() {
        this.fetchOthersProjects();
    }

    fetchOthersProjects = () => {

        if (!this.props.params) {
            return;
        } else {
            const params = this.props.params;
    
            axios.get(`${process.env.REACT_APP_API_SERVER}/projects/getOthersProjects/${params}`)
                .then(res => {
                // console.log(res.data)
                if (res.status !== 200) {
                    this.props.handleErrorCB(null, "An error has occurred, please try again.")
                    
                } else if (res.status === 200 && !res.data.projects) {
                    this.setState({
                        noProject: true
                    })
                } else {
                    this.setState({projectDetails: res.data.projects})
                }
            })
        }
    }
    

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleFollow = () => {
        const accessToken = localStorage.getItem('token');
        const id = this.props.params;

        this.props.followProfile(id, accessToken);

        this.setState({
                followSuccess: true,
        })
        
        setTimeout(() => {
                this.setState({followSuccess: false})
            }, 3000)
        
    }

    handleOpenContact = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleCloseContact = () => {
        this.setState({
            modalOpen: false,
            email_subject: "",
            email_message: ""
        })
    }

    submitContact = (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token')
        const profileId = this.props.params;
        
        const messageBody = {
            subject: this.state.email_subject,
            message: this.state.email_message
        }

        axios.post(`${process.env.REACT_APP_API_SERVER}/users/sendEmail/`, {
            messageBody, accessToken, profileId
        }).then(res => {
            // console.log(res.data.message)

            if (res.status !== 200) {
                console.log(res)
                this.props.handleErrorCB(null, "An error has occurred, please try again.")
            } else {
            this.setState({
                emailSuccess: true,
                email_subject: "",
                email_message:""
            })                
            }

        }).then(setTimeout(() => {
            this.setState({
                emailSuccess: false,
                modalOpen:false
            })
            }, 2000))
    }


    
    render() {
        return (
            <Grid container className="profile-view-outermost-container">
                <Grid item xs={12} sm={6} >
                    <Grid item xs={12} md={12}>
                        <Grid item xs={12} md={12}>
                            <p className="profile-view-title-text-projects">
                                <Hidden smUp>
                                    <Image
                                        cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                        public_id={this.props.userData.user_img_url}
                                        width="40"
                                        height="40"
                                        gravity="face"
                                        crop="fill"
                                        radius="max"
                                        loading="lazy"
                                        style={{ display: "inline-block", marginRight: "1em",verticalAlign:"sub" }}
                                    >
                                        <Placeholder type="vectorize" />
                                    </Image>
                                </Hidden>
                                Projects</p>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{ minHeight: "20vh" }}>
                            {!this.props.params ? (
                               <ProjectGrid />    
                            ): (
                                <Grid container justify="center" alignItems="flex-start" className="project-grid-outer-container">
                                {
                                    this.state.projectDetails.map((project, i) =>
                                    (<Grid item key={i} xs={11} sm={11} className="project-grid-project-container">
                                        <Grid item xs={12} className="project-grid-img-container">
                                            <Link to={`/project/${project.project_id}`}>
                                                <Image
                                                    cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                    public_id={project.project_img_url1}
                                                    height="400"
                                                    crop="fill"
                                                    loading="lazy"
                                                    className="project-grid-project-img"
                                                >
                                                    <Placeholder type="vectorize" />
                                                </Image>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} className="project-grid-description-container">
                                            <p className="project-grid-description project-grid-title"><b>{project.project_title}</b></p>
                                            <p className="project-grid-description">{project.project_summary}</p>
                                            {this.props.edit ?
                                                (<React.Fragment>
                                                    <Button variant="outlined" name={project.project_id} color="primary" size="small" style={{ margin: "0 0.5em" }} onClick={this.handleDeleteOpen}> Delete </Button>

                                                    <Link to={`/project/${project.project_id}`} style={{ textDecoration: 'none' }}>
                                                        <Button variant="contained" color="primary" size="small" disableElevation style={{ margin: "0 0.5em" }}> Edit Project </Button>
                                                    </Link>
                                                </React.Fragment>)
                                                : ""}
                                        </Grid>
                                        <Grid item xs={12} className="project-grid-project-number-container">
                                            <p className="project-grid-project-number">{i + 1}</p>
                                        </Grid>
                                    </Grid>))
                                }
                                </Grid>
                            )
                        }
                            
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    <Grid container justify="flex-start" alignItems="flex-start" className="profile-view-personal-details-container">
                            
                        <Grid item xs={2} sm={2}>
                                <Grid item xs={12} className="profile-view-grid-item profile-view-icons-grid">
                                {this.props.userData.website_url ? (
                                    <Tooltip title="Website" placement="left">
                                        <a href={this.props.userData.website_url} rel="noreferrer" target="_blank">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/website_a50yj8"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                            />
                                        </a>
                                    </Tooltip>) : (
                                        <Tooltip title="Website N/A" placement="left">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/website_a50yj8"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                                style={{ filter: 'invert(80%)' }}
                                            />
                                        </Tooltip>
                                    )
                                }
                                {this.props.userData.github_url ? (
                                    <Tooltip title="Github" placement="left">
                                        <a href={this.props.userData.github_url} rel="noreferrer" target="_blank">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/github_f376vp"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                            />
                                        </a>
                                    </Tooltip>) : (
                                        <Tooltip title="Github N/A" placement="left">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/github_f376vp"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                                style={{ filter: 'invert(80%)' }}
                                            />
                                        </Tooltip>
                                    )}
                                {this.props.userData.linkedin_url ? (
                                    <Tooltip title="LinkedIn" placement="left">
                                        <a href={this.props.userData.linkedin_url} rel="noreferrer" target="_blank">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/linkedin_qnzbgx"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                            />
                                        </a>
                                    </Tooltip>) : (
                                        <Tooltip title="Linkedin N/A" placement="left">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/linkedin_qnzbgx"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                                style={{ filter: 'invert(80%)' }}
                                            />
                                        </Tooltip>
                                    )}
                                {this.props.userData.twitter_url ? (
                                    <Tooltip title="Twitter" placement="left">
                                        <a href={this.props.userData.twitter_url} rel="noreferrer" target="_blank">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/twitter_entntb"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                            />
                                        </a>
                                    </Tooltip>) : (
                                        <Tooltip title="Twitter N/A" placement="left">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/twitter_entntb"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                                style={{ filter: 'invert(80%)' }}
                                            />
                                        </Tooltip>
                                    )}
                                {this.props.userData.facebook_url ? (
                                    <Tooltip title="Facebook" placement="left">
                                        <a href={this.props.userData.facebook_url} rel="noreferrer" target="_blank">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/facebook2_ir3om6"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                            />
                                        </a>
                                    </Tooltip>) : (
                                        <Tooltip title="Facebook N/A" placement="left">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/facebook2_ir3om6"
                                                width="40"
                                                height="40"
                                                crop="scale"
                                                loading="lazy"
                                                className="profile-view-link-icons"
                                                style={{ filter: 'invert(80%)' }}
                                            />
                                        </Tooltip>
                                    )}
                                </Grid>
                        </Grid>
                        
                        <Grid item xs={10} sm={9} className="profile-view-profile-pic-outer-container">
                            <Grid item xs={4} sm={6} md={7} className="profile-view-grid-item profile-view-profile-pic-container">
                                <Image
                                    cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                    public_id={this.props.userData.user_img_url}
                                    width="160"
                                    height="160"
                                    gravity="face"
                                    crop="fill"
                                    radius="max"
                                    loading="lazy"
                                    className="profile-view-user-img"
                                >
                                    <Placeholder type="vectorize" />
                                </Image>
                            </Grid>  
                            
                            <Grid item xs={12} sm={12} md={12} className="profile-view-grid-item profile-view-name-container">
                                <p className="profile-view-full-name">{this.props.userData.full_name}</p>
                                {this.props.userData.job_title && this.props.userData.company ? 
                                    (<React.Fragment>
                                        <p className="profile-view-light-text">Currently</p>
                                        <p>
                                            <span className="profile-view-current">{this.props.userData.job_title}</span>
                                            <span className="profile-view-light-text-inline"> at </span>
                                            <span className="profile-view-current">{this.props.userData.company}</span>
                                        </p>
                                    </React.Fragment>):""}

                                {this.props.userData.location ? 
                                    (<React.Fragment>
                                        <p className="profile-view-current" style={{ marginBottom: "0" }}><RoomIcon fontSize="small" style={{ verticalAlign: "sub" }} />{this.props.userData.location}</p> 
                                    </React.Fragment>):""}
                                <br />
                                {this.props.userData.sameUser ? (
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
                                            
                                        <Button variant="outlined" size="small" onClick={this.handleOpenContact}>Contact</Button>
                                            {this.state.followSuccess ? <CheckIcon fontSize="small" color="primary" style={{margin: '0 0.5em', verticalAlign: 'sub'}} />:""}
                                    </React.Fragment>
                                    )}
                                {this.state.modalOpen ? (
                                    <div className="profile-view-contact-pop-up">
                                        <form onSubmit={this.submitContact}>
                                        <TextField label="Subject" name="email_subject" value={this.state.email_subject} onChange={this.handleChange} className="profile-view-textField" style={{ margin: "10px 0" }} required/>
                                        <TextField
                                            label="Your Message"
                                            multiline
                                            rows={10}
                                            name="email_message"
                                            onChange={this.handleChange}
                                            value={this.state.email_message}
                                            variant="outlined"
                                            className="profile-view-textField"
                                            style={{margin: '1em 0'}}
                                            required
                                            />
                                            <p style={{ fontFamily: 'Montserrat', fontSize: '0.8em', color: '#535353', textAlign: 'justify', textJustify: 'inter-word', margin: '0 2em' }}>
                                                Please note that your <u>name</u> and <u>email address</u> will be sent to the recipient together with your message.
                                                </p>
                                            <div style={{ display:'flex', flexDirection: 'row',justifyContent:'center', marginBottom:'1em',width:'100%' }}>
                                                <Button variant="outlined" onClick={ this.handleCloseContact } color="primary" size="small" style={{ margin: "1em 2em" }}>cancel</Button>
                                                {this.state.emailSuccess ? (
                                                    <Button variant="contained" disableElevation disabled color="primary" size="small" startIcon={<CheckIcon />} style={{ margin: "1em 2em", padding: "0 1em" }} >Sent</Button>
                                                ) : (
                                                    <Button variant="contained" disableElevation color="primary" size="small" type="submit" startIcon={<SendIcon />} style={{ margin: "1em 2em", padding: "0 1em" }}>send</Button>
                                                )}
                                                
                                            </div>
                                        </form>
                                    </div>
                                 ): ""}
                            </Grid>
                        </Grid>


                    </Grid>
                

                    <Grid container justify="center" alignContent="center" className="profile-view-summary-container">
                        <Grid container justify="center" className="profile-view-about-me-section">
                            {this.props.userData.summary && this.props.userData.summary !== " " ? (
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
                                        <Chip key={i} color="primary" size="small" variant="outlined" label={skill} style={{ margin: "0.25em" }} />
                                    ))}
                                </Grid>) :""}

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    userData: state.profile.userData,
})

const mapDispatchToProps = dispatch => {
    return {
        followProfile: (id, accessToken) => {
            dispatch(followProfileThunk(id, accessToken))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileView)
