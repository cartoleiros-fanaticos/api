import React from 'react';

import Loading from '../../../../componets/loading';
import Nav from '../../components/nav';

import {
    Container,
    Main,
    Content,
} from './styles';

function container({ data, component, loading }) {

    return (
        <Container>
            {
                loading ?
                    <Loading />
                    :
                    <Main>
                        <Nav data={data} />
                        <Content>
                            {component}
                        </Content>
                    </Main>
            }
        </Container>
    );
}

export default container;