#!/bin/sh

/wait
/migrate \
  -path $MIGRATIONS_DIR \
  -database "mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@tcp(${MYSQL_HOST}:3306)/${MYSQL_DATABASE}" \
  $@
