import styled from 'styled-components';

export const Input = styled.input`
  height: 29px;
  font-size: 16px;
  width: 100%;
  padding: 0 10px;
  border: 0;
  box-sizing: border-box;
  outline: none;
`;

export const Submit = styled.button`
  height: 29px;
  border: 0;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  color: #fff;
  background-color: #666;
`;

export const Checkbox = styled.input`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  cursor: pointer;
  opacity: 0;

  &:checked + label:after {
    opacity: 1;
    transform: translateX(6px);
  }
`;

export const Label = styled.label`
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    left: -40px;
    top: 0;
    background-color: #e2e2e2;
    pointer-events: none;
  }

  &:after {
    content: '💃';
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    left: -40px;
    top: 0;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
    transition: all .2s;
    transform: translateX(12px);
  }
`;

export const SkillsList = styled.ul`
  display: flex;
  font-size: 18px;
  list-style: none;
`;

export const Skill = styled.li`
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  &:hover {
    button {
      opacity: 1;
    }
  }
`;