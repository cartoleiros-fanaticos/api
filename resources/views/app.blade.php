<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" type="image/x-icon" href="/images/favicon.png">

    <link rel="manifest" href="manifest.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Cartoleiro Fanático">
    <meta name="apple-mobile-web-app-title" content="Cartoleiro Fanático">
    <meta name="msapplication-starturl" content="/">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <meta name="theme-color" content="#F68D42">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Cartoleiro Fanático</title>
    <link href="/css/material.icon.css" rel="stylesheet">
    <script async src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.8/pwacompat.min.js" integrity="sha384-uONtBTCBzHKF84F6XvyC8S0gL8HTkAPeCyBNvfLfsqHh+Kd6s/kaS4BdmNQ5ktp1" crossorigin="anonymous"></script>
</head>

<body>
    <div id="app"></div>
    <script src="{{ mix('js/app.js') }}"></script>
    <script src="/index.js"></script>
</body>

</html>