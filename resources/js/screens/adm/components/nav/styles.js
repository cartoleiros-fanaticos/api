import styled from 'styled-components';
import { NavLink } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    padding: 10px;
    background-color: #f1f1f1;  
    height: 100vh;
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

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    margin-right: 15px;;
`;

export const Text = styled.strong``;

