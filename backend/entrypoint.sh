#!/usr/bin/dumb-init /bin/sh

node ace migrate
node ace db:seed
node server.js