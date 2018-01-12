import 'babel-polyfill';
import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { number, array } from 'prop-types';

import Filter from './Filter';
import MatesList from './MatesList';
import Details from './Details';
import { DropFilter, DropApp } from './TestControls';

import RESPONSED_MATES from '../mates.json';
import RESPONSED_SKILLS from '../skills.json';

injectGlobal`
  body {
    margin: 0;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: #e2e2e2;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calC(100vh);
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding-top: 20px;
  box-sizing: border-box;
  background-color: #202020;
  box-shadow: 0 0px 10px 0 #000 inset;
`;

export default class App extends Component {
  state = {
    excludedMates: [],
    mates: JSON.parse(localStorage.getItem('mates')) || null,
    skills: JSON.parse(localStorage.getItem('skills')) || []
  }

  componentWillMount() {
    const {
      mates,
      skills
    } = this.state;

    if (!mates || !mates.length) {
      localStorage.setItem('mates', JSON.stringify(RESPONSED_MATES));

      this.setState({
        mates: RESPONSED_MATES
      });
    }

    if (!skills || !skills.length) {
      localStorage.setItem('skills', JSON.stringify(RESPONSED_SKILLS));

      this.setState({
        skills: RESPONSED_SKILLS
      });
    }

    const idOfFirst = mates[0] ? mates[0].id : 0;

    this.setState({
      mateDetails: idOfFirst
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

    let details = `
                  The castle is ransacked,
                  your court disperses and you're
                  left with pigeons to rule over.
                `;
    if (mateDetails !== 0 && mates.length !== 0) {
      details = mates.find(mate => mate.id === mateDetails);
    }

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

  render() {
    const {
      skills,
      mates,
      filter,
      mateDetails,
      excludedMates
    } = this.state;

    const mateDetailsLayout = this.getMateDetails();

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
              mateDetails={ mateDetails }
              excludedMates={ excludedMates }
              determineMate={ this.determineMate }
              callback={ this.setMateDetails }
            />
          }
          
          <DropFilter callback={ this.dropFilter }/>

        </Sidebar>

        {
          mates &&
          <Details
            data={ mateDetailsLayout }
            callback={ this.addSkill }
            deleteUserSkill={ this.deleteUserSkill }
            deleteMate={ this.deleteMate }
          />
        }

        <DropApp/>
      </Container>
    );
  }
};
