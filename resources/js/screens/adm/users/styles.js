import styled from 'styled-components';

export const Header = styled.div`  
    padding: 10px;
    color: #f1f1f1;
    margin-bottom: 15px;
    background-color: #f1f1f1;
    display: grid;
    grid-template-columns: auto 200px;
    grid-column-gap: 10px;

    @media screen and (max-width:900px){
        grid-template-columns: auto 180px;        
    }
`;

export const Title = styled.div`
    color: #333;
    align-items: center;
    display: flex;

    @media screen and (max-width:900px){
        font-size: 0.8em;
    }
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    margin-right: 10px;
`;

export const Label = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 5px;

    i {
        color: #666;
    }
`;

export const Input = styled.input.attrs(() => ({
    type: 'search',
    placeholder: 'Digite nome ou email'
}))`
    padding: 5px;
    color: #666;
    outline: none;
    border: none;
    flex: 1;
    background-color: transparent;
`;

export const List = styled.div`
    width: 100%;
    height: calc(100vh - 150px);
    overflow: auto;

    @media screen and (max-width:900px){
        height: calc(100vh - 200px);
    }

    @media screen and (min-width:900px){

        &::-webkit-scrollbar-track{
            background-color: #cccccc;
        }

        &::-webkit-scrollbar{
            width: 5px;
        }

        &::-webkit-scrollbar-thumb{
            background-color: #666; 
        }

    }

    border: solid thin #cccccc;
`;

export const Table = styled.table`
    width: 100%;

    @media screen and (max-width:900px){

        width: 1024px;

    }
`;

export const Thead = styled.thead`
`;

export const Tr = styled.tr``;

export const Th = styled.th`
    padding: 10px 5px;
    text-align: center;
    font-size: 0.9em;
    color: #333;
`;

export const Tbody = styled.tbody`
    & tr:nth-child(odd) {
        background-color: #f1f1f1;
    }
`;

export const Td = styled.td`
    padding: 10px 5px;
    text-align: center;
    font-size: 0.9em;
    color: #333;

    &.action {
        display: flex;
        justify-content: space-around;
    }
`;

export const ActionIcon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: solid 1px #333;
    border-radius: 0.3em;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: #333;
    }
`;

export const Navigator = styled.div`
    display: flex;
    width: 250px;
    margin: 15px auto 0 auto;
    align-items: center;
    justify-content: space-between;
`;

export const NavIcon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: solid 1px #333;
    border-radius: 0.3em;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: #333;
    }
`;

export const NavText = styled.strong`
`;


