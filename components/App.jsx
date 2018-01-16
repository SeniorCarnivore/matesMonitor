import 'babel-polyfill';
import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import Filter from './Filter';
import MatesList from './MatesList';
import Details from './Details';
import AddMate from './AddMate';

import {
  createMateId,
  getMateDetails,
  createSkillsList
} from './Helpers';

import {
  DropFilter,
  DropApp
} from './TestControls';

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
  width: 35%;
  box-sizing: border-box;
  background-color: #202020;
  box-shadow: 0 0px 10px 0 #000 inset;
`;

export default class App extends Component {
  state = {
    excludedMates: [],
    mates: JSON.parse(localStorage.getItem('mates')) || null,
    skills: JSON.parse(localStorage.getItem('skills')) || []
  };

  componentWillMount() {
    const {
      mates,
      skills
    } = this.state;

    const idOfFirst = mates && mates[0] ? mates[0].id : 0;

    if (!mates || !mates.length) {
      this.updateAppData('mates', RESPONSED_MATES);
    }

    if (!skills || !skills.length) {
      this.updateAppData('skills', RESPONSED_SKILLS);
    }

    this.setState({
      mateDetails: idOfFirst
    });
  }

  updateAppData = (key, data) => {
    this.setState({
      [key]: data
    });

    localStorage.setItem(key, JSON.stringify(data));
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
      skills,
      mates
    } = this.state;

    if (skills.indexOf(newSkill) < 0) {
      skills.push(newSkill);
      
      mates.map(mate => {
        mate.skills[newSkill] = false;
      });

      this.updateAppData('mates', mates);
      this.updateAppData('skills', skills);
    }
  }

  setMateDetails = (id) => {
    this.setState({
      mateDetails: id
    });
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
  
      this.updateAppData('mates', updatedMates);
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
    const {
      skills,
      mates
    } = this.state;

    const newSkills = skills.filter(
      oldSkill => oldSkill !== skill
    );

    const newMates = mates.map(mate => {
      delete mate.skills[skill];
      return mate;
    });

    this.updateAppData('mates', newMates);
    this.updateAppData('skills', newSkills);
  }

  toggleUserSkill = (skill, value, id) => {
    const { mates } = this.state;

    const downGraded = mates.map(mate => {
      if (mate.id === id) {
        mate.skills[skill] = value;
      }

      return mate;
    });

    this.updateAppData('mates', downGraded);
  }

  addMate = (mate) => {
    const {
      mates,
      skills
    } = this.state;

    let oldTeam = mates;
    const identifiers = mates.map(mate => mate.id);
    const mateId = createMateId(identifiers);

    mate.skills = createSkillsList(skills);
    mate.rating = 0;
    mate.id = mateId;

    oldTeam.push(mate);

    this.setState({
      mateDetails: mateId,
    });

    this.updateAppData('mates', oldTeam);
  }

  deleteMate = (id) => {
    const {
      mates,
      mateDetails,
      excludedMates
    } = this.state;

    const allMates = mates;
    const existingMates = allMates.filter(mate => mate && mate.id !== id);
    const firstMateId = existingMates[0] && existingMates[0].id;
    const newDetails = mateDetails === id ? firstMateId : id;
    const actualExcluded = excludedMates.filter(existingId => existingId !== id);

    this.setState({
      mateDetails: newDetails,
      excludedMates: actualExcluded
    });

    this.updateAppData('mates', existingMates);
  }

  dropFilter = () => {
    this.setState({
      filter: null,
      excludedMates: []
    });
  }

  render() {
    const {
      skills,
      mates,
      filter,
      mateDetails,
      excludedMates
    } = this.state;

    const mateDetailsLayout = getMateDetails(mates, mateDetails);

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

          <AddMate callback={ this.addMate }/>
          
          <DropFilter callback={ this.dropFilter }/>

        </Sidebar>

        {
          mates &&
          <Details
            data={ mateDetailsLayout }
            callback={ this.addFilter }
            toggleUserSkill={ this.toggleUserSkill }
            deleteMate={ this.deleteMate }
          />
        }

        <DropApp/>
      </Container>
    );
  }
}
