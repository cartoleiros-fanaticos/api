import styled from 'styled-components';

export const Label = styled.label`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    border: solid 2px #ccc;
    background-color: #f1f1f1;
    border-radius: 10px;
    text-align: right;
    margin: 0 auto 25px auto;
    color: #666;
    align-items: center;

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
    font-size: 0.9em;
    outline: none;
    padding: 10px 5px;
    background-color: #f1f1f1;
`;

export const Content = styled.div`

`;

export const Header = styled.div`
    display: flex;
    width: 60%;
    align-items: center;
    flex-direction: column;
    margin: 25px auto;
    position: relative;

    @media screen and (max-width:900px){
        width: 90%;
    }
`;

export const Share = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    font-size: 28px;
    padding: 15px;
    border-radius: 50%;
    border: solid 2px #25D366;
    top: 15px;
    right: 0;
    position: absolute;
    transition-duration: 0.3s;
    cursor: pointer;
    color: #25D366;

    &:hover {
        color: #fff;
        background-color: #25D366;
    }

    @media screen and (max-width:900px){
        font-size: 22px;
        padding: 10px;
    }
`;

export const HeaderShield = styled.img`
    width: 150px;
    margin: 25px auto;
`;

export const HeaderTitle = styled.h3`
    font-size: 2em;
    font-weight: bold;

    @media screen and (max-width:900px){
        font-size: 1.5em;
    }
`;

export const HeaderText = styled.span`
    font-size: 0.9em;
    margin: 10px auto;
`;


export const Emphasis = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width:900px){
        flex-direction: column;
    }
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

    @media screen and (max-width:900px){
        width: 100%;
        margin-bottom: 15px;
    }
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

export const Select = styled.select`
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 0;
    background-color: transparent;
`;

export const Option = styled.option``;


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
    width: ${({ width }) => width ? `${width}%` : 'auto'};

    @media screen and (max-width:900px){
        font-size: 0.8em;
    }
`;

export const Tbody = styled.tbody`

`;

export const Td = styled.td`
    cursor: pointer;
    width: ${({ width }) => width ? `${width}%` : 'auto'};
    font-size: 0.9em;
    text-align: center;
    align-items: center;
`;

export const Variations = styled.span`
    margin-left: 5px;
    font-size: 0.7em;
    color: ${({ value }) => value > 0 ? 'green' : (value < 0 ? 'red' : 'gray')};
    display: ${({ value }) => value ? 'block' : 'none'};
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

