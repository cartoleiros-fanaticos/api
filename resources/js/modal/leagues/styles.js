import styled from 'styled-components';

export const Container = styled.div`
    height: 360px;
    overflow-y: auto;
    overflow-x: hidden;

    @media screen and (max-width:900px){
        height: calc(100vh - 150px); 
    }
`;

export const Label = styled.label`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border: solid 2px #ccc;
    background-color: #f1f1f1;
    border-radius: 10px;
    text-align: right;
    margin-bottom: 10px;
    color: #666;
`;

export const Input = styled.input.attrs(() => ({
    type: 'search',
    placeholder: 'Digite nome da liga'
}))`
    background-color: transparent;
    width: 100%;
    border: none;
    font-size: 15px;
    outline: none;
    background-color: #f1f1f1;
`;

export const Icon = styled.i.attrs(() => ({
    className: 'material-icons'
}))` 
   color: #666; 
   margin-right: 10px;
`;

export const Title = styled.i`
  font-size: 0.8em;
  color: #999;
  margin: 10px;
  display: block;
`;

export const Item = styled.div`
    position: relative;
    cursor: pointer;
    border-bottom: solid thin #f1f1f1;
    padding: 10px 5px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    display: grid;
    grid-template-columns: 26px 95%;
    grid-column-gap: 10px;

    &:hover {
        background-color: #f1f1f1;
    }
`;

export const Shield = styled.img`
    width: 26px;
    grid-row: 1/3;
`;

export const Name = styled.strong`
    color: #666666;
    font-size: 0.9em;
    text-align: left;
`;

export const Description = styled.span`
    color: #666666;
    font-size: 0.7em;
    text-align: left;
`;

