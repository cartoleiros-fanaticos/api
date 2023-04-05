import styled from 'styled-components';

export const Label = styled.label`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: solid thin #F68D42;
    border-radius: 0.3em;
    position: relative;
    grid-column: 1/3;
    width: 50%;
    margin: 20px auto;    

    @media screen and (max-width:900px){
		width: 100%;
        padding: 5px;
    }
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

export const NamePlayer = styled.span`
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

export const Content = styled.div`
    display: flex;
    justify-content: space-between;  
    position: relative;
    min-height: 500px; 

    @media screen and (max-width:900px){
        flex-direction: column;
        margin-bottom: 25px;
        min-height: 300px; 
    }
`;

export const Box = styled.div`
    width: 49%;  

    @media screen and (max-width:900px){
        width: 100%;
    }
`;

export const Fieldset = styled.fieldset`
    display: flex;
    border: solid thin #F68D42;
    border-radius: 0.5em;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export const Legend = styled.legend`
    color: #000;
    padding: 0 15px;
    font-size: 0.9em;
    font-weight: 500;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 33%;
    margin-bottom: 10px;
    align-items: center;
`;

export const Title = styled.strong`
    color: #F68D42;
    display: block;
    text-align: center;
    font-size: 0.9em;
`;

export const Value = styled.span`
    color: #666;
    font-size: 0.8em;
    font-weight: bold;
    margin: 5px auto;
`;

export const Text = styled.small`
    color: #636363;
    font-size: 0.8em;
`;

export const Photo = styled.img`
    width: 48px;
    margin: 10px auto 5px auto;
`;

export const Table = styled.table.attrs(() => ({
    cellpadding: 0,
    cellspacing: 0

}))`
    width: 100%;
    font-size: 0.8em;
`;

export const Thead = styled.thead`

`;

export const Th = styled.th`
    font-weight: 500;
`;

export const Tbody = styled.tbody`

`;

export const Tr = styled.tr`

`;

export const Td = styled.td`
    border-bottom: solid thin #cccccc;
    padding: 5px;
    text-align: center;
    color: ${({ color }) => color ? color : '#636363' };
`;

export const PhotoName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 140px;

    margin: auto;

    img {
        width: 25px;
        height: 25px;
    }
`;

export const Name = styled.span`
    padding: 5px;
`;

export const Multiply = styled.span`
    background-color: #F68D42;
    color: #f1f1f1;
    border-radius: 0.5em;
    font-size: 0.85em;
    margin: 0 5px;
    font-weight: bold;
    padding: 3px;
`;
