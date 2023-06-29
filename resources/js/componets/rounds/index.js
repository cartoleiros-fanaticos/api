import React, { useEffect } from 'react';

import { swal_warning } from '../../utils/helpers';

import {
    Container,
    List,
    Item,
} from './styles';

function rounds({ data, type = 'teams', fnc }) {

    let box_view = 11;
    let box = 5;
    let box_min = 5;
    let box_max = 34;
    let width_box = 102.727;

    if (window.innerWidth <= 900) {
        box_view = 7;
        box = 3;
        box_min = 2;
        box_max = 36;
        width_box = (window.innerWidth - 20) / box_view;
    }

    useEffect(() => {

        if (data.rodada_atual > box_view) {

            const calc = (data.rodada_atual - box) * width_box - width_box;

            setTimeout(() => {
                const element = document.querySelector(`.rounds .active`);

                element.parentElement.style.cssText = `
                    margin-left: -${calc}px;
                `;

            }, 300)
        }

    }, []);

    const rodadas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];

    async function select(element, rodada) {

        if (type === 'teams' && !data.time_id) {
            swal_warning('Selecione um time antes de executar essa ação.');
            return false
        }

        if (rodada > data.rodada_atual) {

            swal_warning('Ainda não existe dados para essa rodada.');

        } else {

            let rd = element.parentElement.querySelector('div .active');
            let active = rd.innerText;

            rd.classList.remove('active');

            if (rodada > box_min && rodada < box_max) {

                let calc = (rodada - box) * width_box - width_box;

                element.parentElement.style.cssText = `
                margin-left: -${calc}px;
            `;

            } else if (active > box && rodada <= box) {

                element.parentElement.style.cssText = `
                margin-left: 0px;
            `;

            } else if (rodada >= box_max) {

                element.parentElement.style.cssText = `
                margin-left: -${(38 - box_view) * width_box}px;
            `;

            }

            element.classList.add('active');

            data.rodada = rodada;

            fnc(data);

        }

    }

    return (
        <Container>
            <List className='rounds'>
                {
                    rodadas.map(rodada =>
                        <Item
                            round={rodada}
                            width={window.innerWidth}
                            onClick={(event) => select(event.target, rodada)}
                            className={rodada === data.rodada_atual ? 'active' : ''}
                            key={rodada}
                        >
                            {rodada}
                        </Item>
                    )
                }
            </List>
        </Container>
    );
}

export default rounds;