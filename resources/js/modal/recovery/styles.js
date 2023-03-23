import styled from 'styled-components';

export const Container = styled.form`
  
`;

export const Label = styled.label`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border: solid 2px #F68D42;
    background: none;
    border-radius: 100px;
    color: #f1f1f1;
    text-align: right;
    margin-bottom: 15px;
`;

export const Input = styled.input`
    width: 100%;
    background: none;
    border: none;
    color: #666;
    font-size: 15px;
    outline: none;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    color: ${({ color }) => color ? color : '#666' };    
`;

export const Button = styled.button.attrs(() => ({
    type: 'submit'
}))`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F68D42;
    color: #f1f1f1;
    font-size: 1em;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    margin-bottom: 15px;
    transition: all 0.5s;
    outline: none;
    &:hover {
        background: #d95f08;
    }
`;
