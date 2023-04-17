import React from 'react';

import {
    Container,
    Icon,
    Input,
} from './styles';

function search({ icon, placeholder, onFocus = () => {}, onKeyUp = () => {}, onChange = () => {} }) {
    return (
        <Container>
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