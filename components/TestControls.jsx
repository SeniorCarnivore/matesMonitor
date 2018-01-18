import React from 'react';
import styled from 'styled-components';

const DropFilterContainer = styled.button`
  width: 50px;
  height: 50px;
  border: 0;
  margin-top: auto;
  font-size: 25px;
  text-align: center;
  background-color: #fffb7b;
  cursor: pointer;
  outline: none;
  transition: all .2s;

  &:hover {
    box-shadow: 0 0 10px 0 #000;
    z-index: 1;
  }
`;

const DropAppContainer = styled.button`
  width: 50px;
  height: 50px;
  font-size: 25px;
  text-align: center;
  border: 0;
  background-color: #ff9d9d;
  cursor: cell;
  outline: none;
  transition: all .2s;

  &:hover {
    box-shadow: 0 0 10px 0 #000;
    z-index: 1;
  }
`;


const dropApp = () => {
  localStorage.clear();
  document.location.reload();
};

export const DropApp = () => (
  <DropAppContainer title='Drop browser data' onClick={ dropApp }>
    💀
  </DropAppContainer>
);

export const DropFilter = ({ callback }) => (
  <DropFilterContainer title='Drop filter settings' onClick={ callback }>
    💥
  </DropFilterContainer>
);
