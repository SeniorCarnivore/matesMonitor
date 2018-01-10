import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 0 0 10px 0;
`;

const Input = styled.input`
  height: 20px;
`;

const Submit = styled.button`
  cursor: pointer;
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
    const {
      value
    } = this.state;

    const {
      callback
    } = this.props;

    callback(value);

    this.setState({
      value: ''
    });
  }

  render() {
    const value = this.state ? his.state.value : '';

    return (
      <Container>
        <Input
          value={ value }
          onChange = { (e) => this.handleChange(e.target.value) }
        />
        <Submit onClick={ this.handleSubmit } >Add</Submit>
      </Container>
    );
  }
};
