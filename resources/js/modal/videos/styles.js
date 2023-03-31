import styled from 'styled-components';

export const Container = styled.div`
    user-select: none;
    width: 640px;
    margin-left: -320px;
    height: 360px;
    position: fixed;
    z-index: 50;
    left: 50%;
    top: 60%;
    opacity: 0;
    visibility: hidden;  

    @media screen and (max-width:900px){
        margin-left: -45%;
        width: 95%;
        height: 250px;
    }

`;

export const Screen = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 25;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    opacity: 0;
    visibility: hidden;    
`;

export const Iframe = styled.iframe`
    width: 640px;
    height: 360px; 

    @media screen and (max-width:900px){
        width: 95%;
        height: 250px;
    }
`;
