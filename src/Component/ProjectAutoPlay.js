import React from 'react';
import axios from 'axios';

//swipe
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from './Pagination';

//images
import { Image, Placeholder } from 'cloudinary-react';

//UI/css
import './css/project.css'
import Grid from '@material-ui/core/grid';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  root: {
    position: 'relative',
  },
  slide: {
    padding: 0,
    minheight: '80vh',
    color: '#f5f5f5',
  },
};

class ProjectAutoPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        projectImgs:[],
        index: 0,
    };
    const accessToken = localStorage.getItem('token')
    const projectId = this.props.projectId
    this.fetchProjects(projectId, accessToken)
  }
  
  fetchProjects = (projectId, accessToken) => {
      axios.post(`${process.env.REACT_APP_API_SERVER}/projects/getProjectData/${projectId}`, {
          accessToken
      }).then(res => {
        // console.log(res.data.project_imgs)
        let projectsArray = [];

        for (let i = 0; i < res.data.project_imgs.length; i++){
          if (res.data.project_imgs[i]) {
            projectsArray.push(res.data.project_imgs[i])
          }
        }

        this.setState({ projectImgs: projectsArray })
      })
  } 


  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };
    

  render() {
    const { index } = this.state;

    return (
      <Grid  style={styles.root}>
        <AutoPlaySwipeableViews enableMouseEvents interval={6000} index={index} onChangeIndex={this.handleChangeIndex}>

                {this.state.projectImgs.map((img, i) => (
                  <div key={i} style={Object.assign({}, styles.slide)}>
                      <Image
                          cloudName={process.env.REACT_APP_CLOUDINARY_ACC_NAME}
                          public_id={img}
                          height="600"
                          crop="fill"
                          loading="lazy"
                          className="project-auto-play-project-img"
                      >
                          <Placeholder type="vectorize" />
                      </Image>
                  </div>
                ))}

        </AutoPlaySwipeableViews>
        <Pagination dots={this.state.projectImgs.length} index={index} onChangeIndex={this.handleChangeIndex} />
      </Grid>
    );
  }
}

export default ProjectAutoPlay;