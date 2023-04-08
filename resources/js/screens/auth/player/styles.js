import styled from 'styled-components';

export const Content = styled.div`
`;

export const Filter = styled.div`
    display: flex;
    margin-top: 25px;
    justify-content: space-between;
    width: 100%;

    @media screen and (max-width:900px){
        display: grid;
        grid-template-columns: 17% 17% 17% 17% 80px;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }
`;

export const Select = styled.select`
    outline: none;
    padding: 5px 10px;
    width: 15%;
    border: solid 2px #000000;
    border-radius: 0.5em;
    color: #000000;
    font-size: 0.9em;

    @media screen and (max-width:900px){                 
        width: 100%;
    }
`;

export const Option = styled.option``;

export const Button = styled.button`
    background-color: #ffffff;
    border: solid 2px #F68D42;
    color: #F68D42;
    width: 12%;
    border-radius: 0.5em;
    font-weight: bold;
    transition-duration: 0.5s;
    outline: none;
    cursor: pointer;
    height: 33.5px;
    &:hover {
        background-color: #F68D42;
        color: #ffffff;
    }

    @media screen and (max-width:900px){                
            width: 100%;
    }
`;

export const Label = styled.label`
    width: 15%;
    padding: 5px 10px;
    width: 17%;
    border-radius: 0.5em;
    border: solid 2px #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width:900px){
        width: 100%;
        grid-column: 1/6; 
    }
`;

export const Input = styled.input.attrs(() => ({
    placeholder: 'Nome jogador',
    type: 'search'
}))`     
    flex: 1;
    width: 100%;
    outline: none;
    border: none;
    color: #000000;
    font-size: 0.9em;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    font-size: 1.2em;
    color: #000000;
    margin-right: 10px;    
`;

export const List = styled.div`
    @media screen and (max-width:900px){
        width: 100%;
        overflow: auto;        
    }
`;

export const Table = styled.table`
    width: 100%;
`;

export const Thead = styled.thead`
    margin-top: 25px;
    border: solid thin #000000;
    padding: 10px;
    color: #000000;
    font-size: 0.9em;
    border-radius: 0.5em;
    cursor: default;
`;

export const Tr = styled.tr`
    width: 100%;
    border: solid thin #000000;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5em;
    margin-top: 15px;
    transition-duration: 0.3s;
    cursor: pointer;
    opacity: ${({ compare }) => compare ? 0.2 : 1};
    &:hover  {              
        background: #fafafa;
        transform: scale(1.05);
        box-shadow: 0 5px 10px #cccccc;
    }
`;

export const Th = styled.th`
    font-size: 0.8em;
    width: 107.234px;
`;

export const Tbody = styled.tbody`

`;

export const Td = styled.td`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 107.234px;
    text-align: center;
    cursor: pointer;
    font-size: 0.8em;
`;

export const Ico = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    color: ${({ color }) => color};
`;

export const Image = styled.img`
    width: 26px;
    height: 26px;
`;

export const Description = styled.p`
    display: flex;
    flex-direction: column;
    width: 95px;
`;

export const Name = styled.strong`
    font-size: 0.9em;
`;

export const Position = styled.small`
    font-size: 0.8em;
`;
