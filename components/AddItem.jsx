import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { Input, Submit } from './UI';

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 0 20px;
  box-sizing: border-box;
`;

export default class AddItem extends PureComponent {
  static propTypes = {
    callback: func
  }

  state = {
    value: ''
  }

  handleChange = e => {
    const {
      value
    } = e.target;

    this.setState({
      value
    });
  }

  handleSubmit = () => {
    const { value } = this.state;
    const { callback } = this.props;

    callback(value);

    this.setState({
      value: ''
    });
  }

  render() {
    const { value } = this.state;

    return (
      <Container>
        <Input
          value={ value }
          onChange = { this.handleChange }
        />
        <Submit onClick={ this.handleSubmit } >✨ Add ✨</Submit>
      </Container>
    );
  }
}
