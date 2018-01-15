import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import { Input, Submit } from './UI';

const Container = styled.div`
  display: flex;
  min-height: 29px;
  padding: 0 20px;
  box-sizing: border-box;
`;

export default class AddItem extends PureComponent {
  static propTypes = {
    callback: func
  }

  handleChange = (value) => {
    this.setState({
      value: value
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
    const value = this.state ? this.state.value : '';

    return (
      <Container>
        <Input
          value={ value }
          onChange = { e => this.handleChange(e.target.value) }
        />
        <Submit onClick={ this.handleSubmit } >✨ Add ✨</Submit>
      </Container>
    );
  }
};
