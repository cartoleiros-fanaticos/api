<style>
    div {
        display: block;
        text-align: center;
        flex-direction: column;
        font-family: 'Trebuchet MS'
    }

    p {
        font-size: 0.9em;
        font-family: Tahoma;
    }

    img {
        margin: 25px auto;
        width: 150px;
    }

    a {
        padding: 15px;
        color: #fff !important;
        background: #c40808;
        text-decoration: none;
        font-weight: 500;
        margin-top: 20px;
    }
</style>

<div>
    <h3>OLÁ, SEJA BEM VINDO :)</h3>
    <img src="{{ $data['logo'] }}" />
    <p>Basta clicar no botão abaixo</p>
    <a href="{{ $data['confirm_link'] }}">RECUPERAR SENHA</a>
</div>
