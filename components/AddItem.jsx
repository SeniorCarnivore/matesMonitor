import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Input = styled.input`
  height: 25px;
  font-size: 16px;
  width: 100%;
  padding: 0 10px;
  border: 0;
  box-sizing: border-box;
  outline: none;
`;

const Submit = styled.button`
  border: 0;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  color: #fff;
  background-color: #666;
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
    const value = this.state ? this.state.value : '';

    return (
      <Container>
        <Input
          value={ value }
          onChange = { (e) => this.handleChange(e.target.value) }
        />
        <Submit onClick={ this.handleSubmit } >✨ Add ✨</Submit>
      </Container>
    );
  }
};
