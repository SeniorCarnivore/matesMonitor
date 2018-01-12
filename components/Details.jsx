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
  width: 133px;
  margin: 0 0 10px 0;
  padding-left: 80px;
`;

const Skill = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DeleteSkill = styled.button`
  border: 0;
  font-size: 10px;
  cursor: pointer;
  background-color: transparent;
`;

const DeleteMate = styled.button`
  display: flex;
  align-self: baseline;
  border: 0;
  font-size: 30px;
  background-color: transparent;
  cursor: pointer;
`;

const renderSkillset = (skills, deleteUserSkill, id) => (
  <SkillSet>
    {
      skills.map(skill => (
        <Skill key={ skill }>
          <span>{ skill }</span>
          <DeleteSkill onClick={ () => deleteUserSkill(skill, id) }>
            ❌
          </DeleteSkill>
        </Skill>
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

      <DeleteMate onClick={ () => deleteMate(id) }>
        ⚰️
      </DeleteMate>

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
