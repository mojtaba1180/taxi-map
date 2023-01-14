import styled from 'styled-components';
import { radius_sm } from '../../utils/variables';
export const MainMenuButton = styled.button`
    border:  0px;
    background-color: #fff;
    padding: 0 2px;
    min-width: 40px;
    min-height: 40px;
    border-radius: ${radius_sm};
    color: #666;
    text-align: center;
    svg {
        width: 30px;
        margin-bottom: -3px;
    }
`;

export const NavigationButton = styled.button`
    min-width: 40px;
    min-height: 40px;
    border:0px;
    background-color: #fff;
    padding: 10px;
    border-radius: ${radius_sm};
    color: #666;
`;