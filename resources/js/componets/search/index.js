import React from 'react';

import {
    Container,
    Icon,
    Input,
} from './styles';

function search({ width = '50%', icon, placeholder, onFocus = () => {}, onKeyUp = () => {}, onChange = () => {} }) {
    return (
        <Container width={width}>
            <Icon>{icon}</Icon>
            <Input
                placeholder={placeholder}
                onFocus={onFocus}
                onKeyUp={onKeyUp}
                onChange={onChange}
            />
        </Container>
    );
}

export default search;