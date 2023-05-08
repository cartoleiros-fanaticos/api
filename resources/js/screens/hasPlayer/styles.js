import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Content = styled.div`
    padding: 0 10px;
`;

export const Header = styled.div`
    background-color: #000;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`;

export const Logo = styled.img.attrs(() => ({
    src: '../../../images/favicon.png'
}))`
    height: 33px;     

    @media screen and (max-width:900px){
        height: 25px;
    }
`;

export const Player = styled.div`
    display: flex;
    padding: 10px;
`;

export const Photo = styled.img`
    width: 60px;
`;

export const Info = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 15px;
`;

export const Nickname = styled.span`
    font-size: 0.9em;
`;

export const Club = styled.span`
    font-size: 0.9em;
`;

export const Position = styled.span`
    font-size: 0.9em;
`;

export const Share = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
    font-size: 2.5em;
    color: #000000; 
`;

export const Partial = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-top: solid thin #cccccc;
    border-bottom: solid thin #cccccc;
`;

export const Text = styled.strong`
    font-size: 0.9em;
`;

export const Score = styled.strong`
    font-size: 0.9em;
    color: ${({ value }) => value > 0 ? 'green' : (value < 0 ? 'red' : 'gray' ) };
`;

export const Tabs = styled.div`
    display: flex;
`;

export const Tab = styled.a`
    flex: 1;
    padding: 15px;
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    transition-duration: 0.3s;
    margin-top: 1px;
    color: ${({ active, name }) => active === name ? '#ff7705' : '#cccccc'}; 
    cursor: pointer;
    user-select: none;

    &:hover {
        text-decoration: none;
        color: #ff7705;
    }
`;

export const List = styled.div`
    width: 100%;
`;

export const Item = styled.a`
    display: flex;
    border-bottom: solid thin #cccccc;
    padding: 10px;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const Team = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const Capitain = styled.img.attrs(({ capitain }) => ({
    src: capitain === 'Sim' ? '../../../images/capitao_sim.png' : '../../../images/capitao_nao.png'
}))`
    width: 18px;
    margin-right: 10px;
`;


export const Shields = styled.img`
  width: 32px;
  margin: 10px 10px 10px 5px;
`;

export const Profile = styled.div``;

export const NameGame = styled.div`
    color: #666;
    white-space: nowrap;
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: 0.9em;
`;

export const Name = styled.div`
    color: #999;
    white-space: nowrap;
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8em;
`;

export const PartialItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.9em;
`;
