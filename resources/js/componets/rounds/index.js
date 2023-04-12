import React, { useState, useEffect, useRef } from 'react';

import { swal_warning } from '../../utils/helpers';

import {
    Container,
    List,
    Item,
} from './styles';

function rounds({ rodada_atual, fnc }) {

    const rodadas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];

    async function select(element, rodada) {

        if (rodada > rodada_atual) {

            swal_warning('Ainda não existe dados para essa rodada.');

        } else {

            let rd = element.parentElement.querySelector('.active');
            let active = rd.innerText;

            rd.classList.remove('active');

            let box_view = 11;
            let box = 5;
            let box_min = 5;
            let box_max = 34;
            let width_box = 98.18;

            if (window.innerWidth <= 900) {
                box_view = 7;
                box = 3;
                box_min = 2;
                box_max = 36;
                width_box = (window.innerWidth - 20) / 7;
            }

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

            fnc(rodada);

        }

    }

    return (
        <Container>
            <List>
                {
                    rodadas.map(rodada =>
                        <Item
                            onClick={(event) => select(event.target, rodada)}
                            className={rodada === rodada_atual ? 'active' : ''}
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