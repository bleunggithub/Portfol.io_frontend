import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


//Components, pages
import ProjectAutoPlay from '../Component/ProjectAutoPlay'

//images
import { Image} from 'cloudinary-react';

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/project.css';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton } from 'react-share';

import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails: {},
        }
        const accessToken = localStorage.getItem('token')
        const projectId = this.props.params
        this.fetchProjects(projectId, accessToken)
    }

    fetchProjects = (projectId, accessToken) => {
        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/getProjectData/${projectId}`, {
            accessToken
        }).then(res => {
            // console.log(res.data)
            this.setState({
                projectDetails: res.data,
            })
        })
    } 

    handleLike = () => {
        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/likeProject/${this.props.params}}`, {
            accessToken: localStorage.getItem('token')
        }).then(res => {
            // console.log(res.data)
            this.setState({
                projectDetails:{...this.state.projectDetails, ...res.data}
            })
        })
    }

    render() {
            const shareUrl = `${process.env.REACT_APP_DOMAIN}/project/${this.props.params}`; 
            const title = this.state.projectDetails.project_title;
            
        return (
            <React.Fragment>
                <Grid item xs={12} lg={7} className="project-view-photo-container">
                    <ProjectAutoPlay className="project-view-autoplay" projectId={ this.props.params } />
                </Grid>

                <Grid item xs={12} lg={3}>
                    <Grid container justify="center" className="project-view-description-container">
                        <Grid item xs={12} sm={10}>
                            <h3 className="project-view-project-title">{this.state.projectDetails.project_title}
                                    {this.state.projectDetails.liked ? 
                                    (<IconButton aria-label="like" component="span" size="small" style={{ marginLeft: '1em', marginBottom: '4px'}} onClick={this.handleLike}>
                                        <Tooltip title="Like" placement="bottom-start">
                                            <FavoriteIcon style={{ color: '#ff0000' }} />
                                        </Tooltip>
                                    </IconButton>):
                                    (<IconButton aria-label="like" component="span" size="small" style={{ marginLeft: '1em', marginBottom: '4px'}} onClick={this.handleLike}>
                                        <Tooltip title="Like" placement="bottom-start">
                                            <FavoriteBorderIcon style={{ color: '#ff0000' }} />
                                        </Tooltip>
                                    </IconButton>)}
                            </h3>

                            <p className="project-view-light-text" style={{marginTop:'0'}}>by <Link to={`/profile/${this.state.projectDetails.users_id}`} className="project-view-profile-link">{this.state.projectDetails.users_full_name}</Link></p>
                            <p className="project-view-project-summary">{this.state.projectDetails.project_summary}</p>
                            
                            <Grid style={{ width: '100%', minHeight: '2em', margin:'3em 0 2em 0'}}>

                                {this.state.projectDetails.tagsArray ? (
                                    <Grid item xs={12}>
                                        <p className="project-view-light-text">Tags</p>
                                        {this.state.projectDetails.tagsArray.map((tag, i) => (
                                            <Chip key={i} color="primary" size="small" variant="outlined" label={tag} style={{ margin: "0.25em" }} />
                                        ))}
                                    </Grid>) :
                                ""}
                                
                            </Grid>
                            <Grid item xs={12}>

                                {this.state.projectDetails.project_url && this.state.projectDetails.project_url !== "#" ? (
                                    <Tooltip title="Website" placement="bottom-end">
                                        <a href={this.state.projectDetails.project_url} rel="noreferrer" target="_blank">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/website_a50yj8"
                                                width="36"
                                                height="36"
                                                crop="scale"
                                                loading="lazy"
                                                className="project-view-social-share-icons"
                                            />
                                        </a>
                                    </Tooltip>) : ""}
                                {this.state.projectDetails.project_code_url ? (
                                    <Tooltip title="Repo" placement="bottom-end">
                                        <a href={this.state.projectDetails.project_code_url} rel="noreferrer" target="_blank">
                                            <Image
                                                cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                                public_id="portfolio_capstone_project/icons/github_f376vp"
                                                width="36"
                                                height="36"
                                                crop="scale"
                                                loading="lazy"
                                                className="project-view-social-share-icons"
                                            />
                                        </a>
                                    </Tooltip>) : ""}
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={1}>

                            <FacebookShareButton url={shareUrl} quote={title} hashtag="#devPortfolio">
                                <Tooltip title="Share on Facebook" placement="bottom-start">
                                    <Image
                                        cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                        public_id="portfolio_capstone_project/icons/facebook2_ir3om6"
                                        width="36"
                                        height="36"
                                        crop="scale"
                                        loading="lazy"
                                        className="project-view-social-share-icons"
                                    />
                                </Tooltip>
                            </FacebookShareButton>
                            <LinkedinShareButton url={shareUrl} title={title} summary={this.state.projectDetails.project_summary} source={ "Portfol.io" }>
                                <Tooltip title="Share on LinkedIn" placement="bottom-start">
                                    <Image
                                        cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                        public_id="portfolio_capstone_project/icons/linkedin_qnzbgx"
                                        width="36"
                                        height="36"
                                        crop="scale"
                                        loading="lazy"
                                        className="project-view-social-share-icons"
                                    />
                                </Tooltip>
                            </LinkedinShareButton>
                            <TwitterShareButton url={shareUrl} title={title} hashtags={["devPortfolio","Porfolio"]}>
                                <Tooltip title="Share on Twitter" placement="bottom-start">
                                    <Image
                                        cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                        public_id="portfolio_capstone_project/icons/twitter_entntb"
                                        width="36"
                                        height="36"
                                        crop="scale"
                                        loading="lazy"
                                        className="project-view-social-share-icons"
                                    />
                                </Tooltip>
                            </TwitterShareButton>
                            <EmailShareButton url={shareUrl} subject={title} body="Hello, check out this project on Portfol.io! " separator=" >>>  ">
                                <Tooltip title="Share with Email" placement="bottom-start">
                                    <Image
                                        cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                        public_id="portfolio_capstone_project/icons/email_aqcedz"
                                        width="36"
                                        height="36"
                                        crop="scale"
                                        loading="lazy"
                                        className="project-view-social-share-icons"
                                    />
                                </Tooltip>
                            </EmailShareButton>
                        </Grid>

                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
