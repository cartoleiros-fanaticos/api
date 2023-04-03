import React from 'react';

import { Container } from './styles';

function scouts({ data }) {
    
      return (
        <Container>
            {JSON.stringify(data)}
        </Container>
      );
}

export default scouts;