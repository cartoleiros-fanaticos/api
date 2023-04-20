FROM cartoleiro/app:77af674b842b594e891dd89df3f952e9afb2fc7c

WORKDIR /home/deploy

COPY . .

RUN chmod +x init.sh

#CMD ['/usr/bin/supervisord -c /etc/supervisor/supervisord.conf']