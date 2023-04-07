import styled from 'styled-components';

export const Container = styled.div`     
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const PixImage = styled.img.attrs(() => ({
    src: '/images/pix.png'
}))`
    width: 90px;
    height: 90px;
    margin: 15px auto 10px auto;
`;

export const Title = styled.strong`
    font-size: 13px;
    font-weight: 500;
    margin: 11px;
`;

export const TitleCode = styled.strong`
    font-size: 13px;
    font-weight: 500;
    margin: 11px;
    display: none;

    @media screen and (max-width:900px){
        display: block;   
    }
`;

export const TitleQrcode = styled.strong`
    font-size: 13px;
    font-weight: 500;
    margin: 11px;

    @media screen and (max-width:900px){
        display: none;   
    }
`;

export const ContainerCodePix = styled.div`
    display: none;
    width: 80%;

    @media screen and (max-width:900px){
        display: block;   
    }
`;

export const Pix = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    background-color: #f1f1f1;
    border: solid thin #ccc;
    cursor: pointer;    
    &:hover {
        opacity: 0.8;
    }
`;

export const QrCode = styled.img`

    width: 150px;

    @media screen and (max-width:900px){
        display: none;   
    }
`;

export const Obs = styled.p`
    font-size: 0.8em;
    margin: 10px auto 5px auto;
`;

export const IconPix = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    padding: 8px;
    background-color: #ccc;
    color: #f1f1f1;
    font-size: 1.3em;
`;

export const TextPix = styled.span`
    text-decoration: none;
    padding: 10px;
    font-size: 0.8em;
    padding-left: 8px;
    padding-right: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
`;