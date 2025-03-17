import styled from "styled-components";

export const ScreenContainer = styled.header`
    background-color: white;
    padding: 20px;
    margin: -68px 32px 32px 32px; 
    border-radius: 9px;
    height: calc(84vh - 32px);
    background-size: 800px;
    background-position: center;
    background-repeat: no-repeat;
    overflow: auto;

    @media (max-width: 870px) {
        background-size: 600px;
    }

    @media (max-width: 768px) {
        
        margin: -68px 0px 0px 0px;
        padding: 10px;
        height: calc(100vh - 32px);
    }
`;
