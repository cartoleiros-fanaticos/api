import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    background-color: #121212;    
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 82%;
    margin: auto;
    padding: 10px;  

    @media screen and (max-width:900px){
        width: 100%;
        padding: 0 10px;
        justify-content: center;
        flex-direction: column;
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    a {
        color: #ccc;
        text-decoration: none;
        margin-bottom: 5px;
        &:hover {
            text-decoration: underline;
        }
    }

    @media screen and (max-width:900px){
        flex-direction: column;
        margin-top: 25px;
    }

`;

export const Title = styled.header`
    color: #f1f1f1;
    margin-bottom: 10px;
`;

export const Items = styled.div`    
    margin-bottom: 10px;
`;

export const Image = styled.img`
    width: 95px;
    display: block;
    margin-bottom: 10px;
`;

export const Label = styled.h3`
    color: #f1f1f1;
    font-size: 0.8em;
    margin-bottom: 5px;
`;

export const Description = styled.p`
    margin-bottom: 5px;
    color: #636363;
    font-size: 0.85em;
`;

export const Copyright = styled.div`
    background-color: #000;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width:900px){
        justify-content: center;
        flex-direction: column;
    }
`;

export const Text = styled.p`
    color: #F68D42;
    font-size: 0.9em;

    @media screen and (max-width:900px){
        text-align: center;
        font-size: 0.85em;
        margin: 5px;
        cursor: default;
    }
`;

