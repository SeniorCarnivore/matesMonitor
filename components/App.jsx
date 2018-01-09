import React, { Component } from 'react';
import styled from 'styled-components';

import Filter from './Filter';
import MatesList from './MatesList';
import Details from './Details';

import RESPONSED_MATES from '../mates.json';
import RESPONSED_SKILLS from '../skills.json';

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
  state = {
    mateDetails: 1
  }

  componentWillMount() {
    const matesStorage = localStorage.getItem('mates');
    const skillsStorage = localStorage.getItem('skills');
    
    if (!matesStorage) {
      localStorage.setItem('mates', JSON.stringify(RESPONSED_MATES));
    }

    if (!skillsStorage) {
      localStorage.setItem('skills', JSON.stringify(RESPONSED_SKILLS));
    }

    this.setState({
      mates: JSON.parse(matesStorage)
    });

    this.setState({
      skills: JSON.parse(skillsStorage)
    });
  }

  setFilter = (skill, checked) => {
    let filterStamp = this.state.filter || {};
    filterStamp[skill] = checked;

    this.setState({
      filter: filterStamp
    });
  }

  addFilter = (newSkill) => {
    const {
      skills
    } = this.state;

    if (skills.indexOf(newSkill) < 0) {
      skills.push(newSkill);

      this.setState({
        skills: skills
      });

      localStorage.setItem('skills', JSON.stringify(skills));
    }
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
            callbackSet={ this.setFilter }
            callbackAdd={ this.addFilter }
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
