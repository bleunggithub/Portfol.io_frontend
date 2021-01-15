import React, { Component } from 'react'

//Components, pages
import TopBar from '../Component/TopBarLoggedIn'
import ProjectGridSmall from '../Component/ProjectGridSmall'
import Search from '../Component/Search'

//UI, CSS
import Grid from '@material-ui/core/grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './css/discover.css';


const location = "discover"

export default class Discover extends Component {
        constructor(props) {
        super(props)
        this.state = {
            errorMessage: null,
            errorOpen: false,
            projectsToShow: [],
            searchOpen:false
        }
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

    handleError = (data, error) => {
        this.setState({
            error: error
        })
    }

    openSearchResults = () => {
        this.setState({
            searchOpen:true
        })
    }

    render() {
        return (
    <Grid container justify="center">
                <TopBar value={location} />
                <Grid container justify="center" className="discover-margin-top-container" />
                <Grid item xs={11} sm={10} style={{ margin: "5vh 0 3vh 0" }}>
                    {/* to add search bar */}
                    <Search parentCallback={ this.handleError } parentCallbackSearch={this.openSearchResults}/>
                </Grid>
                
                {this.state.searchOpen ? "" : (
                    <Grid item xs={12} sm={11}>
                        <ProjectGridSmall location="discover" parentCallback={this.handleError} />
                    </Grid>
                )}
   
                
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
