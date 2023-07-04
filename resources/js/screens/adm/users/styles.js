import styled from 'styled-components';

export const Container = styled.div`
`;

export const Main = styled.div`  
    height: 100vh;
    display: grid;
    grid-template-columns: 250px auto;
`;

export const Content = styled.div`
    padding: 10px;
    height: auto;
`;

export const Header = styled.div`  
    padding: 10px;
    color: #f1f1f1;
    height: 50px;
    margin-bottom: 15px;
    background-color: #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 150px;
    color: #333;
    align-items: center;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
`;

export const Label = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 5px;
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
    margin: 10px auto;
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


