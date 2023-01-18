import styled from 'styled-components';
import { GrayDark, GrayLight, radius_lg } from '../../utils/variables';


export const SearchBarContainer = styled.div`
    width: 100% ;
    display: flex;
`;
export const SearchBarInputBox = styled.div`
    width: 100%;
    height: 3em;
    background-color: ${GrayLight};
    border-radius: ${radius_lg};
    display: flex;
    align-items:center;
    padding: 0 10px 0 10px ;
    position:relative;
    span{
        z-index: 2;
        position: absolute;
        left: 2%;
        top: 50%;
        transform: translateY(-45%);
    }   
    svg{
        width: 25px;
        color: ${GrayDark};
    }
    
`;
export const SearchBarInput = styled.input`
    position: absolute;
    left: 5px;
    width: 96%;
    z-index: 0;
    height: 80%;
    border: 0;
    background-color: transparent;
    border-radius: ${radius_lg};
    outline: none;
    font-size: 18px;
`;
export const DirectionButton = styled.button`
  width: 40px;
  height: 34px;
  margin: 5px 5px 0 3px;
  background-color: #0084ff;
  color: white;
  font-size: 10px;
  border-radius: ${radius_lg};
  transition: .2s;
  &:hover{
    cursor: pointer;
    transform:scale(1.1)
  }
  &:active{
    background-color: #2e9aff;
  }
`;