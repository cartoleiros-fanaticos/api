import React from 'react';
import Loader from 'react-loader-spinner';

import { Loading, Text } from './styles';

function loading({
    type = 'TailSpin',
    text = 'Carregando aguarde.',
    color = '#F68D42',
    height = 40,
    width = 40
}) {
    return (
        <Loading>
            <Loader visible={true} type={type} color={color} height={height} width={width} timeout={15000} />
            <Text>{text}</Text>
        </Loading>
    );
}

export default loading;