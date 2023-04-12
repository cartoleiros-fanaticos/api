import styled from 'styled-components';

export const Container = styled.form`
  
`;

export const Match = styled.div`
    display: grid;
    grid-template-columns: 48% auto 48%;
    grid-gap: 5px;
    border: solid thin red;
`;

export const Local = styled.div`
    border: solid thin red;
    grid-column: 1/4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Time = styled.small``;

export const Address = styled.strong``;

export const Team = styled.div`
    border: solid thin red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Shield = styled.img``;

export const TeamName = styled.strong`
`;

export const Versus  = styled.strong`
border: solid thin red;
`;
