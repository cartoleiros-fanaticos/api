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
  font-size: 0.9em;
  border: solid thin #f1f1f1;
  box-shadow: 2px 2px 10px 5px #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23%;
  height: 200px;
  margin: 1%;
  transition-duration: 0.5s;
  cursor: pointer;
  text-decoration: none;
  color: #666;

  &:hover {
      transform: scale(1.1);
  }
`;

export const Header = styled.div`
  background-color: black;
  color: #fff;
  width: 100%;
  padding: 10px;
  text-align: center;
`;

export const Description = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 0.9em;
`;

export const Image = styled.img.attrs(() => ({
  src: '../../../images/dolar.png'
}))`
  width: 48px;
`;

export const Total = styled.strong``;

export const Teams = styled.span``;

export const Footer = styled.div`
  background-color: #F68D42;
  color: #fff;
  width: 100%;
  padding: 10px;
  text-align: center;
`;
