import styled from 'styled-components';

export const Container = styled.div`
`;

export const Main = styled.div`  
    height: 100vh;
    display: grid;
    grid-template-columns: 250px auto;

    @media screen and (max-width:900px){
        grid-template-columns: 100%;
    }
`;

export const Content = styled.div`
    padding: 10px;
    height: auto;

    @media screen and (max-width:900px){
        margin-top: 56px;
    }
`;