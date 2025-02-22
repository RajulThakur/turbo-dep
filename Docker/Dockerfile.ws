FROM oven/bun:1
WORKDIR /app
COPY ./bun.lock ./bun.lock
COPY ./packages ./packages
COPY ./turbo.json ./turbo.json
COPY ./package* .
COPY ./apps/ws-backend ./ws-backend

RUN bun install
RUN bun run db:generate
RUN bun run build
EXPOSE 3002
CMD [ "bun",'run','start:ws-backend' ]