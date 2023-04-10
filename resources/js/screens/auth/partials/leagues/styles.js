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

    @media screen and (max-width:900px){
        width: 90%;
    }
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
   color: #666; 
   margin-right: 10px;
`;

export const Input = styled.input.attrs(() => ({
    type: 'search',
    placeholder: 'Digite nome da liga'
}))`
    background-color: transparent;
    width: 100%;
    border: none;
    font-size: 15px;
    outline: none;
    background-color: #f1f1f1;
`;

export const Content = styled.div`

`;

export const Emphasis = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Box = styled.div`
    width: 32%;
    min-height: 220px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: solid 2px #F68D42;
    padding: 15px;
    border-radius: 0.5em;
`;

export const Title = styled.h3`
    font-size: 0.9em;
`;

export const Image = styled.img`
    width: 30%;
    margin: 15px auto;
`;

export const Score = styled.strong`

`;

export const Text = styled.span`
    font-size: 0.8em;
`;

export const Table = styled.table.attrs(() => ({
    border: 1
}))`
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
    font-size: 0.9em;
    width: ${({ width }) => width ? `${width}%` : 'auto' };
`;

export const Tbody = styled.tbody`

`;

export const Td = styled.td`
    cursor: pointer;
    width: ${({ width }) => width ? `${width}%` : 'auto' };
    font-size: 0.9em;
    text-align: center;
    align-items: center;
`;

export const Shield = styled.img`
    width: 35px;
    float: left;
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 4px 10px;
    float: left;
`;

export const NameTeam = styled.strong`
    font-size: 0.9em;
`;

export const NamePlayer = styled.small`
    font-size: 0.8em;
`;

