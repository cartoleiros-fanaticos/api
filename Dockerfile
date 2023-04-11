FROM cartoleiro/app:latest

WORKDIR /home/deploy

COPY . .

RUN chmod +x init.sh

#CMD ['/usr/bin/supervisord -c /etc/supervisor/supervisord.conf']