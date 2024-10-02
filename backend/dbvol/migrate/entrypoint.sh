#!/bin/sh


/migrate \
  -database \"mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@tcp(${MYSQL_HOST}:3306)/${MYSQL_DATABASE}\" \
  $@
