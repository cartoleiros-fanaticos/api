import styled from 'styled-components';

export const Container = styled.div`
`;

export const Content = styled.div`
    width: 1150px;
    margin: 60px auto 0 auto;
    padding: 20px 10px;
    min-height: 600px;

    @media screen and (max-width:900px){
        width: 100%;
    }
`;

export const Title = styled.header`
    padding: 10px;
    width: 300px;
    margin: 0 auto 25px auto;
    border: solid 2px #F68D42;
    border-radius: 0.3em;
    font-size: 1.2em;
    text-align: center;

    @media screen and (max-width:900px){
        width: 60%;
        font-size: 0.9em;
    }

`;
