import React, { useEffect, useState, useRef } from 'react';
import backButton from 'browser-back-button';
import Loader from 'react-loader-spinner';

import { message, swal_ask, swal_success } from '../../../utils/helpers';
import api from '../../../utils/api';

import Modal from '../../../componets/modal';

import { useNavigate } from "react-router-dom";

import Container from '../../../componets/container';

function Player() {

  const [modal, smodal] = useState(false);

  const [data, sdata] = useState({});

  const [loading, sloading] = useState(false);

  const [waiting, swaiting] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    swaiting(true);

    try {

      let { data } = await api.get('atletas');

      sdata(data);
      swaiting(false);

    } catch (e) {
      message(e);
      swaiting(false);
    };

  }

  const component = () => (
    <span>entrou</span>
  );

  return (
    <Container
      title='Mercado'
      Component={component}
    />
  );
}

export default Player;