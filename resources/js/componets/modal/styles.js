import styled from 'styled-components';

export const Container = styled.div`
    user-select: none;
    background-color: #fff;
    
    width: ${({ width }) => width};
    margin-left: ${({ marginLeft }) => marginLeft};
    height: ${({ height }) => height};

    display: flex;
    flex-direction: column;

    position: fixed;
    z-index: 150;
    left: 50%;
    top: 60%;
    opacity: 0;
    visibility: hidden;

    @media screen and (max-width:900px){
        margin-left: 0;
        left: 0;
        width: 100%;
        height: 100vh;
    } 
`;

export const Screen = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 125;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    opacity: 0;
    visibility: hidden;    
`;

export const Header = styled.header`
    display: grid;
    grid-template-columns: 24px auto 24px;
    align-items: center;
    background-color: #222;
    color: #fff;   
    padding: 10px; 
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    cursor: default;
    color: ${({ color }) => color};
`;

export const Title = styled.span`
    color: #fff;  
    margin-left: 15px;
`;

export const Content = styled.div`
    padding: 5px;
    min-height: 450px;
    margin: 5px;    
    overflow-y: auto;
    overflow-x: hidden;

    @media screen and (min-width:900px){        

        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px #000;
            background-color: #f1f1f1;
        }

        &::-webkit-scrollbar {
            width: 7px;
            background-color: #000;
            margin-left: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #000;
        }

    }
`;