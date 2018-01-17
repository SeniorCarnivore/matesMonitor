import React from 'react';
import styled from 'styled-components';

const DropFilterContainer = styled.button`
  height: 50px;
  border: 0;
  margin-top: auto;
  font-size: 20px;
  background-color: #666;
  cursor: pointer;
  outline: none;
`;

const DropAppContainer = styled.button`
  width: 50px;

  height: 50px;
  font-size: 25px;
  text-align: center;
  border: 0;
  background-color: #ff9d9d;
  cursor: cell;
`;


const dropApp = () => {
  localStorage.clear();
  document.location.reload();
};

export const DropApp = () => (
  <DropAppContainer onClick={ dropApp }>
    💀
  </DropAppContainer>
);

export const DropFilter = ({ callback }) => (
  <DropFilterContainer onClick={ callback }>
    💥 Drop Filter 💥
  </DropFilterContainer>
)
