import React, { Component } from 'react';
import styled from 'styled-components';

import Filter from './Filter';
import MatesList from './MatesList';
import Details from './Details';

import mates from '../mates.json';
import skills from '../skills.json';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calC(100vh - 16px);
`;

const Sidebar = styled.div`
  width: 30%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #999;
`;

export default class App extends Component {
  // static propTypes = {
  //   mateDetails: number
  // }
  
  // static defaultProps = {
  //   mateDetails: 0
  // }

  state = {
    mateDetails: 1
  }

  componentWillMount() {
    const matesStorage = localStorage.getItem('mates');
    const skillsStorage = localStorage.getItem('skills');
    
    if (!matesStorage) {
      this.setState({
        mates: mates
      });
    }

    if (!skillsStorage) {
      this.setState({
        skills: skills
      });
    }
  }

  setFilter = (skill, checked) => {
    let filterStamp = this.state.filter || {};
    filterStamp[skill] = checked;

    this.setState({
      filter: filterStamp
    });
  }

  setMateDetails = (id) => {
    this.setState({
      mateDetails: id
    });
  }

  getMateDetails = (id) => {
    const {
      mates
    } = this.state;

    const mateDetails = mates.find(mate => mate.id === id);

    return mateDetails;
  }

  render() {
    const {
      skills,
      mates,
      filter,
      mateDetails
    } = this.state;

    return (
      <Container> 
        <Sidebar>

          <Filter
            skills={ skills }
            callback={ this.setFilter }
          />

          <MatesList
            mates={ mates }
            filter={ filter }
            callback={ this.setMateDetails }
          />

        </Sidebar>

        <Details
          data={ this.getMateDetails(mateDetails) }
        />
      </Container>
    );
  }
};
