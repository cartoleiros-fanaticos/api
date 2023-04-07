import styled from 'styled-components';

export const Label = styled.label`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border: solid 2px #ccc;
    background-color: #f1f1f1;
    border-radius: 10px;
    text-align: right;
    margin: 25px auto;
    color: #666;
`;

export const Input = styled.input.attrs(() => ({
    type: 'search',
    placeholder: 'Digite nome do time'
}))`
    background-color: transparent;
    width: 100%;
    border: none;
    font-size: 15px;
    outline: none;
    background-color: #f1f1f1;
`;
export const Players = styled.div`
    width: 100%;
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

export const PlayerPhoto = styled.img`
    width: 35px;
`;

export const ContainerNamePosition = styled.div`
    display: flex;
    flex-direction: column;
`;


export const PlayerName = styled.strong`
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

export const PlayerTitle = styled.h3`
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

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
   color: #666; 
   margin-right: 10px;
`;

export const Content = styled.div`
    /* display: flex;
    justify-content: space-between;   */
    position: relative;
    min-height: 500px; 

    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 25px;

    @media screen and (max-width:900px){
        flex-direction: column;
        margin-bottom: 25px;
        min-height: 300px; 
    }
`;

export const Box = styled.div`
    width: 100%; 

    &:nth-child(1) {
        grid-column: 1/3;
    } 

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
