import 'babel-polyfill';
import React, { Component } from 'react';
import styled from 'styled-components';
import { number, array } from 'prop-types';

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

const DropFilter = styled.button`
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
`;

const DropApp = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 4px 9px 1px 6px;
  font-size: 20px;
  text-align: center;
  border: 0;
  background-color: #ff9d9d;
  cursor: cell;
`;

export default class App extends Component {
  state = {
    mateDetails: 1,
    excludedMates: [],
    mates: JSON.parse(localStorage.getItem('mates')) || null,
    skills: JSON.parse(localStorage.getItem('skills')) || []
  }

  componentWillMount() {
    if (!this.state.mates || !this.state.mates.length) {
      localStorage.setItem('mates', JSON.stringify(RESPONSED_MATES));

      this.setState({
        mates: RESPONSED_MATES
      });
    }

    if (!this.state.skills || !this.state.skills.length) {
      localStorage.setItem('skills', JSON.stringify(RESPONSED_SKILLS));

      this.setState({
        skills: RESPONSED_SKILLS
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

  addSkill = (skill) => {
    const {
      mates,
      mateDetails,
      skills
    } = this.state;

    const updatedMates = mates.map(mate => {
      if (mate.id === mateDetails) {
        mate.skills.push(skill);
      }

      return mate;
    });

    this.setState({
      mates: updatedMates
    });

    localStorage.setItem('mates', JSON.stringify(updatedMates));

    this.addFilter(skill);
  }

  setMateDetails = (id) => {
    this.setState({
      mateDetails: id
    });
  }

  getMateDetails = () => {
    const {
      mates,
      mateDetails
    } = this.state;

    const details = mates.find(mate => mate.id === mateDetails);

    return details;
  }

  determineMate = (id, accept) => {
    const {
      mates,
      excludedMates
    } = this.state;

    let updatedMates = mates;

    if (accept) {
      updatedMates = mates.map(mate => {
        if (mate.id === id) {
          mate.rating += 1;
        }
  
        return mate;
      });
  
      this.setState({
        mates: updatedMates
      });
  
      localStorage.setItem('mates', JSON.stringify(updatedMates));

      this.dropFilter();

    } else {
  
      const newExclusion = excludedMates;
      newExclusion.push(id);

      this.setState({
        excludedMates: newExclusion
      });
    }
  }

  deleteSkill = (skill) => {
    const oldSkills = this.state.skills;
    const newSkills = oldSkills.filter(oldSkill => oldSkill !== skill);

    this.setState({
      skills: newSkills
    });

    localStorage.setItem('skills', JSON.stringify(newSkills));
  }

  deleteUserSkill = (skill, id) => {
    const {
      mates
    } = this.state;

    const downGraded = mates.map(mate => {
      if (mate.id === id) {
        console.log(mate)
        mate.skills = mate.skills.filter(oldSkill => oldSkill !== skill);
      }

      return mate;
    });

    this.setState({
      mates: downGraded
    });

    localStorage.setItem('mates', JSON.stringify(downGraded));
  }

  deleteMate = (id) => {
    const {
      mates,
      mateDetails,
      excludedMates
    } = this.state;

    const allMates = mates;
    const existingMates = allMates.filter(mate => mate.id !== id);
    const newDetails = mateDetails === id ? id + 1 : id;
    const actualExcluded = excludedMates.filter(existingId => existingId !== id);

    this.setState({
      mates: existingMates,
      mateDetails: newDetails,
      excludedMates: actualExcluded
    });
    
    localStorage.setItem('mates', JSON.stringify(existingMates));
  }

  dropFilter = () => {
    this.setState({
      filter: null,
      excludedMates: []
    })
  }

  dropApp = () => {
    localStorage.clear();
    document.location.reload();
  }

  render() {
    const {
      skills,
      mates,
      filter,
      mateDetails,
      excludedMates
    } = this.state;

    return (
      <Container> 

        <Sidebar>

          {
            skills &&
            <Filter
              skills={ skills }
              callbackSet={ this.setFilter }
              callbackAdd={ this.addFilter }
              deleteSkill={ this.deleteSkill }
            />
          }

          {
            mates &&
            <MatesList
              mates={ mates }
              filter={ filter }
              excludedMates={ excludedMates }
              determineMate={ this.determineMate }
              callback={ this.setMateDetails }
            />
          }
          
          <DropFilter onClick={ this.dropFilter }>💥 Drop Filter 💥</DropFilter>

        </Sidebar>

        {
          mates &&
          <Details
            data={ this.getMateDetails() }
            callback={ this.addSkill }
            deleteUserSkill={ this.deleteUserSkill }
            deleteMate={ this.deleteMate }
          />
        }

        <DropApp onClick={ this.dropApp }>💀</DropApp>
      </Container>
    );
  }
};
