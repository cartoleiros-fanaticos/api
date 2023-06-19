import styled from 'styled-components';

export const Container = styled.div`
    border: solid thin #ccc;
    padding: 10px;
    margin-right: 10px;
`;

export const Header = styled.div` 
    display: flex; 
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #222;
    text-align: center;

    i {            
        display: none;
    }

    @media screen and (max-width:900px){
        justify-content: space-between;
    
        i {            
            display: block;
            float: right;
            padding-left: 10px;
        }

        i:hover {
            opacity: 0.8;
        }

    }
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    user-select: none;
    color: #F68D42;
    font-size: ${({ size }) => size ? size : '18px' };
    cursor: pointer;
    margin-right: 10px;
`;

export const Title = styled.span` 
    font-size: 13px;
    color: #fff;
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 10px;
    cursor: pointer;
    transition-duration: 0.3s;
    width: 100%;
    border-bottom: dashed thin #F68D42;

    &:hover {
        background-color: #F68D42;
        color: #FFF;
        width: 110%;

        & > i {
            color: #FFF;
        }
    }
`;

export const Text = styled.strong`
    font-weight: 300;
    font-family: Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.9em;
`;
