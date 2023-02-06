import styled from "styled-components";

export const MapDirectionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    gap: 1em;
    padding-bottom: 1em;
`;

export const MapDirectionAddLocation = styled.div`
    width: 100%;
    min-height: fit-content;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1em;
`;
export const DraggableItem = styled.div`
    display: flex;
    gap: 1em;
    margin-bottom: 6px;
    width: 85%;
    align-items: center;
`;