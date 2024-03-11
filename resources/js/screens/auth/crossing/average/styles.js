import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Content = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 40px;
    user-select: none;

    @media screen and (max-width:900px){  
       display: flex;
       flex-direction: column;
    }
`;

export const Picker = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto 25px auto;
    grid-column: 1/3;
    width: 100%;

    @media screen and (max-width:900px){  
        flex-direction: column;
    }
`;

export const Box = styled.div`
    position: relative;
    background: #F68D42;
    color: #000;
    padding: 10px;
    width: 22%;
    text-align: center;
    font-weight: bold;
    border-radius: 0.3em;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover ul {
        visibility: visible;
        height: 280px;
    }

    @media screen and (max-width:900px){  
        width: 100%;
        margin-bottom: 10px;
        position: static;
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: 500;
`;

export const Title = styled.span`

`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
`;

export const List = styled.ul`
    height: 0;
    overflow: hidden;
    visibility: hidden;
    transition: all .3s ease-in-out;
    box-shadow: 0 6px 12px rgba(0,0,0,0.175);
    font-size: 15px;
    margin-top: 5px;
    padding: 5px;
    text-align: left;
    left: 0;
    width: 100%;
    background: #ffffff;
    position: absolute;
    list-style: none;
    border: solid 2px #000;

    @media screen and (max-width:900px){  
        top: 10%;
        width: 90%;
        z-index: 50;
        left: 50%;
        margin-left: -45%;
    }
`;

export const Item = styled.li`

    &:not(:last-child) {
        border-bottom: solid thin #636363;
    }

    padding: 10px 5px;
    font-weight: 500;
    &:hover {
        background: #f1f1f1;
    }
`;

export const ContainerTeams = styled.div`
    width: 100%;
`;

export const Texts = styled.div`
    text-align: center;
    margin: 25px 0;
`;

export const Text1 = styled.span`
    color: #F68D42;
`;

export const Text2 = styled.strong`
    border: solid 2px #000;
    padding: 5px;
    margin: 0 5px;
`;

export const Download = styled.a`
    margin-left: 5px;
    padding: 8px;
    color: #f1f1f1;
    text-decoration: none;
    font-size: 0.9em;
    background-color: #23d18b;
    transition-duration: 0.3s;
    cursor: pointer;
    &:hover {
        background: #1faf8b;
    }

    @media screen and (max-width:900px){  
        margin: auto;
        width: 50%;
        margin-top: 25px;
        display: block;
    }
`;

export const ListTeams = styled.div`
    border: solid 2px #F68D42;
    border-radius: 0.5em;
    padding: 15px 15px 5px 15px;
`;

export const Teams = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

export const Values = styled.div`
    justify-content: space-between;
    width: 40%;
    display: flex;
    align-items: center;
`;

export const Shield = styled.img`
    width: 26px;
`;

export const Private = styled(Link).attrs(() => ({
    title: 'Clique e seja sócio e tenha acesso a todas opção'
}))`
    width: 35px;
    padding: 2px 5px;
    background-color: #f0cc12;
    color: #fff;
    font-size: 0.6em;
    margin: 0 10px;
    cursor: pointer;
    text-align: center;
    transition-duration: 0.3s;
    text-decoration: none;

    &:hover {
        transform: scale(1.2);
    }
`;

export const Value = styled.span`
    padding: 2px 12px;
    margin: 0 10px;
`;

export const Versus = styled.span`
    display: flex;
    align-items: center;
`;

export const Total = styled.span`
    display: flex;
    align-items: center;

    i {
        margin-left: 7px;
        font-size: 20px;
        color: green;
        cursor: pointer;
    };

    a {
        margin: auto;
    }
`;

export const Obs = styled.p`
    color: #333;
    display: block;
    text-align: center;
    margin: 25px auto 15px auto;
    font-size: 0.9em;
    width: 100%;
    grid-column: 1/3;
`;

export const Tips = styled.div`
    margin-top: 20px;
    border: solid 2px #F68D42;
    padding: 15px;
    border-radius: 0.5em;
    width: 100%;
    grid-column: 1/3;
`;

export const TipsTitle = styled.h4`
    margin-bottom: 10px;
`;

export const Text3 = styled.p`
    font-size: 0.9em;
`;

export const Message = styled.div`
    display: block;
    text-align: center;
    margin: 35px auto;
    color: #999;
    font-size: 0.9em;
    user-select: none;  
    grid-column: 1/3;
`;





