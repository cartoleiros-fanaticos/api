FROM cartoleiro/app:latest

WORKDIR /home/deploy

COPY . .

RUN chmod +x init.sh