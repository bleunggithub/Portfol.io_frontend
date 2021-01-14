import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState("Following")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (event) => {
    setSelected(event.target.textContent)
    props.parentCallback(event.target.textContent)
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <MenuItem onClick={handleSelect}>Following</MenuItem>
        <MenuItem onClick={handleSelect}>Liked</MenuItem>
        <MenuItem onClick={handleSelect}>All</MenuItem>
      </Menu>
    </div>
  );
}
