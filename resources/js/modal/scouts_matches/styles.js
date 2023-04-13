import styled from 'styled-components';

export const Container = styled.div`
`;

export const Match = styled.div`
    display: grid;
    grid-template-columns: 48.5% auto 48.5%;
    grid-gap: 5px;
    font-size: 0.9em;
`;

export const Local = styled.div`
    grid-column: 1/4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Time = styled.small`

`;

export const Address = styled.strong`
    font-size: 0.9em;
    color: #666;
`;

export const Team = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Shield = styled.img`
    width: 50px;
`;

export const TeamName = styled.strong`
    margin: 10px auto;
`;

export const Versus = styled.strong`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Players = styled.div`
    grid-column: 1/4;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width:900px){
        flex-direction: column;
    }
`;

export const List = styled.div`
    width: 48.5%;
    padding: 10px;
    border: solid thin #ccc;
    height: 100vh;

    @media screen and (max-width:900px){
        width: 100%;
        margin-bottom: 15px;
    }
`;

