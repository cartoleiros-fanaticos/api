import React, { useEffect, useState, useRef } from 'react';
import { message, swal_success } from '../../utils/helpers';
import api from '../../utils/api';

import Loading from '../../componets/loading';

import {
    Container,
    PixImage,
    Title,
    TitleCode,
    TitleQrcode,
    QrCode,
    ContainerCodePix,
    Pix,
    Obs,
    IconPix,
    TextPix,
} from './styles';

function pix({ data: { id }, smodal, fnc }) {

    const ref_copy = useRef();
    const [pix, spix] = useState({});

    const [loop, sloop] = useState();
    const [loading, sloading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        sloading(true);

        try {

            const { data: { transacao_id, qrcode, code_pix } } = await api.get(`cobranca-pix/${id}`);

           spix({ transacao_id, qrcode, code_pix });

            const loop = setInterval(async () => {

                const { data } = await api.get(`verificar-pix?id=${transacao_id}`);


                if (data.pago === 'Sim') {
                    fnc(data.user);
                    smodal(false);
                    clearInterval(loop);
                }

            }, 2000);

            sloop(loop);

            sloading(false);

        } catch (e) {
            sloading(false);
            message(e);
        }

    }

    function copyCODE() {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.value = pix.code_pix;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();

        ref_copy.current.style.opacity = 0.9;
        ref_copy.current.style.visibility = 'visible';

        setTimeout(() => {
            ref_copy.current.style.opacity = 0;
            ref_copy.current.style.visibility = 'hidden';
        }, 1000)
    }

    return (
        <Container>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <Title>Cobrança realizada com SUCESSO!</Title>
                        <PixImage />
                        <TitleCode>Clique para copiar o código PIX.</TitleCode>
                        <TitleQrcode>Faça a leitura do qrcode.</TitleQrcode>
                        <QrCode src={pix.qrcode} />
                        <ContainerCodePix>
                            <Pix onClick={copyCODE} title="Clique para copiar o código do QRCODE em seguida cole no seu aplicativo do seu banco.">
                                <IconPix>content_copy</IconPix>
                                <TextPix>{pix.code_pix}</TextPix>
                            </Pix>
                        </ContainerCodePix>
                        <Obs>Obs.: Após o pagamento só aguardar nessa tela.</Obs>
                    </>
            }
        </Container>
    );
}

export default pix;