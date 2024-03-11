import styled from 'styled-components';

export const Content = styled.div`
    min-height: 600px;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 35px;

    @media screen and (max-width:900px){  
        font-size: 0.9em;
        grid-template-columns: auto;
    }
`;

export const Group = styled.div`
    margin-bottom: 25px;
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

export const Message = styled.div`
    display: block;
    text-align: center;
    margin: 35px auto;
    color: #999;
    font-size: 0.9em;
    user-select: none;  
    grid-column: 1/3;
`;

