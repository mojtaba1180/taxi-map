import styled from "styled-components";
import { GrayDark, GrayLight, Primary, radius_lg, radius_sm, Secondary } from '../../../utils/variables';

export const MapLiveContainer = styled.div`

`;

export const MapLiveRightBox = styled.div`
    position: absolute;
    top: 1em;
    right: 1em;
    background-color: #fff;
    width: 420px;
    height: 500px;
    z-index: 1;
    border-radius: ${radius_lg};
    padding: 1em;
`;

export const MapLiveRightBoxTitle = styled.p`
    margin: auto;
    margin-bottom: 10px;
    padding: 0 0;
    font-size: 18px;
    text-align: center;
`;


export const MapLiveSearch = styled.div`
    width: 100%;
    height: 3em;
    background-color: ${GrayLight};
    border-radius: ${radius_lg};
    display: flex;
    align-items:center;
    padding: 0 10px 0 10px ;
    position:relative;
    transition: all .2s;
    box-shadow: ${props => props.active ? Primary : "none"} 0px 0 0px 2px;
    margin-top: 2px;

    span{
        z-index: 2;
        position: absolute;
        left: 2%;
        top: 50%;
        transform: translateY(-45%);
        background: ${GrayLight};
        padding-right: 7px;
    }   
    svg{
        width: 25px;
        color: ${GrayDark};
    }
    
`;
export const MapLiveSearchInput = styled.input`
    position: absolute;
    left: 5px;
    width: 96%;
    z-index: 0;
    height: 80%;
    border: 0;
    background-color: transparent;
    border-radius: ${radius_lg};
    outline: none;
    font-size: 15px;
`;
export const MapLiveList = styled.ul`
    list-style: none;
    padding: 1em 0;
`;

export const MapLiveListItem = styled.li`
    background-color:  ${props => props.active ? Primary : GrayLight};
    color: ${props => props.active ? "#fff" : "#000" };
    margin-bottom: 10px;
    padding: 1em 10px;
    border-radius: ${radius_sm};
    width: 100%;
    height: 80px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all .3s;
    border: 1px solid ${Secondary};
    &:hover {
        background-color: #fff;
        color:#000
    }
    & .icon {
       border-radius: 100px;
        width: 50px;
        background-color: #fff;
        color: ${props => props.active ? "#fff" : "#000" };
    }
    &:hover .icon {
        background-color: ${Primary};
        transition: all .3s;
        color: #fff;
    }
`;
export const MapLiveListItemTitle =  styled.span`
    font-size: 1.3em;
    margin: 0;
`;
export const MapLiveListItemContent =  styled.p`
    font-size: 15px;
    margin: 0;
`;
