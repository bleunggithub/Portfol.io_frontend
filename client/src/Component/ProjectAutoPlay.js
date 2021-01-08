import React from 'react';
import axios from 'axios';

//swipe
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from './Pagination';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  root: {
    position: 'relative',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
      backgroundColor: '#FEA900',
      height:'80vh'
  },
  slide2: {
      backgroundColor: '#B3DC4A',
      height:'60vh'
  },
  slide3: {
      backgroundColor: '#6AC0FF',
      height:'80vh'
      
  },
};

class DemoAutoPlay extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };
    
        // fetchProjects = (accessToken) => {
    //     axios.post(`${process.env.REACT_APP_API_SERVER}/users/getOwnProjects/`, {
    //         accessToken
    //     }).then(res => {
    //         // console.log(res.data)
    //         this.setState({projectDetails: res.data.projects})
    //     })
    // } //! get project img

  render() {
    const { index } = this.state;

    return (
      <div style={styles.root}>
        <AutoPlaySwipeableViews animateHeight interval={6000} index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
        </AutoPlaySwipeableViews>
        <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} />
      </div>
    );
  }
}

export default DemoAutoPlay;