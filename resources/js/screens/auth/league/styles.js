import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Content = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
`;

export const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Item = styled(Link)`
    border: solid thin #f1f1f1;
    border-radius: 0.5em;
    box-shadow: 2px 2px 10px 5px #f1f1f1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 23%;
    padding: 10px;
    margin: 1%;
    transition-duration: 0.5s;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        transform: scale(1.1);
    }
`;

export const Photo = styled.img.attrs(({ foto }) => ({
    src: foto ? `../../images/upload/ligas/${foto}` : '../../images/upload/ligas/avatar.png'
}))`
    border-radius: 50%;
    width: 100px;
    height: 100px;
`;

export const Name = styled.strong`
    font-size: 0.9em;
`;


