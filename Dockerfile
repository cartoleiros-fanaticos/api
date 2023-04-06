FROM cartoleiro/app:latest

WORKDIR /home/deploy

COPY . .

CMD ['/usr/bin/supervisord -c /etc/supervisor/supervisord.conf']