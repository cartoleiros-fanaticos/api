import styled from 'styled-components';

export const Container = styled.form.attrs(() => ({
    method: 'PUT'
}))`
    display: grid;
    grid-template-columns: auto 50%;
    grid-gap: 15px;
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

`;

export const Text = styled.strong`
    color: #666;
    font-size: 0.9em;
    margin-bottom: 3px;
`;

export const Input = styled.input`
`;

export const Select = styled.select`
    padding: 10px;
    outline: none;
    border: solid thin #ccc;    
`;

export const Option = styled.option`
    
`;

export const Button = styled.button.attrs(() => ({
    type: 'submit'
}))`
    height: 40px;
    cursor: pointer;
`;

