import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Content = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
`;

export const Main = styled.div`
`;

export const Title = styled.strong`
  display: block;
  margin: auto;
  text-align: center;
  padding: 10px;
  font-size: 1.2em;
`;

export const Description = styled.p`
  display: block;
  margin: auto;
  width: 60%;
  text-align: center;
  color: #666;
  font-size: 0.9em;
`;

export const List = styled.div`
    @media screen and (max-width:900px){
        width: 100%;
        overflow: auto;        
    }
`;

export const Table = styled.table`
    width: 100%;
`;

export const Thead = styled.thead`
    margin-top: 25px;
    border: solid thin #000000;
    padding: 10px;
    color: #000000;
    font-size: 0.9em;
    border-radius: 0.5em;
    cursor: default;
    user-select: none;
`;

export const Tr = styled.tr`
    width: 100%;
    border: solid thin #000000;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5em;
    margin-top: 15px;
    transition-duration: 0.3s;
    cursor: pointer;
    opacity: ${({ compare }) => compare ? 0.2 : 1};
`;

export const Th = styled.th`
    font-size: 0.8em;
    width: 100px;
`;

export const Tbody = styled.tbody`

    tr {

        &:hover{          
            background: #fafafa;
            transform: scale(1.05);
            box-shadow: 0 5px 10px #cccccc;
        }
    }

`;

export const Td = styled.td`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 98.18px;
    text-align: center;
    cursor: pointer;
    font-size: 0.8em;

    &.name {
      display: flex;
      flex-direction: column;
      width: 95px;
    }
`;

export const Image = styled.img`
    width: 26px;
    height: 26px;
`;

export const Name = styled.strong`
    font-size: 0.9em;
`;

export const NameGame = styled.small`
    font-size: 0.8em;
`;



