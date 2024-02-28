test:

sudo docker run --name mongodb \
 -e MONGO_INITDB_DATABASE=telegraf-observer \
 -p 127.0.0.1:27017:27017/tcp \
 -d mongo:latest

sudo docker run -d --name postgres \
    -e POSTGRES_PASSWORD=telegraf-observer \
    -e POSTGRES_USER=telegraf-observer \
    -e POSTGRES_DB=telegraf-observer \
    -p 127.0.0.1:5432:5432/tcp \
    postgres

export DB_DATABASE=telegraf-observer
export DB_USER=telegraf-observer
export DB_PASSWORD=telegraf-observer
export DB_HOST=127.0.0.1
