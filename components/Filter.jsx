import React from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';

import AddItem from './AddItem';
import { Checkbox, Label, SkillsList } from './UI';

import { handleCheckboxChange } from './Helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 30vh;
  margin-bottom: 2.5vh;
`;

const SkillsListScroll = styled(SkillsList)`
  overflow-y: scroll;
  direction: rtl;

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

const StyledAddItem = styled(AddItem)`
  height: 5vh;
`;

const rederFilter = (skills, callbackSet, deleteSkill) => (
  skills.map((skill, id) => 
    <Skill key={ skill }>
      <Checkbox
        id={ `skill${ id }` }
        type='checkbox'
        value={ skill }
        onChange={ e => handleCheckboxChange(e, callbackSet) }
      />

      <Label htmlFor={ `skill${ id }` } >{ skill }</Label>

      <Delete
        onClick={ () => deleteSkill(skill) }
      />
    </Skill>
  )
);

const Filter = ({ skills, callbackSet, callbackAdd, deleteSkill }) => (
  <Container>
    <SkillsListScroll>
      { rederFilter(skills, callbackSet, deleteSkill) }
    </SkillsListScroll>

    <StyledAddItem
      callback={ callbackAdd }
    />

  </Container>
);

Filter.propTypes = {
  skills: array,
  callbackSet: func,
  callbackAdd: func,
  deleteSkill: func
};

export default Filter;
