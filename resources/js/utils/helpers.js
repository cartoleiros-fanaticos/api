import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import html2canvas from 'html2canvas';

export const amount = (value) => {
    return parseFloat(value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const swal_success = (text, title = 'Sucesso', icon = 'success', confirmButtonText = 'OK') => {
    return Swal.fire({ title, text, icon, confirmButtonText });
}

export const swal_warning = (text, title = 'Atenção', icon = 'warning', confirmButtonText = 'Entendi') => {
    Swal.fire({ title, text, icon, confirmButtonText });
}

export const swal_ask = (text, confirmButtonText = 'Sim', cancelButtonText = 'Não', confirmButtonColor = '#c40808', cancelButtonColor = '#999', title = 'Confirme por favor', icon = 'warning', input = null, html = null, preConfirm = {}) => {


    let data = {
        title,
        text,
        icon,
        html,
        input,
        confirmButtonText,
        cancelButtonText,
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor
    };

    if (!input || !html) {
        data = {
            ...data,
            preConfirm: () => {
                return preConfirm
            }
        };
    }

    return Swal.fire(data)
}

export const message = (e) => {
    console.log(e);
    if (e.response) {
        const { status, data: { message: text } } = e.response;
        const title = (status === 401 || status === 400) ? 'Atenção!' : 'Erro!';
        const icon = (status === 401 || status === 400) ? 'warning' : 'error';
        Swal.fire({ title, text, icon, confirmButtonText: 'Entendi' });
    } else {

        Swal.fire({
            title: 'Erro!',
            text: 'Verifique sua conexão com a internet.',
            icon: 'warning',
            confirmButtonText: 'Entendi'
        });

    }
}

export const download = async (data, text_left, text_right, filter) => {

    document.body.style.cssText = `    
        font-family: Arial;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    `;

    let section = document.createElement('section');
    section.setAttribute('class', 'cruzmento_scouts');

    section.style.cssText = `
        background: #a0a002;
        width: 700px;
        padding: 50px 15px 15px 15px;
        box-sizing: border-box;
    `;

    let container = document.createElement('div');

    let blob = await fetch(`${location.origin}/images/logo_preta.png`).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });

    container.style.cssText = `
        position: relative;
        width: 100%;
        background: url(${dataUrl});
        background-repeat: no-repeat;
        background-size: 500px;
        background-position: 80px 300px;
    `;

    let header = document.createElement('header');

    let h1 = document.createElement('h1');
    h1.innerText = 'ESTATÍSTICAS';
    h1.style.cssText = `    
        background-color: #F68D42;
        padding: 15px;
    `;

    blob = await fetch(`${location.origin}/images/logo_preta.png`).then(r => r.blob());
    dataUrl = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });

    let img = document.createElement('img');
    img.src = dataUrl;
    img.style.cssText = `  
        position: absolute;
        width: 250px;
        right: 50px;
        top: -40px;
    `;

    h1.appendChild(img);
    header.appendChild(h1);

    let h3 = document.createElement('h3');
    h3.innerText = `RANKING DE ${filter.scout.name.toUpperCase()}`;
    h3.style.cssText = `
        padding: 15px;
        color: #fff;
        background: #000;
        text-align: center;
        margin: 0;
    `;

    header.appendChild(h3);

    let h4 = document.createElement('h4');
    h4.innerText = `POSIÇÃO: ${filter.posicao_id.name || 'Todas'} | RODADA: ${filter.ultimas_rodadas.name === 38 ? 'Todas' : filter.ultimas_rodadas.name} | FILTRO: ${filter.total.name}`;
    h4.style.cssText = `
        padding-bottom: 10px;
        color: #fff;
        background: #000;
        text-align: center;
        margin: 0;
    `;

    header.appendChild(h4);

    let h2 = document.createElement('h2');
    h2.innerText = `${text_left} ( EM CASA ) X ${text_right} ( FORA )`;
    h2.style.cssText = `
        padding: 10px;
        background: #fefecc;
        text-align: center;
        font-size: 1.2em;
        margin: 0;
    `;

    header.appendChild(h2);
    container.appendChild(header);

    let article = document.createElement('article');
    article.style.cssText = `
        background-color: rgba(0, 0, 0, 0.7);
        padding: 15px;
        height: 695px;
        margin-top: 15px;
    `;

    let ul = document.createElement('ul');
    ul.style.cssText = `
        padding: 0;
    `;

    for (let x in data.partidas) {

        let e = data.partidas[x];

        let li = document.createElement('li');
        li.style.cssText = `
        display: flex;
        justify-content: space-between;
        padding: 5px;
        align-items: center;
        margin-bottom: 10px;
    `;

        ul.appendChild(li);

        let div = document.createElement('div');
        div.style.cssText = `
        display: flex;
        align-items: center;
        width: 300px;
        justify-content: space-between;
        `;

        li.appendChild(div);

        img = document.createElement('img');
        img.src = data.clubes[e.clube_casa_id].escudo;
        img.style.cssText = `
        width: 48px;
    `;

        div.appendChild(img);

        let span = document.createElement('span');

        if (text_left === 'CONQUISTADOS')
            span.innerText = data.scouts.conquista_casa.length ? data.scouts.conquista_casa[e.clube_casa_id].pontos : 0;
        else
            span.innerText = data.scouts.cedidas_casa.length ? data.scouts.cedidas_casa[e.clube_casa_id].pontos : 0

        span.style.cssText = `
        font-weight: bold;
        color: #fff;
        font-size: 1.4em;
    `;

        div.appendChild(span);

        span = document.createElement('span');
        span.innerText = 'x';
        span.style.cssText = `
        font-weight: bold;
        color: #fff;
        font-size: 1.4em;
    `;

        div.appendChild(span);

        span = document.createElement('span');

        if (text_left === 'CONQUISTADOS')
            span.innerText = data.scouts.cedidas_fora.length ? data.scouts.cedidas_fora[e.clube_visitante_id].pontos : 0;
        else
            span.innerText = data.scouts.conquista_fora.length ? data.scouts.conquista_fora[e.clube_visitante_id].pontos : 0


        span.style.cssText = `
        font-weight: bold;
        color: #fff;
        font-size: 1.4em;
    `;

        div.appendChild(span);

        img = document.createElement('img');
        img.src = data.clubes[e.clube_visitante_id].escudo;
        img.style.cssText = `
        width: 48px;
    `;

        div.appendChild(img);

        let strong = document.createElement('strong');

        if (text_left === 'CONQUISTADOS')
            strong.innerText = (data.scouts.conquista_casa.length ? data.scouts.conquista_casa[e.clube_casa_id].pontos : 0) + (data.scouts.cedidas_fora.length ? data.scouts.cedidas_fora[e.clube_visitante_id].pontos : 0)
        else
            strong.innerText = (data.scouts.cedidas_casa.length ? data.scouts.cedidas_casa[e.clube_casa_id].pontos : 0) + (data.scouts.conquista_fora.length ? data.scouts.conquista_fora[e.clube_visitante_id].pontos : 0);

        strong.style.cssText = `
            font-weight: bold;
            color: #fff;
            font-size: 1.4em;
            `;

        li.appendChild(strong);

    }

    article.appendChild(ul);

    container.appendChild(article);
    section.appendChild(container);

    document.body.appendChild(section);

    return html2canvas(section).then(async canvas => {

        let a = document.createElement('a');

        a.href = canvas.toDataURL('image/png', 1.0)
        a.className = 'cruzamento';
        a.download = 'cruzada.png';
        document.body.appendChild(a);

        a.click();

        document.querySelector('.cruzmento_scouts').remove();

    });
}