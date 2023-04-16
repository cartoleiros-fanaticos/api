import styled, { keyframes } from 'styled-components';

const flashing = keyframes`
    0% {
        color: brown;
    }

    50% {
        color: red;
    }

    100% {
        color: brown;
    }
`;


export const Container = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;  
`;

export const Text = styled.i`
    color: brown;
    font-size: 0.8em;
    animation: ${flashing} 1.5s;
    animation-iteration-count: infinite;
`;

export const Time = styled.small`
    color: brown;
    font-size: 0.8em;
    animation: ${flashing} 1.5s;
    animation-iteration-count: infinite;
`;