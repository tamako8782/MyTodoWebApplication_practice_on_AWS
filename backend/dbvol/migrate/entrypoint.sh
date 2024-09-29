#!/bin/sh

if [ -f /wait ]; then
  /wait  # docker-compose-waitを実行して、MySQLが起動するのを待つ
fi

/migrate \
  -path $MIGRATIONS_DIR \
  -database "mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@tcp(${MYSQL_HOST}:3306)/${MYSQL_DATABASE}" \
  $@
