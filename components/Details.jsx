import React, { Component } from 'react';
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
  margin: 0 0 10px 0;
  padding-left: 80px;
`;

const renderSkillset = (skills) => (
  <SkillSet>
    {
      skills.map(skill => <li key={ skill }>{ skill }</li>)
    }
  </SkillSet>
)


const Details = ({ data, callback }) => {

  const {
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
      
      { renderSkillset(skills) }

      <AddItem
        callback={ callback }
      />

    </Container>
  );
}

Details.propTypes = {
  data: object,
  callback: func
};

export default Details;
