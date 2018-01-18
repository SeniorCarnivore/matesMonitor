import React from 'react';
import {
  oneOfType,
  string,
  object,
  func
} from 'prop-types';
import styled from 'styled-components';

import Avatar from './Avatar';
import AddItem from './AddItem';
import {
  Checkbox,
  Label,
  SkillsList,
  Skill
} from './UI';

import { handleCheckboxChange } from './Helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #2b2b2b;
`;

const DetailsBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

const MatesSkillsList = styled(SkillsList)`
  flex-wrap: wrap;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 60px 10px 60px;
`;

const MatesSkill = styled(Skill)`
  min-width: 50%;
  max-width: 50%;
`;

const AddItemWrapper = styled.div`
  padding-left: 40px;
  width: 400px;
`;

const DeleteMate = styled.button`
  position: relative;
  width: 60px;
  height: 60px;
  padding: 0;
  margin: 20px 0 0 60px;
  line-height: 60px;
  border: 0;
  font-size: 30px;
  background-color: transparent;
  cursor: pointer;
  outline: none;

  &:hover {
    &:before {
      transform: rotate(-45deg) translate(-7px, 9px) scale(0.7);
    }
    
    &:after {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before,
  &:after {
    display: block;
    position: absolute;
    width: 60px;
    height: 60px;
    transition: all .5s;
  }

  &:before {
    content: '⚰️';
    top: 0;
    transform: rotate(0deg) translate(0, 0) scale(1);
  }

  &:after {
    content: '🔥';
    top: 0;
    opacity: 0;
    font-size: 35px;
    transform: translateY(10px);
  }
`;

const renderSkillset = (skills, toggleUserSkill, id) => (
  <MatesSkillsList>
    {
      Object.keys(skills).map((skill, ind) =>
        <MatesSkill key={ skill }>
          <Checkbox
            id={ `skill${ ind }` }
            type='checkbox'
            value={ skill }
            checked={ skills[skill] }
            onChange={ e => handleCheckboxChange(e, toggleUserSkill, id) }
          />

          <Label htmlFor={ `skill${ ind }` } >{ skill }</Label>
        </MatesSkill>
      )
    }
  </MatesSkillsList>
);

const Details = ({data, callback, toggleUserSkill, deleteMate }) => {
  const {
    id,
    name,
    surname,
    skills,
    rating
  } = data || false;

  if (typeof data === 'string' ){
    return (
      <Container>
        { data }
      </Container>
    );
  }

  return (
    <Container>

      <DetailsBlock>
        <Avatar url=''/>
        { `${ name } ${ surname } (${ rating })` }
      </DetailsBlock>
      
      { 
        skills &&
        renderSkillset(skills, toggleUserSkill, id)
      }

      <AddItemWrapper>
        <AddItem callback={ callback }/>
      </AddItemWrapper>

      <DeleteMate onClick={ () => deleteMate(id) }/>
    </Container>
  );
};

Details.propTypes = {
  data: oneOfType([object, string]),
  callback: func,
  deleteMate: func,
  toggleUserSkill: func,
  addMate: func
};

export default Details;
