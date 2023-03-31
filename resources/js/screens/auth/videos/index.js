import React, { useState, useEffect } from 'react';

import { amount, message } from '../../../utils/helpers';
import api from '../../../utils/api';

import ModalVideos from '../../../modal/videos';

import Container from '../../../componets/container';

import {
    Content,
    Thumbnails,
    Image,
    Title,
} from './styles';

function videos() {

    const [data, sdata] = useState({});

    const [modal, smodal] = useState(false);
    const [url, surl] = useState('');

    const [loading_page, sloadingpage] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {

        try {

            sloadingpage(true);

            const { data } = await api.get(`videos`);

            sdata(data);
            sloadingpage(false);

        } catch (e) {
            message(e);
            sloadingpage(false);
        };

    }

    const component = () => (
        <>
            <Content>
                {
                    data.map((e, i) =>
                        <Thumbnails key={i} onClick={() => {
                            surl(`https://www.youtube.com/embed/${e.video_id}`);
                            smodal(true)
                        }}>
                            <Image src={e.thumbnails} />
                            <Title>{e.title}</Title>
                        </Thumbnails>
                    )
                }
            </Content>

        </>
    );

    return (
        <>
            <Container
                title='VÍDEOS DICAS'
                Component={component}
                loading={loading_page}
            />
            {
                modal &&
                <ModalVideos
                    modal={modal}
                    smodal={smodal}
                    url={url}
                />
            }
        </>
    );
}

export default videos;