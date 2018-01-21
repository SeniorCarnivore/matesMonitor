import 'babel-polyfill';
import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import Header from './Header';
import Filter from './Filter';
import MatesList from './MatesList';
import Details from './Details';
import AddMate from './AddMate';

import {
  createMateId,
  getMateDetails,
  createSkillsList,
  duplicate
} from './Helpers';

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
  flex-direction: column;
  width: 100%;
  height: calC(100vh);
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  height: calC(100vh);
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  box-sizing: border-box;
  background-color: #202020;
  box-shadow: 0 0px 10px 0 #000 inset;
`;

export default class App extends Component {
  state = {
    filter: null,
    excludedMates: [],
    mates: JSON.parse(localStorage.getItem('mates')) || null,
    skills: new Set(JSON.parse(localStorage.getItem('skills'))) || new Set()
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

    if (!skills || !skills.size) {
      this.updateAppData('skills', new Set(RESPONSED_SKILLS));
    }

    this.setState({
      mateDetails: idOfFirst
    });
  }

  updateAppData = (key, data) => {
    const stateData = duplicate(data);
    const storageData = key === 'skills' ? Array.from(stateData) : stateData;

    this.setState({
      [key]: stateData
    });

    localStorage.setItem(key, JSON.stringify(storageData));
  }

  setFilter = (skill, checked) => {
    const { filter = {} } = this.state;
    const filterToUpdate = duplicate(filter);
    filterToUpdate[skill] = checked;

    this.setState({
      filter: filterToUpdate
    });
  }

  addFilter = newSkill => {
    const {
      skills,
      mates
    } = this.state;

    const skillsToUpdate = duplicate(skills);
    const matesToUpdate = duplicate(mates);

    skillsToUpdate.add(newSkill);
    matesToUpdate.map(mate => mate.skills[newSkill] = false);

    this.updateAppData('skills', skillsToUpdate);
    this.updateAppData('mates', matesToUpdate);
  }

  setMateDetails = id => {
    this.setState({
      mateDetails: id
    });
  }

  determineMate = (id, accept) => {
    const {
      mates,
      excludedMates
    } = this.state;

    const matesToUpdate = duplicate(mates);
    const excludedMatesToUpdate = [ ...duplicate(excludedMates), id ];

    if (accept) {
      matesToUpdate.filter(mate => {
        if (mate.id === id) {
          mate.rating += 1;
        }

        return mate;
      });
  
      this.updateAppData('mates', matesToUpdate);
      this.dropFilter();

    } else {
      this.setState({
        excludedMates: excludedMatesToUpdate
      });
    }
  }

  deleteSkill = skill => {
    const {
      skills,
      mates
    } = this.state;

    const skillsToUpdate = duplicate(skills);
    const matesToUpdate = duplicate(mates);

    skillsToUpdate.delete(skill);

    matesToUpdate.map(mate => {
      delete mate.skills[skill];
      return mate;
    });

    this.updateAppData('skills', skillsToUpdate);
    this.updateAppData('mates', matesToUpdate);
  }

  toggleUserSkill = (skill, value, id) => {
    const { mates } = this.state;
    const matesToUpdate = duplicate(mates);

    matesToUpdate.map(mate => {
      if (mate.id === id) {
        mate.skills[skill] = value;
      }

      return mate;
    });

    this.updateAppData('mates', matesToUpdate);
  }

  addMate = mate => {
    const {
      mates,
      skills
    } = this.state;

    const matesToUpdate = duplicate(mates);
    const skillsToUpdate = duplicate(skills);
    const identifiers = matesToUpdate.map(mate => mate.id);
    const mateId = createMateId(identifiers);

    mate.skills = createSkillsList(skillsToUpdate);
    mate.rating = 0;
    mate.id = mateId;

    this.setState({
      mateDetails: mateId,
    });

    this.updateAppData('mates', [ ...matesToUpdate, mate ]);
  }

  deleteMate = (id) => {
    const {
      mates,
      mateDetails,
      excludedMates
    } = this.state;

    const matesToUpdate = duplicate(mates);
    const excludedMatesToUpdate = duplicate(excludedMates);

    const existingMates = matesToUpdate.filter(mate => mate && mate.id !== id);
    const firstMateId = existingMates[0] && existingMates[0].id;
    const newDetails = mateDetails === id ? firstMateId : id;
    const actualExcluded = excludedMatesToUpdate.filter(existingId => existingId !== id);

    this.setState({
      mateDetails: newDetails,
      excludedMates: actualExcluded
    });

    this.updateAppData('mates', existingMates);
  }

  importJson = data => {
    const fields = Object.keys(data);

    fields.map(filed => {
      this.updateAppData(filed, JSON.parse(data[filed]));
      return filed;
    });
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

    const mateDetailsLayout = getMateDetails(duplicate(mates), mateDetails);

    return (
      <Container> 
        <Header
          callback={ this.dropFilter }
          importJson={ this.importJson }
        />

        <Body>
          <Sidebar>
            {
              mates &&
              <MatesList
                mates={ mates }
                filter={ filter && filter }
                mateDetails={ mateDetails }
                excludedMates={ excludedMates }
                determineMate={ this.determineMate }
                callback={ this.setMateDetails }
              />
            }

            <AddMate callback={ this.addMate }/>

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

          <Sidebar>
            {
              skills &&
              <Filter
                skills={ skills }
                filter={ filter }
                callbackSet={ this.setFilter }
                callbackAdd={ this.addFilter }
                deleteSkill={ this.deleteSkill }
              />
            }

          </Sidebar>
        </Body>

      </Container>
    );
  }
}
