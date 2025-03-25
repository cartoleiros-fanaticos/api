import styled from 'styled-components';

export const Container = styled.div`
    background: #000000;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;

    & > i {
        display: none
    }

    @media screen and (max-width:900px){
        & > i {
            display: block;
        }
    } 
`;

export const Screen = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 50;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    opacity: 0;
    visibility: hidden;    
`;

export const Logo = styled.img.attrs(() => ({
    src: `${location.origin}/images/favicon.png`
}))`
    height: 33px;     

    @media screen and (max-width:900px){
        height: 25px;
    }
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    cursor: pointer;
    color: #F68D42;
    font-size: 36px; 
`;

export const Nav = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;    

    @media screen and (max-width:900px){
        width: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        width: 70%;
        position: fixed;
        top: 0;
        left: 0;
        display: block; 
        left: -70%;
        z-index: 100;
        transition-duration: 0.3s;
        height: 100vh;        
        background-color: #fff;
    }
`;

export const Header = styled.div`
    display: none;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    background: #222;
    text-align: center;
    color: #fff;   
    padding-left: 10px; 

    @media screen and (max-width:900px){
        display: flex;

        
        i {          
            font-size: 2em;
        }

    }
`;

export const Title = styled.span`
    text-align: center;
`;

export const Close = styled.i.attrs(() => ({
    className: 'material-icons'
}))`     
    color: red;
    font-size: 30px;
    padding: 5px;
    border-radius: 2em;
    border: solid 2x red;
    cursor: pointer;
`;


export const Item = styled.li`

    position: relative;
    padding: 5px 0;

    &:hover ul.cruzamento {
        visibility: visible;
        height: 110px;
        opacity: 1;
    }

    &:hover ul.parciais {
        visibility: visible;
        height: 150px;
        opacity: 1;
    }

    &:hover ul.ligas {
        visibility: visible;
        height: 150px;
        opacity: 1;
    }

    a.planos, a.painel, a.temporada {
        border: solid 1px #F68D42;
        background-color: #F68D42;
        margin-left: 10px;
        color: #fff !important;

        i {
            color: #fff;
        }

        &:hover {
            background-color: transparent;
            & > i {
                color: #F68D42;
            }
        }

    }

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

        &.active {
            color: #F68D42;
        }
                    
    }

    @media screen and (max-width:900px){

        padding: 0;

        &:hover ul.cruzamento {
            height: 144px;
        }

        &:hover ul.parciais {
            height: 192px;
        }

        &:hover ul.ligas {
            height: 192px;
        }

        a.planos {
            border: none;
            background-color: transparent;
            margin-left: 0;
            color: #000 !important;

            i {
                color: #F68D42;
            }
        }

        a.painel {
            border: none;
            background-color: transparent;
            margin-left: 0;
            color: #000 !important;

            i {
                color: #F68D42;
            }
        }        

        a.temporada {
            border: none;
            background-color: transparent;
            margin-left: 0;
            color: #000 !important;

            i {
                color: #F68D42;
            }
        }
        
        & > a {
            justify-content: flex-start;
            padding: 15px 10px;
            font-size: 0.9em;
            color: #000;
            border-bottom: solid thin #f1f1f1;

            & i {
                margin-right: 10px;
                font-size: 1.3em;
            }           

            &:hover {
                color: #F68D42 !important;
            }
        }
    }

`;

export const Select = styled.select`
    padding: 6px;
    border: none;
    margin-left: 5px;
`;

export const Option = styled.option`
`;

export const ButtonLink = styled.a.attrs(() => ({
    href: '#!'
}))`
    text-decoration: none;
`;

export const SubItem = styled.ul`
    top: 35px;
    position: absolute;
    background-color: #000000;
    width: 220px;
    height: 0;
    visibility: hidden;
    transition-duration: 0.3s;
    opacity: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    @media screen and (max-width:900px){

            position: static;
            background-color: #fff;

            & a {
                justify-content: flex-start;
                padding: 15px 10px;
                font-size: 0.9em;
                color: #000;
                border-bottom: solid thin #f1f1f1;
    
                & i {
                    margin-right: 10px;
                    font-size: 1.3em;
                }
    
                &:hover {
                    color: #F68D42;
                }
            }

        }
`;

