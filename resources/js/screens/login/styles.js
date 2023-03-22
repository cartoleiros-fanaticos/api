import styled from 'styled-components';
import { Link as A } from "react-router-dom";

export const Container = styled.div`
    color: #f1f1f1;
    width: 100%;
    height: 100vh;
    background: url('images/fundo.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.img.attrs(() => ({
    src: 'images/logo.png'
}))`
    width: 180px;
`;

export const Form = styled.form`
    width: 35%;
    padding: 50px;

    @media screen and (max-width:900px){
		width: 90%;
		padding: 30px 25px;
    }
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
    color: #f1f1f1;
    font-size: 15px;
    outline: none;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    
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

export const Text = styled.p`
    color: #f1f1f1;
    text-align: center;
    font-size: 0.95;
    letter-spacing: 1px;
    margin-bottom: 5px;
`;

export const Link = styled(A)`
    color: #F68D42;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

