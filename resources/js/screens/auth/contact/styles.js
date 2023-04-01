import styled from 'styled-components';

export const Content = styled.div`
    margin: 30px 0;
`;

export const Form = styled.form`
    width: 60%;
    margin: auto;    

    @media screen and (max-width:900px){
        width: 90%;
    }
`;

export const Label = styled.label`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border: solid 2px #ccc;
    background-color: #f1f1f1;
    border-radius: 10px;
    text-align: right;
    margin-bottom: 10px;
    color: #666;

    input {
        width: 100%;
        border: none;
        font-size: 15px;
        outline: none;
        background-color: #f1f1f1;
    }
`;

export const Input = styled.input`
    background-color: transparent;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
   color: #666; 
   margin-right: 10px;
`;

export const Textarea = styled.textarea.attrs(() => ({
    rows: 5,
    placeholder: 'Sua mensagem'
}))`
    width: 100%;
    padding: 15px;
    border: solid 2px #ccc;
    background-color: #f1f1f1;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const Button = styled.button.attrs(() => ({
    type: 'submit'
}))`
    outline: none;
    width: 40%;
    height: 50px;
    display: block;
    margin: 15px auto;
    background-color: #ff7e47;
    color: #f1f1f1;
    font-size: 1em;
    border: solid 3px #d95f08;
    border-radius: 25px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.5s;
    color: #f1f1f1;
    font-weight: bold;
    &:hover {
        background-color: #d95f08;
    }
`;


