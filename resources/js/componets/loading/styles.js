import styled from 'styled-components';

export const Loading = styled.div`  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 150px;
    width: 150px;
    z-index: 100;
    left: 50%;
    top: 50%;
    margin-left: -75px;
    margin-top: -75px;
`;

export const Text = styled.p` 
    margin-top: 15px;
    font-size: 0.9em;
`;
