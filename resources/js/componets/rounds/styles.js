import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 60px;
    padding: 10px 0;
    grid-column: 1/3; 

    @media screen and (max-width:900px){ 
        grid-column: 1/1;
    } 
`;

export const List = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    transition-duration: 0.5s;
`;

export const Item = styled.a`
    width: 100.398px;
    height: 40px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid thin #f1f1f1;
    color: #ccc;
    font-weight: bold;
    cursor: pointer;
    transition-duration: 0.3s;
    background-color: #fff;

    &.active {
        color: #fff;
        background-color: #F68D42;
        border: solid thin #F68D42;
    }

    &:hover {
        transform: scale(1.2);
        color: #fff;
        background-color: #F68D42;
        border: solid thin #F68D42;
    }

    @media screen and (max-width:900px){
        width: ${({ width }) => (width - 20) / 7}px;
    }
`;
