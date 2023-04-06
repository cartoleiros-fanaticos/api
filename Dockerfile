FROM cartoleiro/app:latest

WORKDIR /home/deploy

COPY . .

RUN apt-get install -y supervisor

RUN /usr/bin/supervisord