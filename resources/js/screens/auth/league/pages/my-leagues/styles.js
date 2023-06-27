import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Content = styled.div`
  position: relative;
  display: flex;
`;

export const Table = styled.table`
  width: 100%;
  font-size: 0.9em;
`;  

export const Thead = styled.tbody`
`;

export const Th = styled.td`
  padding: 10px;
  text-align: center;
  align-items: center;
  color: #666;
  font-weight: 500;
`;

export const Tbody = styled.tbody`
  & tr:nth-child(odd) {
    background-color: #f1f1f1;
  }
`;

export const Tr = styled.tr`
`;

export const Td = styled.td`
  padding: 5px;
  text-align: center;
  align-items: center;
  color: #666;
  font-size: 0.9em;
`;
