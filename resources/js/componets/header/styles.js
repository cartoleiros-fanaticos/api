import styled from 'styled-components';

export const Container = styled.div`
    background: #000000;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 150;
    
    & > i {
        cursor: pointer;
        color: #F68D42;
        font-size: 36px;
        display: none;
    }  
`;

export const Logo = styled.img.attrs(() => ({
    src: '../images/logo.png'
}))`
    width: 80px;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    
`;

export const Nav = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

export const Item = styled.li`

    & > a {
        color: #f1f1f1;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        font-size: 0.85em;
        cursor: pointer;

        i {
            margin-right: 5px;
            font-size: 1.3em;
        }

        &:hover {
            color: #F68D42;
        }
                    
    }

`;

export const SubItem = styled.div`
    top: 45px;
    position: absolute;
    background-color: #000000;
    width: 250px;
    height: 0  ;
    visibility: hidden;
`;

