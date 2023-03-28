import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 30% auto;
    grid-column-gap: 10px;
    grid-row-gap: 10px;

    @media screen and (max-width:900px){
        display: flex;
        flex-direction: column;
    }
`;

export const Item1 = styled.div`
    width: 100%;
    padding: 10px;
    border: solid thin #cccccc;
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-row: 1/6;
`;

export const Button = styled.a`
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid thin #d95f08;
    color: #d95f08;
    margin-bottom: 10px;
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

    @media screen and (max-width:900px){
        height: 35px;
        width: 170px;
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

@media screen and (max-width:900px){
    font-size: 0.9em;
}
`;

export const Name = styled.strong`
    font-size: 0.8em;
    font-weight: bold;
`;

export const Photo = styled.img`
    width: 50%;
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
    display: grid;
    grid-template-columns: auto auto auto;
    border: solid thin #cccccc;
    padding: 0 10px 10px 10px;
`;

export const Legend = styled.p`
    grid-column: 1/4;
    padding: 5px;
    font-size: 0.7em;
    margin: 0 5px 5px 5px;
    border-bottom: solid thin #cccccc;
`;

export const Box = styled.p`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
`;

export const Label = styled.strong`
`;

export const Value = styled.span`  
    margin: 5px 0;  
`;

export const QtdeMatches = styled.small`
    font-size: 0.8em;
    color: #666666;
`;


export const Item4 = styled(Item3)`
`;

export const Item5 = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid thin #cccccc;
    padding: 10px;
`;

export const Scout = styled.span`
    font-weight: bold;
    font-size: 0.7em;
    color: ${({ type }) => type === 'Positivo' ? 'green' : 'red' };

    @media screen and (max-width:900px){
        font-size: 0.5em;
    }
`;

export const Item6 = styled.div`
    border: solid thin #cccccc;
    padding: 10px;
`;

export const Description = styled.p`
    font-size: 0.8em;
    text-indent: 35px;
`;

export const Item7 = styled.div`
    grid-column: 1/3;
`;


