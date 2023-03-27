import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const Loading = styled.div`  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 150px;
    width: 150px;
    z-index: 100;
    left: 50%;
    top: 50%;
    margin-left: -75px;
    margin-top: -75px;
`;

export const Text = styled.p` 
    margin-top: 15px;
`;

export const Content = styled.div`
    width: 82%;
    margin: 60px auto 0 auto;
    padding: 20px 10px;
    min-height: 600px;
`;

export const Title = styled.header`
    padding: 10px;
    width: 250px;
    margin: auto;
    border: solid 2px #F68D42;
    border-radius: 0.3em;
    font-size: 1.2em;
    text-align: center;
`;
