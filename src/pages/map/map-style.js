import styled from 'styled-components';
import { radius_lg } from '../../utils/variables';
import { GrayLight } from './../../utils/variables';


// ############## Top Box  ##################
export const MapTopContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    z-index: 2;
    position: absolute;
    
    right: 0;
    display:flex;
    padding: 0 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* margin-top: 1em; */
    /* background-color: #ff0; */
    @media screen and (min-width:420px){
        max-width:420px;
    }
    @media screen and (max-width:420px){
        max-width:420px;
    }

`;
export const MapTopBox = styled.div`
    width: 100%;
    margin: 1em 1em 0 auto;
    border-radius:  ${radius_lg};
    padding: 5px;
    background-color: #fff;
    border: 2px solid ${GrayLight};
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: start;
    align-items: center;
    transition: all .3s;
    min-height: ${props => props.expand ? "270px": "none"};
    height: ${props =>  props.expand ? "fit-content" : props.collapsed ? "50px" :"4em" };
    overflow: hidden;
    z-index: 2;
    /* overflow: hidden; */
    @media screen and (min-width:420px){
        max-width: ${props => props.collapsed ? "50px": "420px"} ;
    }
     @media screen and (max-width:460px){
        margin-left:1em;
    }
    .mapbox-row{
        height: 3em;
        width: 100%;
        display: flex;
    }
`;


// ############## End Top Box  ##################

// ############## start Directions Box  ##################

export const MapDirectionBox = styled.div`
    width: 100%;
    margin: 1em auto;
    border-radius:  ${radius_lg};
    padding: 3px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 3em;
    z-index: 1;
    @media screen and (min-width:420px){
        width:420px;
    }
     @media screen and (max-width:460px){
        margin-left:1em;
    }
`; 

export const  MapDirectionHeader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
        font-size: 18px;
        font-weight: 500;
        margin-right: -3em;
        margin-top: 10px;
    }
`;
// ############## End Directions Box  ##################




// ############## Bottom Box  ##################
export const MapBottomContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    z-index: 2;
    position: absolute;
    bottom:0;
    right: 0;
    display:flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 1em; */
    
    
`;
export const MapBottomBox = styled.div`
    width: 100%;
    margin: 1em auto;
    border-radius: ${radius_lg};
    padding: 10em 10px 10px 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width:420px){
        max-width:420px;
    }
`;

// ############## End Bottom Box  ##################




