import styled from 'styled-components';

export const Container = styled.div`
    background-color: #121212;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 82%;
    margin: auto;
    padding: 10px ;
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
`;

export const Text = styled.p`
    color: #F68D42;
    font-size: 0.9em;
`;

