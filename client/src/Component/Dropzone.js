import React, { useEffect, useState } from 'react';
import axios from 'axios';

//UI, Components
import { useDropzone } from 'react-dropzone';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Grid from '@material-ui/core/grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import PanToolIcon from '@material-ui/icons/PanTool';


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
  width: '120px',
  height: '120px',
  objectFit: 'scale-down',
  margin:'0 1em'
};


function Previews(props) {
  const [files, setFiles] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errorMessage, setError] = useState("");
  
  //dropzone files, set files
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
            setSuccess(false)
          } else {
            // console.log(fileRejections)
            setError("Maximum of 6 images only.")
            props.parentCallback(null, errorMessage)
          }
    }
  });
  
  //map thumbnails(preview)
  const thumbs = files.map((file,index) => (
    <Draggable key={file.name} draggableId={file.name} index={index}>
      {(provided)=>(
        <Grid style={thumb} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        <Grid style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt={file.name}
          />
        </Grid>
        </Grid>
        )}
    </Draggable>
  ));

  //set files after drag end (rearrange order)
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem)

    setFiles(items)
    // console.log(files)
  }
  
  //upload img to imgur & send to parents
  const confirmImages = async() => {
    setLoading(true);
    setDisabled(true);
    // console.log(files)

    const imgUrls = [];

    //upload to imgur
    for (let i = 0; i < files.length; i++){
        const formdata = new FormData()
        formdata.append("image", files[i])

      await axios.post('https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/image/', formdata, {
        headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
          }
        }).then((data) => {
            // console.log(data)
          
          if (data.data.status === 200) {
            imgUrls.push(data.data.data.link)
          } else {
            props.parentCallback(null, "An Error has occurred while uploading images. Please try again.")
          }
        }).catch(err => {
          console.log(err)
          props.parentCallback(null, "An Error has occurred while uploading images. Please try again.")
          setLoading(false)
          setDisabled(false)
          setSuccess(false)
        })
        
      }
      // console.log(imgUrls)

    if (imgUrls.length === files.length) {
      props.parentCallback({ imgUrls: imgUrls }, null);
      setFiles([])
      setLoading(false);
      setSuccess(true)
    }
  }


  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);



  return (
    <Grid >
        <Grid container {...getRootProps({className: 'dropzone'})} direction="column">
          <input {...getInputProps()} />
          <Grid item xs={12} style={{textAlign:'center'}}>
            <PanToolIcon fontSize="large" style={{margin:'0.5em'}}/> <br/>
            <h3 style={{fontFamily:'Montserrat'}}>A picture is worth a thousand words</h3>
          </Grid>
          <Grid item xs={12}>
          <p>1. Drag & drop a <u>maximum of 6 images</u> here / click to select files<br />
            2. Drag the thumbnails to <u>rearrange</u> the order (the first one will be the cover image)<br />
            3. Click <u>CONFIRM</u> to save<br /></p>
          {props.edit ? (
            <h4>New uploads will replace all previous images</h4>
          ) : (
            <h4>If you choose not to upload an image, a random placeholder image will be added instead</h4>
            )
          }
          </Grid>
        </Grid>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="imgs" direction="horizontal">
            {(provided)=>(
            <Grid item xs={12} style={thumbsContainer} {...provided.droppableProps} ref={provided.innerRef}>
                {thumbs}
                {provided.placeholder}
            </Grid>
            )}
          </Droppable>
        </DragDropContext>

        <Grid item xs={12} style={{margin: '2em 0 2em 0', textAlign:'center'}}>
            {isDisabled ? 
                <Button variant="contained" color="primary" size="small" disabled >Confirm</Button> :
                <Button variant="contained" color="primary" size="small" onClick={confirmImages}>Confirm</Button>
                  }
            <br />
        {isLoading ? (
          <React.Fragment>
            <CircularProgress size="1.5em" style={{ marginTop: '1em' }} />
            <span style={{color:'#535353', verticalAlign: 'super', fontSize:'0.8em'}}> This may take a while...</span>
          </React.Fragment>
        ) : ""}

        {isSuccess ? (
          <React.Fragment>
            <CheckIcon color="primary" size="1em" style={{ marginTop: '1em' }} />
            <span style={{color:'#535353', verticalAlign: 'super', fontSize:'0.8em'}}> Images are ready to be saved</span>
          </React.Fragment>
        ) : ""}

        </Grid>

    </Grid>
  );
}

export default Previews;