import React, { useEffect, useState, useRef } from 'react';
import Loader from 'react-loader-spinner';
import { message, swal_ask, swal_success } from '../../utils/helpers';
import api from '../../utils/api';

import {
  Container,
  Label,
  Input,
  Icon,
  Button,
} from './styles';

function recovery() {

  const [data, sdata] = useState({
    email: ''
  });
  
  const [loading, sloading] = useState(false);

  async function enter(e) {

    e.preventDefault();

    sloading(true);

    try {

      await api.post('recuperar-senha', data);
      swal_success('Foi enviado para seu email um link de recuperação.');
      sloading(false);

    } catch (e) {
      message(e);
      sloading(false);
    };
  }

  return (
    <Container onSubmit={enter}>
      <Label>
        <Input type="email" required onChange={(e) => sdata({ email: e.target.value })} value={data.email} placeholder="Digite seu email" />
        <Icon>person</Icon>
      </Label>
      <Button>
        {loading ? <Loader visible={true} type="TailSpin" color="#fff" height={30} width={30} /> : <span>RECUPERAR</span>}
      </Button>
    </Container>
  );
}

export default recovery;