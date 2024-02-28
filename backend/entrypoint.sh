#!/usr/bin/dumb-init /bin/sh

node ace migration:run
node ace db:seed
node bin/server.js