import styled from 'styled-components';

export const Content = styled.div`
    position: relative;
    min-height: 500px;
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

export const List = styled.div`
    margin: 25px 0 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width:900px){ 
        display: grid;
        grid-template-columns: 46% 46%;
        grid-gap: 15px;
    }
`;

export const Item = styled.div`
    border: solid 1px #ccc;
    color: #999;
    width: 18%;
    padding: 7px 12px;
    margin-bottom: 15px;
    border-radius: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition-duration: 0.5s;
    cursor: pointer;

    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-row-gap: 10px;
    align-items: center;

    &:hover {
        transform: scale(1.2);
    }

    @media screen and (max-width:900px){ 
        width: 100%;
    }
`;

export const Date = styled.span`
    font-size: 0.9em;
    grid-column: 1/6;
    display: block;
    text-align: center;
`;

export const Shield = styled.img`
    width: 35px;
`;

export const Text = styled.span`
    color: #636363;
    font-size: 1.2em;
`;

export const Button = styled.a`
    display: block;
    padding: 5px;
    background-color: #23d18b;
    color: #fff;
    font-size: 0.7em;
    border-radius: 0.3em;
    text-align: center;
    margin: auto;
    width: 70%;
    transition-duration: 0.3s;
    grid-column: 1/6;
`;

