import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

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