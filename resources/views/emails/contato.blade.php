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
        display: block;
        font-weight: 500;
        margin: 20px auto;
    }
</style>

<div>
    <h3>OLÁ, SEJA BEM VINDO :)</h3>
    <img src="{{ $data['logo'] }}" />
    <p>Mensagem recebida por <strong>{{ $data['user']['nome'] }}</strong></p>
    <p>{{ $data['user']['mensagem'] }}</p>
    <a href="https://api.whatsapp.com/send?phone=+55{{ $data['user']['celular'] }}&text=Olá cartoleiro recebi sua mensagem, desculpe pela demora.">Clique aqui para enviar um zap</a>
</div>