import styled from 'styled-components';
import { GrayDark, GrayLight, radius_lg, radius_sm } from './utils/variables';


// ############## Top Box  ##################
export const HomeTopContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    z-index: 2;
    position: absolute;
    top:0;
    right: 0;
    display:flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 1em; */

`;
export const HomeTopBox = styled.div`
    width: 100%;
    margin: 0 auto;
    border-radius: 0 0 ${radius_lg} ${radius_lg};
    padding: 1em 10px 10px 10px;
    /* background-color: #fff; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width:420px){
        max-width:420px;
    }

`;

// ############## End Top Box  ##################


// ############## Bottom Box  ##################
export const HomeBottomContainer = styled.div`
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
export const HomeBottomBox = styled.div`
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

export const HomeBottomSearchBar = ({ children }) => {

    const Box = styled.div`
        width: 100%;
        height: 40px;
        background-color: ${GrayLight};
        border-radius: ${radius_sm};
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
        span{
            width: 30px;
            color: ${GrayDark};
            svg{
                margin-top: 3px;
                margin-left: -3px;
                width: 100%;
            }
        }
    `;

    return (
        <Box>
            {children}
        </Box>
    )

}
// ############## End Bottom Box  ##################




