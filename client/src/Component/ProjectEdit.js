import React, { Component } from 'react'
import axios from 'axios';

//Components, pages
import Dropzone from './Dropzone'
import { skillList } from './SkillSelector'

//UI, CSS
import './css/project.css';
import Grid from '@material-ui/core/grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//Autocomplete component
const icon = <CheckBoxOutlineBlankIcon fontSize="small" color="primary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" color="primary" />;


export default class ProjectEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectDetails: {},
            project_title: "",
            project_summary: "",
            project_url: "",
            project_code_url: "",
            project_tags:"",
            updateSuccess: false,
            isLoading: false,
            errorOpen: false,
            errorMessage:""
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

    //handle input field changes
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleTagsChange = (e, v) => {
        this.setState({ project_tags: v })
    }

    //snackbar close
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            errorOpen:false,
            errorMessage:""
        })
    };

    //send to backend
    changeProjectDetails = (e) => {
        e.preventDefault();

        this.setState({
            isLoading:true
        })
        const projectId = this.props.params;
        const projectDetails = {
            project_title: this.state.project_title,
            project_summary: this.state.project_summary,
            project_url: this.state.project_url,
            project_code_url: this.state.project_code_url,
            project_tags: this.state.project_tags,
        }
        
        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/editProjectDetails/${projectId}`, { 
            projectDetails
        }).then(res => {
            // console.log(res)
            if (res.status === 200) {
                //clear input
                this.setState({
                    project_title: "",
                    project_summary: "",
                    project_url: "",
                    project_code_url: "",
                    project_tags: "",
                    isLoading: false,
                    updateSuccess:true
                })
                setTimeout(() => {
                        this.setState({updateSuccess: false})
                    }, 3000)
            } else {
                // console.log(res)
                this.setState({
                    errorMessage: "An Error has occurred while updating project details. Please try again.",
                    errorOpen: true
                })
                setTimeout(() => {
                    this.setState({errorMessage:""})
                },6000)
            }
        })

    }
    
    render() {
        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={6} className="project-edit-dropzone-container">
                    <Dropzone projectId={ this.props.params}/>
                </Grid>

                <Grid item xs={12} md={5} lg={4}>
                    <Grid container justify="center" className="project-view-description-container">
                        <Grid item xs={12} md={12}>
                            <form onSubmit={this.changeProjectDetails}>
                                <TextField label="Update Project Title" name="project_title" value={this.state.project_title} placeholder={this.state.projectDetails.project_title} onChange={this.handleChange} className="project-edit-textField" style={{ marginBottom: "1em" }} />
                                <TextField
                                    label="Update Summary (255 characters)"
                                    multiline
                                    rows={8}
                                    name="project_summary"
                                    onChange={this.handleChange}
                                    value={this.state.project_summary}
                                    placeholder={this.state.projectDetails.project_summary}
                                    variant="outlined"
                                    inputProps={{ maxLength: 255 }}
                                    style={{width:"95%",margin:'1em 0'}}
                                />
                                <TextField label="Update Project Url" name="project_url" value={this.state.project_url} placeholder={this.state.projectDetails.project_url} onChange={this.handleChange} className="project-edit-textField" style={{ marginBottom: "1em" }} />
                                <TextField label="Update Project Repo Url" name="project_code_url" value={this.state.project_code_url} placeholder={this.state.projectDetails.project_code_url} onChange={this.handleChange} className="project-edit-textField" style={{ marginBottom: "1em" }} />
                                <Autocomplete
                                    multiple disableCloseOnSelect
                                    className="project-edit-textField"
                                    onChange={this.handleTagsChange}
                                    name="project_tags"
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
                                        <TextField {...params} label="Tags" placeholder="Tags" />
                                    )}
                                />
                                <Button variant="contained" color="primary" size="small" type="submit" style={{ margin: "2em 1em" }}>save</Button>
                                {this.state.isLoading ? (<CircularProgress color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}}/>) : ""}
                                {this.state.updateSuccess ? (<CheckIcon color="primary" size="1em"  style={{margin: '0 0.5em', verticalAlign: 'sub'}} />) : ""}
                                
                            </form>
                        </Grid>

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.errorOpen}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message={this.state.errorMessage}
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                    <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }
                        />

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
