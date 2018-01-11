import React, { Component } from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';

import AddItem from './AddItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkillsList = styled.ul`
  display: block;
  width: 100%;
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 18px;
  list-style: none;
`;

const Skill = styled.li`
  display: flex;
  align-items: center;
  user-select: none;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Label = styled.label`
  cursor: pointer;
`;

const rederFilter = (skills, callbackSet) => (
  skills.map((skill, id) => 
    <Skill key={ id }>
      <Checkbox
        id={ `skill${ id }` }
        type='checkbox'
        value={ skill }
        onChange={ (e) => handleChange(e, callbackSet) }
      />

      <Label htmlFor={ `skill${ id }` } >{ skill }</Label>
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

const Filter = ({ skills, callbackSet, callbackAdd }) => (
  <Container>
    <SkillsList>
      { rederFilter(skills, callbackSet) }
    </SkillsList>

    <AddItem
      callback={ callbackAdd }
    />

  </Container>
);

Filter.propTypes = {
  skills: array,
  callbackSet: func,
  callbackAdd: func
};

export default Filter;
