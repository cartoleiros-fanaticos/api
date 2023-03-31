import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: url('images/fundo.jpg');
    background-position: center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

export const Logo = styled.img.attrs(() => ({
    src: 'images/logo_laranja.png'
}))`
    width: 180px;
    margin-bottom: 50px;
`;


export const Title = styled.h3`
    color: #f1f1f1;
`;

export const Form = styled.form`
    width: 40%;
    padding: 30px 50px;

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
    border: solid 2px #ff7e47;
    background-color: transparent;
    border-radius: 10px;
    color: #f1f1f1;;
    text-align: right;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    width: 100%;
    background-color: transparent;
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
    outline: none;
    width: 50%;
    height: 50px;
    float: right;
    padding: 15px;
    background-color: #ff7e47;
    color: #f1f1f1;
    font-size: 1em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.5s;
    color: #f1f1f1;
    &:hover {
        background-color: #d95f08;
    }
`;
