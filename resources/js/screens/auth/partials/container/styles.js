import styled from 'styled-components';

export const Content = styled.div`
    margin: 25px 0;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width:900px){  
        flex-direction: column;
    }
`;

export const Box = styled.div`
    width: 30%;

    @media screen and (max-width:900px){ 
        width: 100%;
        margin-bottom: 15px;
    }
`;

export const Title = styled.h3`
    display: block;
    font-size: 0.9em;
`;

export const Label = styled.label`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border: solid thin #F68D42;
    border-radius: 0.3em;
    margin-top: 5px;
`;

export const Select = styled.select`
    width: 80%;
    outline: none;
    padding: 5px;
    border: none;
    border-bottom: solid thin #cccccc;
    color: #636363;
    background: none;

    @media screen and (max-width:900px){ 
        padding: 10px 5px;
    }
`;

export const Option = styled.option`

`;

export const Input = styled.input`
    width: 80%;
    outline: none;
    padding: 5px;
    border: none;
    border-bottom: solid thin #cccccc;
    color: #636363;
    background: none;

    @media screen and (max-width:900px){ 
        padding: 10px 5px;
    }
`;

export const Button = styled.button`
    width: 15%;
    border: none;
    background: #F68D42;
    color: #f1f1f1;
    cursor: pointer;
    outline: none;
`;

export const Teams = styled.div`
    position: absolute;
    border: solid thin #f1f1f1;
    background: #ffffff;
    padding: 5px;
    left: 50%;
    margin-left: -20%;
    width: 40%;
    max-height: 350px;
    z-index: 100;
    top: -500px;
    transition-duration: 0.3s;
    opacity: 0;

`;


