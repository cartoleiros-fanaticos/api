import styled from 'styled-components';

export const Content = styled.div`
  
`;

export const Box = styled.div`
    margin: auto;
    width: 400px; 
`;

export const Title = styled.small`     
    position: relative;
    background-color: #F68D42;
    color: #000000;
    padding: 5px 7px;
    font-weight: bold;
    font-size: 0.8em;
    top: 10px;
    left: 50%;
    width: 100px;
    margin-left: -50px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Plans = styled.div`
    display: flex;
    justify-content: center;
`;

export const Plan = styled.div`
    padding: 10px;
    border: solid 1px #666;
    text-align: center;
    width: 50%;
    margin: auto 10px;

`;

export const Name = styled.h3`
    text-align: center;
    font-size: 1.1em;
    display: block;
    margin: 10px 0 15px 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    & span {
        color: #F68D42;
    }
`;

export const Values = styled.div`
    background-color: #000;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
        color: #ffffff;
        margin: 0;
        display: block;
        font-size: 0.9em;
        font-weight: 500;
        span {
            text-decoration: line-through;
        }
    }
`;

export const Value = styled.h2`
    font-size: 0.9em;
    color: #ffffff;
    display: block;
`;

export const Pay = styled.a.attrs(() => ({
    title: 'Clique para gerar o QRCODE PIX.'
}))`
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 500;
    background-color: #F68D42;
    border: solid 1px #F68D42;
    font-size: 0.8em;
    margin-top: 5px;
    cursor: pointer;
    &:hover {
        color: #F68D42;
        background: #ffffff;
    }
`;

export const Text = styled.span`
    display: block;
    color: #F68D42;
`;

export const Bonus = styled.div`
    margin: 25px auto;
    width: 350px ;
    text-align: center;
`;

export const Text1 = styled.h3`
    color: #F68D42;
`;

export const Text2 = styled.p`
    font-size: 0.9em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.div`
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: grid;
    grid-template-columns: 70% 15% 15%;   

    @media screen and (max-width:900px){  
        grid-template-columns: 50% 25% 25%;
    }
`;

export const Text3 = styled.strong`
    text-align: center;

    @media screen and (max-width:900px){  
        font-size: 0.7em;
    }
`;

export const Text4 = styled.strong`
    text-align: center;

    @media screen and (max-width:900px){  
        font-size: 0.7em;
    }
`;

export const List = styled.ul`

`;

export const Item = styled.li`
    border-bottom: solid 1px #F68D42;
    padding: 10px 5px;
    display: grid;
    grid-template-columns: 70% 15% 15%;

    @media screen and (max-width:900px){  
        grid-template-columns: 50% 25% 25%;
    }
`;

export const Label = styled.p`

    @media screen and (max-width:900px){  
        text-align: center;
        font-size: 0.8em;
    }
`;

export const BoxIcon = styled.div`
    text-align: center;
    display: block;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))`  
    color: ${({ color }) => color};
`;




