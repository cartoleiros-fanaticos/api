import styled from 'styled-components';

export const Content = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 10px;
    user-select: none;

    @media screen and (max-width:900px){  
        grid-template-columns: auto;
    } 
`;

export const ContainerRounds = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 60px;
    padding: 10px 0;
    grid-column: 1/3; 

    @media screen and (max-width:900px){ 
        grid-column: 1/1;
    } 
`;

export const Rounds = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    transition-duration: 0.5s;
`;

export const Round = styled.a`
    width: 100.398px;
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
    display: flex;
    flex-direction: column;
`;

export const Team = styled.div`  
    display: grid;
    grid-template-columns: 25% auto;
    border: solid thin #f1f1f1;    
    padding: 10px;
    cursor: pointer;
    transition-duration: 0.3s;

    @media screen and (max-width:900px){ 
        grid-template-columns: 30% auto;
    } 

    &:hover {
        box-shadow: 0 0 10px 5px #f1f1f1;
    }

    .active {
        box-shadow: 0 0 10px 5px #f1f1f1;
    }
`;

export const Shield = styled.img`
    width: 60px;
    grid-row: 1/5; 
    display: block;
    margin: auto;
`;

export const Text = styled.span`
    font-size: 0.9em;
    margin-left: 5px;
`;

export const Bold = styled.strong`
    font-size: 0.9em;
`;

export const Players = styled.div`    
    padding: 0 10px;
    min-height: 400px;
    width: 100%;
    position: relative;
`;

export const Player = styled.div`
    display: flex;
    align-items: center;
    display: flex;
    padding: 7px;
    border-bottom: solid thin #cccccc;
    display: grid;
    grid-template-columns: 35px 35px 200px auto;
`;

export const Captain = styled.a`
    font-weight: bold;
    width: 20px;
    height: 20px;
    text-align: center;
    padding: 3px 0;
    border-radius: 50%;
    color: #ffffff;
    font-size: 0.8em;
    margin-right: 15px;
    background-color: ${({ captain }) => captain ? '#F68D42' : '#CCC'};
`;

export const Photo = styled.img`
    width: 35px;
`;

export const ContainerNamePosition = styled.div`
    display: flex;
    flex-direction: column;
`;


export const Name = styled.strong`
    font-size: 0.9em;
    margin: 0 10px;
`;

export const Position = styled.span`
    color: #F68D42;
    margin: 0 10px;
    font-size: 0.9em;
`;

export const Price = styled.strong`
    font-size: 0.8em;
    margin: 0 10px;
    text-align: right;
`;

export const Title = styled.h3`
    padding: 5px;
    margin: 15px auto 10px auto;
    border-radius: 0.3em;
    border: solid 2px #000000;
    text-align: center;
    font-size: 0.8em;
    display: block;
    width: 100%;
    font-weight: 500;
`;
