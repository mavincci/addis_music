FROM oven/bun:1.2.23 AS fe_addis_music_builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM caddy:2-alpine

COPY --from=fe_addis_music_builder /app/dist /usr/share/caddy

COPY Caddyfile /etc/caddy/Caddyfile
