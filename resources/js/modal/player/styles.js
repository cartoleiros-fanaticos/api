import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 30% auto;
`;

export const Item1 = styled.div`
    width: 100%;
    padding: 10px;
    border: solid thin #cccccc;
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-row: 1/5;
`;

export const Button = styled.a`
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid thin #d95f08;
    color: #d95f08;
    margin: 5px auto;
    padding: auto 5px;
    width: 130px;
    border-radius: 0.3em;
    transition-duration: 0.5s;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        & > i, span {
            color: #fff;
        }

        background-color: #d95f08;

    }
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    color: #fff;
    font-size: 1em;
    background-color: #d95f08;
    padding: 15px 5px;
    margin-right: 10px;
`;

export const Text1 = styled.span`
    font-size: 0.8em;
    font-weight: bold;
`;

export const Name = styled.strong`
    font-size: 0.8em;
    font-weight: bold;
`;

export const Photo = styled.img`
    width: 70%;
    margin: 10px 0;
`;

export const Position = styled.span`
    font-size: 0.8em;
    font-weight: 500;
`;

export const Date = styled(Position)`
    margin-top: 15px;
`;

export const Matches = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
`;

export const Shield = styled.img`
    width: 24px;
`;

export const Logo = styled.img.attrs(() => ({
    src: '../images/logo.png'
}))`
    width: 180px;
    margin-top: 10px;
    width: 35%;
`;

export const Item2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: solid thin red;
`;

export const Title = styled.p`
    display: flex;
    justify-content: center;
`;

export const Text2 = styled.strong`
    font-size: 1.3em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;

    &.analise {      
        color: gold;
        margin-right: 10px;
    }

    &.jogador { 
    }
`;

export const Item3 = styled.div`
    border: solid 5px blue;
`;

export const Item4 = styled.div`
    border: solid 5px yellow;
`;

export const Item5 = styled.div`
    border: solid 5px orange;
`;

export const Item6 = styled.div`
    border: solid 5px pink;
    grid-column: 1/3;
`;


