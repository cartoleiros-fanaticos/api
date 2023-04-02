#!/bin/sh

service php8.1-fpm start
service nginx restart
php artisan migrate --seed