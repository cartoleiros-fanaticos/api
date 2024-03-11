import styled from 'styled-components';

export const Content = styled.div`
    position: relative;
    min-height: 500px;
`;

export const List = styled.div`
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width:900px){ 
        display: grid;
        grid-template-columns: 46% 46%;
        grid-gap: 15px;
    }
`;

export const Item = styled.div`
    border: solid 1px #ccc;
    color: #999;
    width: 18%;
    padding: 7px 12px;
    margin-bottom: 15px;
    border-radius: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition-duration: 0.5s;
    cursor: pointer;

    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-row-gap: 10px;
    align-items: center;

    &:hover {
        transform: scale(1.2);
    }

    @media screen and (max-width:900px){ 
        width: 100%;
    }
`;

export const Date = styled.span`
    font-size: 0.9em;
    grid-column: 1/6;
    display: block;
    text-align: center;
`;

export const Shield = styled.img`
    width: 35px;
`;

export const Text = styled.span`
    color: #636363;
    font-size: 1.2em;
`;

export const Button = styled.a`
    display: block;
    padding: 5px;
    background-color: #23d18b;
    color: #fff;
    font-size: 0.7em;
    border-radius: 0.3em;
    text-align: center;
    margin: auto;
    width: 70%;
    transition-duration: 0.3s;
    grid-column: 1/6;
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

