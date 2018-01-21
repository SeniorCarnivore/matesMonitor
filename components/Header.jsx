import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

import {
  DropFilter,
  DropApp
} from './TestControls';

const Container = styled.div`
  display: flex;
  height: 50px;
  min-height: 50px;
  background-color: #000;
`;

const HeaderText = styled.h1`
  margin: 0 auto 0 20px;
  font-size: 25px;
  user-select: none;

  i {
    &:before {
      content: '🔍';
      display: inline-block;
      margin: 5px -5px 0 2px;
      font-style: normal;
      font-size: 27px;
      transform: translateY(8px);
    }
  }
`;

const Export = styled.button`
  width: 50px;
  height: 50px;
  font-size: 25px;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: #78ffa1;
  line-height: 50px;
  outline: none;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    box-shadow: 0 0 10px 0 #000;
    z-index: 1;
  }
`;

const ImportHolder = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  font-size: 25px;
  background-color: #5ed1fd;
  transition: all .2s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 0 #000;
    z-index: 1;
  }

  &:before {
    content: '🙌🏻';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 50px;
    pointer-events: none;
  }
`;

const Import = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 40px;
  opacity: 0;
  outline: none;
`;

const exportJson = () => {
  const data = JSON.stringify({
    skills: localStorage.getItem('skills'),
    mates: localStorage.getItem('mates')
  });

  const a = document.createElement('a');
  const file = new Blob([data], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = 'matesMonitorData.txt';
  a.click();
};

const getJsonFromFile = ( e, callback ) => {
  const { files } = e.target; 
  const file = files[0];

  readFileContent(file)
    .then(content => (
      callback(JSON.parse(content))
    ))
    .catch(error => console.log(error));
};

const readFileContent = file => {
	const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  })
};

const Header = ({ callback, importJson }) => (
  <Container>
    <HeaderText>matesMonit<i/>r</HeaderText>
    
    <Export title='Export to file' onClick={ exportJson }>
      <span aria-label="Export to file" role='img'>🙏🏻</span>
    </Export>

    <ImportHolder title='Import from file'>
      <Import type='file' onChange={ (e) => getJsonFromFile(e, importJson) }/>
    </ImportHolder>

    <DropFilter callback={ callback }/>

    <DropApp/>
  </Container>
);


Header.propTypes = {
  callback: func
};

export default Header;
