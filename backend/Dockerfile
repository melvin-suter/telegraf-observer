FROM node:20-alpine AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /app && chown node:node /app
WORKDIR /app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --ignore-ts-errors

FROM base
ENV NODE_ENV=production
ENV PORT=8000
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit="dev"  
COPY --chown=node:node --from=build /app/build .
COPY --chown=node:node entrypoint.sh /app/entrypoint.sh
RUN chmod 775 /app/entrypoint.sh
EXPOSE 8000
CMD [ "dumb-init", "/app/entrypoint.sh" ]