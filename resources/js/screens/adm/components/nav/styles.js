import styled from 'styled-components';
import { NavLink } from "react-router-dom";

export const Header = styled.div`
    background: #000000;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    z-index: 50;
    top: 0;
    display: none;

    @media screen and (max-width:900px){
        display: flex;
    }
`;

export const Ico = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    cursor: pointer;
    color: #F68D42;
    font-size: 36px; 
`;

export const Logo = styled.img.attrs(() => ({
    src: `${location.origin}/images/favicon.png`
}))`
    height: 25px;  
`;

export const Container = styled.div`
    width: 100%;
    padding: 10px;
    background-color: #f1f1f1;  
    height: 100vh;
    transition-duration: 0.3s;

    @media screen and (max-width:900px){

        width: 65%;
        position: absolute;
        top: 0;
        left: -65%;
        z-index: 150;

    }
`;

export const Avatar = styled.img`
    border-radius: 50%;
    display: block;
    margin: 25px auto;
    width: 180px;
`;

export const List = styled.div``;

export const Item = styled(NavLink)`
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    align-items: center;
    font-size: 0.9em;
    cursor: pointer;
    color: #333;
    text-decoration: none;

    &:hover {
        color: #F68D42;
    }

    &.active {
        color: #F68D42 !important;
    }
`;

export const Button = styled(Item)`

    &.active {
        color: #333 !important;
    }
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    margin-right: 15px;;
`;

export const Text = styled.strong``;

export const Screen = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 100;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    opacity: 0;
    visibility: hidden;    
`;

