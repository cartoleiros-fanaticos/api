import styled from 'styled-components';

export const Container = styled.label`
    width: ${({ width }) => width };
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    border: solid 2px #ccc;
    background-color: #f1f1f1;
    border-radius: 10px;
    text-align: right;
    margin: auto;
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
}))`
    background-color: transparent;
    width: 100%;
    border: none;
    font-size: 0.9em;
    outline: none;
    padding: 10px 5px;
    background-color: #f1f1f1;
`;
