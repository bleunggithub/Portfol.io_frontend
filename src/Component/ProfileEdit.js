import React, { Component } from 'react';
import axios from 'axios';

//redux
import { connect } from 'react-redux';
import { updateProfileThunk } from '../actions/profileActions'

//images
import { Image, Placeholder } from 'cloudinary-react';

//UI, CSS
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';



import './css/profile.css';

//Components
import ProjectGrid from './ProjectGrid';
import { skillList } from './SkillSelector'

//Autocomplete component
const icon = <CheckBoxOutlineBlankIcon fontSize="small" color="primary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" color="primary" />;

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_img_url: "",
            profilePicFileName:"",
            email: "",
            password: "",
            full_name: "",
            job_title: "",
            company: "",
            location:"",
            countriesList: [],
            website_url: "",
            github_url: "",
            linkedin_url: "",
            twitter_url: "",
            facebook_url: "",
            skills: "",
            summary: this.props.userData.summary,
            isLoading: false,
            updateSuccessPic: false,
            updateSuccessDetails: false,
            updateSuccessSummary: false,
        }
        this.getCountries();
    }
    
    //get list of countries
    getCountries = () => {
        axios.get("https://restcountries.eu/rest/v2/all").then(res => {
            // console.log(res.data)
            this.setState({countriesList: res.data})
        })
    }

    //handle input field changes
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    handleLocationChange = (e, v) => {
        this.setState({ location: v.name })
    }

    handleSkillsChange = (e, v) => {
        this.setState({ skills: v })
    }

    //upload profile picture
    uploadProfilePic = (e) => {
        if (e.target.files.length > 0) {
            this.setState({ profilePicFileName: e.target.files[0].name })
            this.uploadProfilePicCloud(e);
        }
    }

    //cloudinary api call
    uploadProfilePicCloud = (e) => {
        const formdata = new FormData()
        formdata.append("file", e.target.files[0])
        formdata.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

        this.setState({ isLoading: true })
        
        axios.post(`https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ACC_NAME}/image/upload`, formdata, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin',
            'Access-Control-Allow-Credentials':true
          }
        }).then(data => { 
            // console.log(data)

            if (data.status !== 200) {
                this.props.handleErrorCB(null, "An error has occurred, please try again.")

            } else {
                this.setState({
                    profilePicFileName: "Click upload to save changes.",
                    user_img_url: data.data.public_id
                })
            }

            this.setState({ isLoading: false })
        }).catch(err => {
            console.log(err)
            this.props.handleErrorCB(null, "An error has occurred, please try again.")
            this.setState({ isLoading: false })
        })
    }

    //update backend
    changeProfilePicture = (e) => {
        e.preventDefault();

        const userData = {
            user_img_url: this.state.user_img_url,
        }

        this.props.updateProfile(userData);
        this.setState({
                user_img_url: "",
                profilePicFileName: "",
                updateSuccessPic:true
        })

    }

    changePersonalDetails = (e) => {
        e.preventDefault();
        
        const userData = {
            email: this.state.email,
            password: this.state.password,
            full_name: this.state.full_name,
            job_title: this.state.job_title,
            company: this.state.company,
            location: this.state.location,
            website_url: this.state.website_url,
            github_url: this.state.github_url,
            linkedin_url: this.state.linkedin_url,
            twitter_url: this.state.twitter_url,
            facebook_url: this.state.facebook_url,
            skills: this.state.skills,
        }
        
        this.props.updateProfile(userData);
        this.setState({
            email: "",
            password: "",
            full_name: "",
            job_title: "",
            company: "",
            location:"",
            countriesList: [],
            website_url: "",
            github_url: "",
            linkedin_url: "",
            twitter_url: "",
            facebook_url: "",
            skills: "",
            updateSuccessDetails:true
        })
        setTimeout(() => {
            this.props.redirectCB()
        }, 1000)
    }
    


    changeSummary = (e) => {
        e.preventDefault();
        
        const userData = {
            summary: this.state.summary,
        }
        
        this.props.updateProfile(userData);
        this.setState({
            summary: "",
            updateSuccessSummary:true
        })
        setTimeout(() => {
            this.props.redirectCB()
        }, 1000)
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
                            Projects
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{minHeight:"20vh"}}>
                            <ProjectGrid edit={true} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    <Grid container justify="center" alignItems="flex-start" className="profile-edit-personal-details-container">
                        <Grid item sm={11}>
                                <Grid container>
                                    <Grid item xs={4} sm={4} md={5} className="profile-view-grid-item profile-view-profile-pic-container">
                                        <Image
                                            cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                                            public_id={this.props.userData.user_img_url}
                                            width="160"
                                            height="160"
                                            gravity="face"
                                            crop="fill"
                                            radius="max"
                                        loading="lazy"
                                        className="profile-edit-user-img"
                                        >
                                          <Placeholder type="vectorize" />
                                        </Image>

                                    
                                    </Grid>  
                                    
                                    <Grid item xs={8} sm={8} md={7}>
                                        <form onSubmit={this.changeProfilePicture}>
                                            <input accept="image/*" style={{ display: 'none' }} type="file" id="contained-button-file" onChange={this.uploadProfilePic} />
                                            <Grid className="profile-edit-profile-pic-buttons-container">
                                                <label htmlFor="contained-button-file">
                                                    <Button variant="outlined" color="primary" size="small" component="span" style={{ margin: "0 0.5em" }} > Select  </Button>
                                                </label>
                                                {this.state.user_img_url === "" ||  this.state.isLoading ? 
                                                    <Button variant="contained" type="submit" color="primary" size="small" disabled> upload </Button> :
                                                    <Button variant="contained"  type="submit" color="primary" size="small"  > upload </Button>
                                                }
                                            </Grid>
                                            <Grid className="profile-edit-profile-pic-buttons-container">
                                                <p className="profile-edit-profile-pic-upload-filename">{this.state.profilePicFileName} </p>
                                            {this.state.isLoading ? (<CircularProgress color="primary" size="1em" />) : ""}
                                            {this.state.updateSuccessPic ? (<CheckIcon color="primary" size="1em" />) : ""}
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                            
                            <Grid container className="profile-view-grid-item profile-edit-name-container">
                                <form onSubmit={this.changePersonalDetails}>

                                {this.props.userData.facebookUser || this.props.userData.googleUser ? (
                                    <p className="profile-edit-text">* Email and password cannot be changed since you signed up with {this.props.userData.googleUser ? "Google." : "Facebook."}</p>
                                ) : (
                                    <React.Fragment>
                                        <TextField label="Update Email" name="email" value={this.state.email} placeholder={this.props.userData.email} onChange={this.handleChange} className="profile-edit-textField" style={{ marginBottom: "10px" }} />
                                        <TextField label="Update Password" name="password" type="password" value={this.state.password} onChange={this.handleChange} className="profile-edit-textField" style={{ marginBottom: "10px" }} />
                                    </React.Fragment>
                                    )
                                }
                                <TextField label="Update Name" name="full_name" value={this.state.full_name} placeholder={this.props.userData.full_name} onChange={this.handleChange} className="profile-edit-textField" style={{ margin: "10px 0" }}/>
                                <TextField label="Update Job Title" name="job_title" value={this.state.job_title} placeholder={this.props.userData.job_title} onChange={this.handleChange} className="profile-edit-textField"  style={{ marginBottom: "10px" }}/>
                                <TextField label="Update Company" name="company" value={this.state.company} placeholder={this.props.userData.company} onChange={this.handleChange} className="profile-edit-textField"  style={{ marginBottom: "10px" }}/>
                                <Autocomplete
                                    className="profile-edit-textField"
                                    onChange={this.handleLocationChange}
                                    name="location"
                                    limitTags={-1}
                                    size="small"
                                    style={{marginBottom: "2em"}}
                                    options={this.state.countriesList}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Location" placeholder="Location" />
                                    )}
                                />
                                    
                                <TextField label="Update Website" name="website_url" value={this.state.website_url} placeholder={this.props.userData.website_url} onChange={this.handleChange} className="profile-edit-textField"  style={{ marginBottom: "10px" }}/>
                                <TextField label="Update Github" name="github_url" value={this.state.github_url} placeholder={this.props.userData.github_url} onChange={this.handleChange} className="profile-edit-textField"  style={{ marginBottom: "10px" }}/>
                                <TextField label="Update LinkedIn" name="linkedin_url" value={this.state.linkedin_url} placeholder={this.props.userData.linkedin_url} onChange={this.handleChange} className="profile-edit-textField"  style={{ marginBottom: "10px" }}/>
                                <TextField label="Update Twitter" name="twitter_url" value={this.state.twitter_url} placeholder={this.props.userData.twitter_url} onChange={this.handleChange} className="profile-edit-textField"  style={{ marginBottom: "10px" }}/>
                                <TextField label="Update Facebook" name="facebook_url" value={this.state.facebook_url} placeholder={this.props.userData.facebook_url} onChange={this.handleChange} className="profile-edit-textField"  style={{ marginBottom: "2em" }}/>
                                <Autocomplete
                                    multiple disableCloseOnSelect
                                    className="profile-edit-textField"
                                    onChange={this.handleSkillsChange}
                                    name="skills"
                                    limitTags={2}
                                    size="small"
                                    options={skillList}
                                    getOptionLabel={(option) => option.skill}
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.skill}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Your Skills" placeholder="Your Skills" />
                                    )}
                                />
                                    
                                    <Button variant="contained" color="primary" size="small" type="submit" style={{ margin: "1.5em 1em" }}>save</Button>
                                            {this.state.updateSuccessDetails ? (<CheckIcon color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}} />) : ""}
                                    
                                </form>
                            </Grid>
                            
                        </Grid>

                    </Grid>
                

                    <Grid container justify="flex-start" alignContent="center" className="profile-edit-summary-container">
                        <Grid item xs={12} sm={12} md={12}  >
                            <p className="profile-edit-light-text">About Me </p>
                        </Grid>
                            <Grid item xs={10} sm={12} md={12} style={{marginBottom: '10vh'}}>
                                <form onSubmit={this.changeSummary}>
                                    <TextField
                                        label="Update Summary (500 characters)"
                                        multiline
                                        rows={10}
                                        name="summary"
                                        onChange={this.handleChange}
                                        value={this.state.summary}
                                        placeholder={this.props.userData.summary}
                                        variant="outlined"
                                        inputProps={{ maxLength: 500 }}
                                        style={{width:"95%"}}
                                    />
                                <Button variant="contained" color="primary" size="small" type="submit" style={{ margin: "1em" }}>save</Button>
                                            {this.state.updateSuccessSummary ? (<CheckIcon color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}} />) : ""}
                                
                                </form>
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
        updateProfile: (userData) => {
            dispatch(updateProfileThunk(userData))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileEdit);




