FROM cartoleiro/app:latest

WORKDIR /home/deploy

COPY . .

RUN /usr/bin/supervisord -c /etc/supervisor/supervisord.conf