import styled from 'styled-components';

export const Content = styled.div`
    display: grid;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`;

export const Thumbnails = styled.div`
    padding: 10px;
    border: solid thin #f1f1f1;
    cursor: pointer;
    transition-duration: 0.5s;
    background-color: #fff;
    width: 24%;
    margin-bottom: 10px;

    &:hover {
        transform: scale(1.2);
    }

    @media screen and (max-width:900px){
        width: 32.5%;
        font-size: 0.9em;
    }

    @media screen and (max-width:600px){
        width: 48.5%;
    }

    @media screen and (max-width:400px){
        width: 100%;
    }
`;

export const Image = styled.img`
    width: 100%;

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

