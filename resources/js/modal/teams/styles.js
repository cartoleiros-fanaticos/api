import styled from 'styled-components';

export const Container = styled.div`
    height: 360px;
    overflow-y: auto;
    overflow-x: hidden;

    @media screen and (max-width:900px){
        height: calc(100vh - 150px); 
    }
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

export const NamePlayer = styled.span`
    color: #666666;
    font-size: 0.7em;
    text-align: left;
`;

