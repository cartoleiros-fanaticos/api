import styled from 'styled-components';

export const Content = styled.div`
    margin: 25px 0;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width:900px){  
        flex-direction: column;
    }
`;

export const Box = styled.div`
    width: 30%;

    @media screen and (max-width:900px){ 
        width: 100%;
        margin-bottom: 15px;
    }
`;

export const Title = styled.h3`
    display: block;
    font-size: 0.9em;
`;

export const Label = styled.label`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border: solid thin #F68D42;
    border-radius: 0.3em;
    margin-top: 5px;
    position: relative;
`;

export const Select = styled.select`
    width: 80%;
    outline: none;
    padding: 5px;
    border: none;
    border-bottom: solid thin #cccccc;
    color: #636363;
    background: none;

    @media screen and (max-width:900px){ 
        padding: 10px 5px;
    }
`;

export const Option = styled.option`

`;

export const Input = styled.input`
    width: 80%;
    outline: none;
    padding: 5px;
    border: none;
    border-bottom: solid thin #cccccc;
    color: #636363;
    background: none;

    @media screen and (max-width:900px){ 
        padding: 10px 5px;
    }
`;

export const Button = styled.button`
    width: 15%;
    border: none;
    background: #F68D42;
    color: #f1f1f1;
    cursor: pointer;
    outline: none;
`;

export const Teams = styled.div`
    position: absolute;
    visibility: hidden;
    width: 97%;
    background-color: #ffffff;
    top: 40px;
    height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 25;
    transition-duration: 0.5s;
    border: solid thin #ccc;

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #000;
        background-color: #f1f1f1;
    }

    &::-webkit-scrollbar {
        width: 7px;
        background-color: #000;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #000;
    }
`;


export const Team = styled.div`
    width: 100%;
    position: relative;
    cursor: pointer;
    border-bottom: solid thin #f1f1f1;
    padding: 10px 5px; 
    display: flex;
    justify-content: space-between;
    user-select: none;

    &:hover {
        background-color: #f1f1f1;
    }
`;

export const Description = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;

    display: grid;
    grid-template-columns: 26px 95%;
    grid-column-gap: 10px;
`;

export const Shield = styled.img`
    width: 26px;
    grid-row: 1/3;
`;

export const NameTeam = styled.strong`
    color: #666666;
    font-size: 0.9em;
    text-align: left;
`;

export const Name = styled.span`
    color: #666666;
    font-size: 0.7em;
    text-align: left;
`;

export const Remove = styled.span`
    color: red;
    width: 20%;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    font-size: 0.8em;
    z-index: 50;
`;


