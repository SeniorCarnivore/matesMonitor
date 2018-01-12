import React, { Component } from 'react';
import { object, func, number } from 'prop-types';
import styled from 'styled-components';

const DropFilterContainer = styled.button`
  width: 100%;
  height: 40px;
  border: 0;
  margin-top: auto;
  font-size: 20px;
  background-color: #666;
  cursor: pointer;
  outline: none;
`;

const DropAppContainer = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 4px 9px 1px 6px;
  font-size: 20px;
  text-align: center;
  border: 0;
  background-color: #ff9d9d;
  cursor: cell;
`;


const dropApp = () => {
  localStorage.clear();
  document.location.reload();
}

export const DropApp = () => (
  <DropAppContainer onClick={ dropApp }>
    💀
  </DropAppContainer>
);

export const DropFilter = ({ callback }) => (
  <DropFilterContainer onClick={ callback }>
    💥 Drop Filter 💥
  </DropFilterContainer>
);
