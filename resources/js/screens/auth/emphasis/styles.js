import styled from 'styled-components';

export const Content = styled.div`
    min-height: 600px;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width:900px){    
        justify-content: center;
        flex-direction: column;
    }
`;

export const Group = styled.div`
    width: 48%;

    @media screen and (max-width:900px){    
        width: 100%;
    }
`;

export const Title = styled.strong`
    margin-bottom: 5px;
    display: block;
    color: #333333;
`;

export const List = styled.div`
    border: solid 2px #F68D42;
    border-radius: 0.5em;
    padding: 15px;
`;

export const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

export const Position = styled.small`
    color: #666666;
`;

export const Photo = styled.img`
    width: 48px;
`;

export const Box = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 25%;
`;

export const Text = styled.span`
    font-size: 0.9em;
    color: #666666;  
`;
