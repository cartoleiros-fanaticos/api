import styled from 'styled-components';

export const Container = styled.div`
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid thin #cccccc;
    padding: 10px;
`;

export const Label = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Photo = styled.img`
    width: 48px;
    height: 48px;
`;

export const Name = styled.span`
    color: #666;
    font-weight: 500;
    margin: 5px 0;
    font-size: 0.9em;
`;

export const Logo = styled.img.attrs(() => ({
    src: '../images/logo_preta.png'
}))`
    width: 80px;
`;


export const Content = styled.div`
    overflow: auto;
`;

export const Item = styled.div`
    display: flex;
    flex: 1;
    padding: 10px;
    border-bottom: solid thin #ccc;
    align-items: center;
    justify-content: space-around;    
`;

export const Value = styled.span`
    font-size: 0.8em;
    color: #fff;
    text-align: center;
    padding: 5px;
    font-weight: 500;
    width: 20%;
    background-color: ${({ color }) => color};
`;

export const Text = styled.div`
    font-size: 0.7em;
    color: #666;
    font-weight: 500;
    text-align: center;
    width: 30%;
`;

export const Title = styled.h4`
    display: block;
    flex: 1;
    margin: 10px 0;
    padding: 10px;
    text-align: center;
`;


