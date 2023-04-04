import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Title = styled.i`
  font-size: 0.8em;
  color: #999;
  margin: 10px;
  display: block;
`;

export const Team = styled.div`
    position: relative;
    cursor: pointer;
    border-bottom: solid thin #f1f1f1;
    padding: 10px 5px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    display: grid;
    grid-template-columns: 26px 95%;
    grid-column-gap: 10px;

    &:hover {
        background-color: #f1f1f1;
    }
`;

export const Shield = styled.img`
    width: 26px;
    grid-row: 1/3;
`;

export const NameTeam = styled.strong`
    color: #666666;
    font-size: 0.9em;
    text-align: left;
`;

export const Name = styled.span`
    color: #666666;
    font-size: 0.7em;
    text-align: left;
`;

export const Remove = styled.span`
    color: red;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    position: absolute;
    right: 15px;
    top: 7px;
    font-size: 0.8em;
    border: solid thin red;
`;

