import React, { Component } from 'react';
import { object } from 'prop-types';
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


export default class Details extends Component {
  static propTypes = {
    data: object
  }

  renderSkillset = (skills) => (
    <SkillSet>
      {
        skills.map(skill => <li key={ skill }>{ skill }</li>)
      }
    </SkillSet>
  )

  render() {

    const {
      data,
      callback
    } = this.props;

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
        
        { this.renderSkillset(skills) }

        <AddItem
          callback={ callback }
        />

      </Container>
    );
  }
};
