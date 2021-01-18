import React from 'react';
import { withRouter } from 'react-router-dom'

//UI/CSS
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState("Following")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettings = (event) => {
    setSelected(event.target.textContent)
    props.toSettings()
    setAnchorEl(null);
  }
  const handleLogOut = (event) => {
    setSelected(event.target.textContent)
    props.logOut()
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="subMenu-div">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {selected} <ExpandMoreIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSettings}>Your Profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(SimpleMenu);
