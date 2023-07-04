import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Tabs = styled.div`
  display: flex;
  margin: 0 10px;  
`;

export const Tab = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #000;
  color: #000;
  font-size: 0.9em;
  cursor: pointer;
  transition-duration: 0.3s;

  @media screen and (max-width:900px){
      height: 35px;
  }

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export const Icon = styled.i.attrs(() => ({
  className: 'material-icons'
}))` 
  user-select: none;
  color: gold;
  font-size: 24px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center; 

  @media screen and (max-width:900px){
    height: 35px;
    width: 35px;
    font-size: 16px;
  }

`;

export const Text = styled.strong`
  display: block;
  width: 100%;
  text-align: center;

  @media screen and (max-width:900px){
    font-size: 0.85em;
      margin: 0 1%
  }
`;

export const List = styled.div`
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
  width: 19%;
  height: 200px;
  margin: 1%;
  transition-duration: 0.5s;
  cursor: pointer;
  text-decoration: none;
  color: #666; 

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
  src: '../../images/dolar.png'
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
