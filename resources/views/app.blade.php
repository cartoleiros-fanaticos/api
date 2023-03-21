<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    {{-- <link rel="icon" type="image/x-icon" href="/upload/images/logo/icon.png"> --}}
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>CARTOLEIRO</title>
    <link href="/css/material.icon.css" rel="stylesheet">
</head>

<body>
    <div id="app"></div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>