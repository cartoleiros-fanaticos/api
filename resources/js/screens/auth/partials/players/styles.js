import styled from 'styled-components';

export const Content = styled.div`
  
`;

export const List = styled.div`

`;

export const Label = styled.label`
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    border: solid 2px #ccc;
    background-color: #f1f1f1;
    border-radius: 10px;
    text-align: right;
    margin: 0 auto 15px auto;
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
    placeholder: 'Digite nome do atleta'
}))`
    background-color: transparent;
    width: 100%;
    border: none;
    font-size: 0.9em;
    outline: none;
    padding: 10px 5px;
    background-color: #f1f1f1;
`;

export const ButtonInplay = styled.a`
    border: solid 2px brown;
    border-radius: 5px; 
    justify-content: center;
    align-items: center;   
    width: 80px;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
