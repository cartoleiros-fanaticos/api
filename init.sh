#!/bin/sh

service php8.1-fpm start
service nginx start
chown -R $USER:www-data storage
chown -R $USER:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache

rm .env

if [ ! -f .env ]
then
        cp .env.example .env
fi

composer clean

php artisan migrate --seed
