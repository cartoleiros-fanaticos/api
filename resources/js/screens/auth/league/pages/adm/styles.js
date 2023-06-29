import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Content = styled.div`
  position: relative;
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
    width: 19%;
    height: 200px;
    padding: 10px;
    margin: 1%;
    transition-duration: 0.5s;
    cursor: pointer;
    text-decoration: none;

    @media screen and (max-width:900px){
        width: 23%;
    }

    @media screen and (max-width:600px){
        width: 46%;
        margin: 2%
    }

    @media screen and (max-width:400px){
        width: 99%;
        margin: 1%
    }

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


