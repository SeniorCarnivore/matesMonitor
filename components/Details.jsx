import React from 'react';
import { object, func } from 'prop-types';
import styled from 'styled-components';

import Avatar from './Avatar';
import AddItem from './AddItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  background-color: #666;
`;

const DetailsBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const SkillSet = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 0 0 10px 0;
  padding-left: 80px;

  li {
    display: flex;

    span {
      margin-left: auto;
    }
  }
`;

const Delete = styled.div`
  margin-left: auto;
  cursor: pointer;
  font-size: 10px;
`;

const Remove = styled.div`
  cursor: pointer;
  font-size: 30px;
`;

const renderSkillset = (skills, deleteUserSkill, id) => (
  <SkillSet>
    {
      skills.map(skill => (
        <li key={ skill }>
          <span>{ skill }</span>
          <Delete onClick={ () => deleteUserSkill(skill, id) }>❌</Delete>
        </li>
      ))
    }
  </SkillSet>
);


const Details = ({ data, callback, deleteUserSkill, deleteMate }) => {

  const {
    id,
    name,
    surname,
    skills,
    rating
  } = data;

  return (
    <Container>

      <DetailsBlock>
        <Avatar
          name={ name }
          surname={ surname }
          url=''
        />
        { `${ name } ${ surname } (${ rating })` }
      </DetailsBlock>
      
      { 
        renderSkillset(skills, deleteUserSkill, id)
      }

      <AddItem
        callback={ callback }
      />

      <Remove onClick={ () => deleteMate(id) }>⚰️</Remove>

    </Container>
  );
}

Details.propTypes = {
  data: object,
  callback: func,
  deleteUserSkill: func,
  deleteMate: func
};

export default Details;
