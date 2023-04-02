import styled from 'styled-components';

export const Content = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 10px;
`;

export const ContainerRounds = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 60px;
    padding: 10px 0;
    grid-column: 1/3; 
`;

export const Rounds = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    transition-duration: 0.5s;
`;

export const Text = styled.a`
    width: 99.489px;
    height: 40px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid thin #f1f1f1;
    color: #ccc;
    font-weight: bold;
    cursor: pointer;
    transition-duration: 0.3s;
    background-color: #fff;

    &.current {
        color: #fff;
        background-color: #F68D42;
        border: solid thin #F68D42;
    }

    &:hover {
        transform: scale(1.2);
        color: #fff;
        background-color: #F68D42;
        border: solid thin #F68D42;
    }

    @media screen and (max-width:900px){
        width: ${({ width }) => (width - 20) / 7}px;
    }
`;

export const Teams = styled.div`  
    display: grid;
    grid-template-columns: 35% 65%;
    border: solid thin #f1f1f1;
`;

export const Shield = styled.img`
    width: 100px;
    grid-row: 1/4; 
`;

export const Name = styled.span`


`;

export const Patrimony = styled.span`


`;

export const Score = styled.span`


`;


export const Players = styled.div`
    
    padding: 10px;
`;

