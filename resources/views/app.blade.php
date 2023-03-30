<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" type="image/x-icon" href="/images/favicon.png">

    <!-- place this in a head section -->
    <link rel="apple-touch-icon" href="/images/icons/touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/images/icons/touch-icon-ipad-retina.png">

    <!-- place this in a head section -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link sizes="2048x2732" rel="apple-touch-startup-image" href="/images/splash/apple_splash_2048.png">
    <link sizes="1668x2224" rel="apple-touch-startup-image" href="/images/splash/apple_splash_1668.png">
    <link sizes="1536x2048" rel="apple-touch-startup-image" href="/images/splash/apple_splash_1536.png">
    <link sizes="1125x2436" rel="apple-touch-startup-image" href="/images/splash/apple_splash_1125.png">
    <link sizes="1242x2208" rel="apple-touch-startup-image" href="/images/splash/apple_splash_1242.png">
    <link sizes="750x1334" rel="apple-touch-startup-image" href="/images/splash/apple_splash_750.png">
    <link sizes="640x1136" rel="apple-touch-startup-image" href="/images/splash/apple_splash_640.png">

    <meta name="theme-color" content="#F68D42">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="manifest" href="/manifest.webmanifest">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Cartoleiro Fanático</title>
    <link href="/css/material.icon.css" rel="stylesheet">
</head>

<body>
    <div id="app"></div>
    <script src="{{ mix('js/app.js') }}"></script>
    <script src="/index.js"></script>
</body>

</html>