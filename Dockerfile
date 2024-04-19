FROM oven/bun:debian

RUN apt-get update
RUN apt-get install -y curl

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 1994

ENTRYPOINT [ "bun", "run", "index.js" ]