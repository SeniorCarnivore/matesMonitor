import React, { Component } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import {
  Input,
  Submit
} from './UI';

const Container = styled.div`
  display: flex;
  position: relative;
  padding: 10px 20px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #ff5151;
    transition: opacity .2s; 
    opacity: ${ ({ error }) => error ? 1 : 0 };
    z-index: 0;
    pointer-events: none;
  };
`;

const FormInput = styled(Input)`
  margin-right: 20px;
  z-index: 1;
`;

const FormSubmit = styled(Submit)`
  z-index: 1;
`;

export default class AddMate extends Component {
  static propTypes = {
    callBack: func
  };

  state = {
    error: false
  };

  handleChange = (e) => {
    const {
      name,
      value
    } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    const {
      name,
      surname
    } = this.state;

    const { callback } = this.props;
    const userData = name && surname ? this.state : null;

    if (userData) {
      callback({
        name: name,
        surname: surname
      });

      this.setState({
        name: '',
        surname: '',
        error: false
      });
    } else {
      this.setState({
        error: true
      });

      setTimeout(() => {
        this.setState({
          error: false
        });
      }, 200);
    }
  }

  render() {
    const {
      error,
      name = '',
      surname = ''
    } = this.state;

    return (
      <Container error={ error }>
        <FormInput
          name='name'
          value={ name }
          placeholder='Mate name'
          onChange={ e => this.handleChange(e) }
        />

        <FormInput
          name='surname'
          value={ surname }
          placeholder='Mate surname'
          onChange={ e => this.handleChange(e) }
        />

        <FormSubmit
          onClick={ this.handleSubmit }
        >
          🤔 Add mate 🍻
        </FormSubmit>
      </Container>
    );
  }
};
