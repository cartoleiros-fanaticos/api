import styled from 'styled-components';

export const Content = styled.div`
  
`;

export const List = styled.div`

`;

export const Item = styled.div`
    padding: 10px;
    border-bottom: solid thin #cccccc;
    display: grid;
    grid-template-columns: 35px auto 60%;
    grid-column-gap: 25px;
    align-items: center;
`;

export const Photo = styled.img`
    width: 35px;
    height: 35px;
`;

export const Name = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Text1 = styled.strong`
    font-size: 0.8em;
`;

export const Text2 = styled.span`
    font-size: 0.8em;
`;

export const Score = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
`;

export const Scouts = styled.div`
    display: flex;
    justify-content: flex-end;;
    width: 100%;
`;

export const Scout = styled.small`
    font-size: 0.7em;
    margin-left: 5px;
    color: ${({ type }) => type > 'Positivo' ? 'green' : 'red'};
    display: ${({ value }) => value > 0 ? 'block' : 'none'};
`;

