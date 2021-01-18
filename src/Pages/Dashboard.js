import React, { Component } from 'react'


//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import ListMenu from '../Component/ListMenu'
import ProjectGridSmall from '../Component/ProjectGridSmall'


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/dashboard.css';

const location = "forYou"

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            errorOpen: false,
            viewing: "Following",
            projectsToShow:[]
        }
    }

    changeViewingContent = (data) => {
        this.setState({
            viewing: data
        })
    }

    //snackbar close
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            errorOpen:false,
            errorMessage:null
        })
    };


    handleError= (data, error) => {
        this.setState({
            errorMessage: error,
            errorOpen:true
        })
    }




    render() {
        return (
            <Grid container justify="center">
                <TopBar value={location} />
                <Grid container justify="center" className="dashboard-margin-top-container" />
                <Grid item xs={11} sm={10} style={{ margin: "5vh 0 3vh 0" }}>
                    <ListMenu style={{ width: '20vw' }} parentCallback={this.changeViewingContent} />

                </Grid>
                {this.state.viewing === "Following" ? (
                    // following
                    <Grid item xs={12} sm={11}>
                        <ProjectGridSmall location="dashboard"  viewing={this.state.viewing} handleErrorCB={this.handleError} />
                    </Grid>
                ): ""}
                {this.state.viewing === "Liked" ? (
                    // following
                    <Grid item xs={12} sm={10}>
                        <ProjectGridSmall location="dashboard" viewing={this.state.viewing} handleErrorCB={this.handleError} />
                    </Grid>
                ) : ""}

                {/* handle errors */}
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
        )
    }
}

export default Dashboard;
