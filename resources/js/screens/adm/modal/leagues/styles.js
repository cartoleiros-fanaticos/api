import styled from 'styled-components';

export const Container = styled.form.attrs(() => ({
    method: 'PUT'
}))`
    display: grid;
    grid-template-columns: auto 50%;
    grid-gap: 15px;

    overflow: auto;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
        padding: 10px;
        outline: none;
        border: solid thin #ccc;
    }

    &:nth-child(9) {
        grid-column-start: 1;
        grid-column-end: 3;    
    }

`;

export const Add = styled.a`
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #000;
    border: solid thin #999;
    font-size: 0.8em;
    flex: 1;

    &:hover {
        background-color: #999;
        color: #fff;
    }
`;

export const Item = styled.div`
    width: 100%;    
    
    input {
        width: 100%;
    }

    button {
        width: 100%;
    }

    display: grid;
    grid-template-columns: 70% auto;   
    grid-column-gap: 10px;
`;

export const Clear = styled.a` 
    text-decoration: none;
    display: block;
    margin: 10px auto;
    font-size: 0.85em;
    cursor: pointer;
    color: blue;

    &:hover {
        text-decoration: underline;
    }
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    grid-column-start: 1;
    grid-column-end: 3;

    p {
        font-size: 0.85em;
        display: block;
        margin-top: 5px;
        padding: 3px 10px;
        color: #333;
        border: solid thin #ccc;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const Text = styled.strong`
    color: #666;
    font-size: 0.9em;
    margin-bottom: 3px;
`;

export const Input = styled.input`
`;

export const Select = styled.select`
    padding: 9.5px 10px;
    outline: none;
    border: solid thin #ccc;    
`;

export const Option = styled.option`
    
`;

export const Button = styled.a`
    height: 40px;
    cursor: pointer;
`;

