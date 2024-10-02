FROM ubuntu:22.04 AS prod

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y curl gnupg2 vim git default-mysql-client && \
    curl -L https://github.com/golang-migrate/migrate/releases/download/v4.11.0/migrate.linux-amd64.tar.gz | tar xvz && \
    mv ./migrate.linux-amd64 /usr/bin/migrate

COPY ./ /migrations

CMD ["sh","-c","migrate -path migrations -database \"mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@tcp(${MYSQL_HOST}:3306)/${MYSQL_DATABASE}\" up" ]