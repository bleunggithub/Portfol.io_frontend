import React, { Component } from 'react'

//UI, CSS
import Grid from '@material-ui/core/grid';
import './css/submenu.css';


export default class Discover extends Component {

    render() {
        return (
                <Grid className="submenu-div">
                    <span className="submenu-link" onClick={this.props.handleItem1}>&nbsp;{ this.props.item1 }</span> &nbsp; • &nbsp;
                    <span className="submenu-link" onClick={this.props.handleItem2}> { this.props.item2 }</span>
                </Grid>

        )
    }
}
