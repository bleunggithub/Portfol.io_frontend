import React, { Component } from 'react';

//Components,pages
import { skillList } from '../Component/SkillSelector'

//UI, CSS
import './css/project.css';

import Grid from '@material-ui/core/grid';
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


//Autocomplete component
const icon = <CheckBoxOutlineBlankIcon fontSize="small" color="primary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" color="primary" />;


export default class ProjectEditDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project_title: "",
            project_summary: "",
            project_url: "",
            project_code_url: "",
            project_tags:"",
        }
    }

    //handle input field changes
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    sendToParent = () => {
        this.props.parentCallback(this.state, null)
    }

    handleTagsChange = (e, v) => {
        this.setState({ project_tags: v })
    }

    render() {
        return (
            <Grid className="project-view-description-container">
                <Grid item xs={12} md={12}>
                    {this.props.edit ?
                        (
                            <TextField label="Project Title" name="project_title" value={this.state.project_title} onChange={this.handleChange} onBlur={this.sendToParent} className="project-edit-textField" style={{ marginBottom: "1em" }} />
                        ): (
                            <TextField label="Project Title" name="project_title" value={this.state.project_title} onChange={this.handleChange} onBlur={this.sendToParent} className="project-edit-textField" style={{ marginBottom: "1em" }} required />
                        )
                    }

                    {this.props.edit ? 
                        (
                        <TextField
                            label="Project Summary (255 characters)"
                            multiline
                            rows={8}
                            name="project_summary"
                            onChange={this.handleChange}
                            onBlur={this.sendToParent}
                            value={this.state.project_summary}
                            variant="outlined"
                            inputProps={{ maxLength: 255 }}
                            style={{width:"95%",margin:'1em 0'}}
                        />
                        ): (
                            <TextField
                                label="Project Summary (255 characters)"
                                multiline
                                required
                                rows={8}
                                name="project_summary"
                                onChange={this.handleChange}
                                onBlur={this.sendToParent}
                                value={this.state.project_summary}
                                variant="outlined"
                                inputProps={{ maxLength: 255 }}
                                style={{width:"95%",margin:'1em 0'}}
                            />  
                    )
                    }
                    <TextField label="Project Url" name="project_url" value={this.state.project_url} onChange={this.handleChange} onBlur={this.sendToParent} className="project-edit-textField" style={{ marginBottom: "1em" }} />
                    <TextField label="Project Repo Url" name="project_code_url" value={this.state.project_code_url} onChange={this.handleChange} onBlur={this.sendToParent} className="project-edit-textField" style={{ marginBottom: "1em" }} />
                    <Autocomplete
                        multiple disableCloseOnSelect
                        className="project-edit-textField"
                        onChange={this.handleTagsChange}
                        onBlur={this.sendToParent}
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

                    
                </Grid>



            </Grid>
        )
    }
}
