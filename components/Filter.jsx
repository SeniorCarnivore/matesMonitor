import React from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';

import AddItem from './AddItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SkillsList = styled.ul`
  display: block;
  width: 100%;
  margin: 0 0 10px 0;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 18px;
  list-style: none;
`;

const Skill = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  line-height: 30px;
  user-select: none;
  margin-bottom: 10px;

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

const Checkbox = styled.input`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  cursor: pointer;
  opacity: 0;

  &:checked + label:after {
    opacity: 1;
    transform: translateX(6px);
  }
`;

const Label = styled.label`
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    left: -40px;
    top: 0;
    background-color: #e2e2e2;
    pointer-events: none;
  }

  &:after {
    content: '💃';
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    left: -40px;
    top: 0;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
    transition: all .2s;
    transform: translateX(12px);
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

const rederFilter = (skills, callbackSet, deleteSkill) => (
  skills.map((skill, id) => 
    <Skill key={ skill }>
      <Checkbox
        id={ `skill${ id }` }
        type='checkbox'
        value={ skill }
        onChange={ e => handleChange(e, callbackSet) }
      />
      <Label htmlFor={ `skill${ id }` } >{ skill }</Label>

      <Delete
        onClick={ () => deleteSkill(skill) }
      />
    </Skill>
  )
);

const handleChange = (e, callbackSet) => {
  const {
    value,
    checked
  } = e.target;

  callbackSet(value, checked);
}

const Filter = ({ skills, callbackSet, callbackAdd, deleteSkill }) => (
  <Container>
    <SkillsList>
      { rederFilter(skills, callbackSet, deleteSkill) }
    </SkillsList>

    <AddItem
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
