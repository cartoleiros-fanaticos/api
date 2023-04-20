import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px;
    border-bottom: solid thin #cccccc;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    opacity: ${({ active }) => active === 'Sim' ? 1 : 0.3 };   

    @media screen and (max-width:900px){
        font-size: 0.9em;
    }
`;

export const Captain = styled.a`
    font-weight: bold;
    width: 20px;
    height: 20px;
    text-align: center;
    padding: 3px 0;
    border-radius: 50%;
    color: #ffffff;
    font-size: 0.8em;
    margin-right: 15px;
    background-color: ${({ captain }) => captain ? '#F68D42' : '#CCC'};
`;

export const Photo = styled.img`
    width: 35px;
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 10px;
`;

export const Name = styled.strong`
    font-size: 0.9em;
`;

export const Position = styled.span`
    color: #999;
    font-size: 0.9em;
`;

export const Score = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 1;
`;

export const Value = styled.span`
    font-weight: 500;
    font-size: 0.8em;
    color: ${({ value }) => value > 0 ? 'green' : (value < 0 ? 'red' : 'gray' ) };
`;

export const Price = styled.span`
    font-size: 0.8em;
    margin: 3px 0;
`;

export const Scouts = styled.div`
    display: flex;
    justify-content: flex-end;;
    width: 100%;
`;

export const Scout = styled.small`
    font-size: 0.7em;
    margin-left: 5px;
    color: ${({ type }) => type === 'Positivo' ? 'green' : 'red'};
    display: ${({ value }) => value > 0 ? 'block' : 'none'};
`;

