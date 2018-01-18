import React from 'react';
import { object, func } from 'prop-types';
import styled from 'styled-components';

import AddItem from './AddItem';
import {
  Checkbox,
  Label,
  SkillsList
} from './UI';

import { handleCheckboxChange } from './Helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SkillsListScroll = styled(SkillsList)`
  flex-direction: column;
  width: calc(100% - 20px);
  height: 100%;
  margin: 20px 0 10px 20px;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  direction: rtl;

  input:checked + label:after {
    transform: translateX(-4px);
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #666;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cacaca;
  }
`;

const Skill = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  min-height: 30px;
  line-height: 30px;
  user-select: none;
  margin-bottom: 10px;
  direction: ltr;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

const Delete = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  margin-left: auto;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  font-size: 17px;
  opacity: 0;
  transition: all .2s;
  outline: none;

  &:hover {
    &:before {
      transform: rotate(90deg);
    }
  }

  &:before {
    content: '❌';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    line-height: 30px;
    pointer-events: none;
    transition: all .2s;
    transform: rotate(0deg);
  }
`;

const rederFilter = (skills, filter, callbackSet, deleteSkill) => (

  skills.map((skill, ind) => {
    const isChecked = filter && filter[skill] || false;

    return (
      <Skill key={ skill }>
        <Checkbox
          id={ `skill${ ind }` }
          type='checkbox'
          value={ skill }
          checked={ isChecked }
          onChange={ e => handleCheckboxChange(e, callbackSet) }
        />

        <Label htmlFor={ `skill${ ind }` } >{ skill }</Label>

        <Delete
          onClick={ () => deleteSkill(skill) }
        />
      </Skill>
    );
  })
);

const Filter = ({ skills, filter, callbackSet, callbackAdd, deleteSkill }) => (
  <Container>
    <SkillsListScroll>
      { rederFilter(Array.from(skills), filter, callbackSet, deleteSkill) }
    </SkillsListScroll>

    <AddItem
      callback={ callbackAdd }
    />

  </Container>
);

Filter.propTypes = {
  skills: object,
  filter: object,
  callbackSet: func,
  callbackAdd: func,
  deleteSkill: func
};

export default Filter;
