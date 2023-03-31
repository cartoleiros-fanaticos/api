import styled from 'styled-components';

export const Content = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 15px;
    margin-top: 25px;

    @media screen and (max-width:900px){
        grid-template-columns: auto auto auto;
    }

    @media screen and (max-width:600px){
        grid-template-columns: auto auto;
    }

    @media screen and (max-width:400px){
        grid-template-columns: auto;
    }
`;

export const Thumbnails = styled.div`
    padding: 10px;
    border: solid thin #f1f1f1;
    cursor: pointer;
    transition-duration: 0.5s;

    &:hover {
        transform: scale(1.2);
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 172px;

    @media screen and (max-width:900px){
        font-size: 120px;
    }
`;

export const Title = styled.h3`
    font-size: 0.85em;
    text-align: center;
    text-transform: uppercase;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 2; 
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;

    @media screen and (max-width:900px){
        font-size: 0.8em;
    }
`;

