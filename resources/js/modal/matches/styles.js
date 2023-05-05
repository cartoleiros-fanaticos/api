import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Title = styled.p`
    display: block;
    text-align: center;
    width: 80%;
    font-size: 0.9em;
    padding: 5px;
    margin: 10px auto;  
`;

export const Item = styled.div`
    padding: 5px;
    border: solid thin #ccc;
    margin-bottom: 20px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
`;

export const Shield = styled.img`
    width: 30px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Teams = styled.strong`
    font-weight: 500;
    font-size: 0.9em;
`;

export const Time = styled.time`
    font-size: 0.8em;
    color: #666;
`;

export const Content = styled.div`
    border: dashed thin #999;
    padding: 5px;
`;

export const Score = styled.strong`
    font-size: 0.8em;
    color: ${({ value }) => value > 0 ? 'green' : 'red'};
`;

export const Total = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 5px 5px 0 5px;
`;

export const Text = styled.div`
    font-size: 0.9em;
`;



