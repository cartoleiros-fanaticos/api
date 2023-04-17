import styled from 'styled-components';

export const Container = styled.div`
`;

export const Match = styled.div`
    display: grid;
    grid-template-columns: auto 2% auto;
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
    display: grid;
    grid-template-columns: 50% 50%;

    @media screen and (max-width:900px){
        grid-template-columns: 100%;
    }
`;

export const ContainerLive = styled.div`
    grid-column: 1/3;

    @media screen and (max-width:900px){
        grid-column: 1/1;
    }
`;

export const List = styled.div`
    width: 100%;
    padding: 10px;
    border: solid thin #ccc;
    min-height: 300px;

    @media screen and (max-width:900px){
        width: 100%;
        margin-bottom: 15px;
    }
`;

