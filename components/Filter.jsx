import React, { Component } from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const SkillsList = styled.ul`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  font-size: 18px;
  list-style: none;
`;

export default class Filter extends Component {
  static propTypes = {
    data: array
  }

  rederFilter = (skills) => (
    skills.map((skill, id) => 
      <li key={ id }>
        <input
          id={ `skill${ id }` }
          type='checkbox'
          value={ skill }
          onChange={ (e) => this.handleChange(e) }
        />

        <label htmlFor={ `skill${ id }` } >{ skill }</label>
      </li>
    )
  )

  handleChange = (e) => {
    const {
      callback
    } = this.props;

    const {
      value,
      checked
    } = e.target;

    callback(value, checked);
  }

  render() {
    const {
      skills,
      callback
    } = this.props;

    return (
      <Container>
        <SkillsList >
          { this.rederFilter(skills) }
        </SkillsList>
      </Container>
    );
  }
};
