import React, {useEffect, useState} from 'react';
import axios from 'axios';

//UI, Components
import {useDropzone} from 'react-dropzone';
import Grid from '@material-ui/core/grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import PanToolIcon from '@material-ui/icons/PanTool';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const thumbsContainer = {
  display: 'flex',
  justifyContent:'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Previews(props) {
  const [files, setFiles] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [errorMessage, setError] = useState("");
  
  const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      maxFiles:6,
      onDrop: (acceptedFiles,fileRejections) => {
        //   console.log(acceptedFiles)
          if (acceptedFiles.length > 0) {
              setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
              })))
              setDisabled(false)
          } else {
              console.log(fileRejections)
          }
    }
  });
  
  const thumbs = files.map(file => (
    <Grid style={thumb} key={file.name}>
      <Grid style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={file.name}
        />
      </Grid>
    </Grid>
  ));
    
    const changeProjectImgs = async(e) => {
        e.preventDefault();
        setLoading(true);
        setDisabled(true);
        // console.log(files)

        const projectId = props.projectId;
        const imgUrls = [];

        for (let i = 0; i < files.length; i++){
            const formdata = new FormData()
            formdata.append("image", files[i])

            await fetch("https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/image/", {
                method: 'post',
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
                },
                body: formdata
            }).then(data => data.json()).then((data) => {
                // console.log(data)
                if (data.status !== 200) {
                    setError("An Error has occurred while updating images. Please try again.")
                    setOpen(true)
                    setTimeout(() => {
                    setError("")
                },6000)} else {
                    imgUrls.push(data.data.link)
                }
            })
        }
        
        // console.log(imgUrls)

        axios.post(`${process.env.REACT_APP_API_SERVER}/projects/editProjectImgs/${projectId}`, { 
            updateImgs: imgUrls 
        }).then(res => {
            // console.log(res)
            if (res.status === 200) {
                //clear input
                setFiles([])
                setLoading(false)
                setSuccess(true)
                
                setTimeout(() => {
                    setSuccess(false)
                    }, 3000)
            } else {
                // console.log(res)
                setError("An Error has occurred while updating images. Please try again.")
                setOpen(true)
                setTimeout(() => {
                    setError("")
                },6000)
            }
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
        setError("")
  };

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Grid container justify="center" alignItems="center">
        <form onSubmit={changeProjectImgs}  style={{textAlign: 'center', width:'100%'}}>
        <Grid item xs={12} {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <PanToolIcon fontSize="large" style={{margin:'0.5em'}}/> 
            <p>Drag & drop a <u>maximum of 6 images</u> here / click to select files</p>
        </Grid>
        <Grid item xs={12} style={thumbsContainer}>
            {thumbs}
        </Grid>
        <Grid item xs={12} style={{margin: '2em 0 2em 0'}}>
            {isDisabled ? 
                <Button type="submit" variant="contained" color="primary" size="small" disabled>Upload Images</Button> :
                <Button type="submit" variant="contained" color="primary" size="small">Upload Images</Button>
                  }
            <br />
            {isLoading ? <CircularProgress size="1.5em" style={{marginTop:'1em'}}/> : ""}
            {isSuccess ? <CheckIcon color="primary" size="1em" style={{marginTop:'1em'}}/> : ""}
        </Grid>
        </form>
        
        {/* //! handle error */}
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Grid>
  );
}

export default Previews;