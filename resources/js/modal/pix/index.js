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
    const [pix, spix] = useState({
        "qrcode": "data:image/jpeg;base64,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",
        "code_pix": "00020126580014br.gov.bcb.pix01367868f661-de0f-4513-9127-a8339b54888d520400005303986540510.005802BR5922JOSE_WEDSON_DOS_SANTOS6008Maragogi62240520mpqrinter565960646176304D45F",
        "email": "wedsons949@gmail.com",
        "transacao": 10
    });

    const [loop, sloop] = useState();
    const [loading, sloading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        sloading(true);

        try {

            const { data: { transacao, qrcode, code_pix } } = await api.get(`cobranca-pix/${id}`);

            spix({ transacao, qrcode, code_pix });

            const loop = setInterval(async () => {

                const { data } = await api.get(`verificar-pix?id=${transacao}`);


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