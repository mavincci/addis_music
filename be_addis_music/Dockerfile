FROM oven/bun:1.2.23 AS be_addis_builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .


FROM oven/bun:1.2.23 AS be_addis_runner

WORKDIR /app

COPY --from=be_addis_builder /app/node_modules ./node_modules

COPY --from=be_addis_builder /app .

USER bun

EXPOSE 3000

CMD ["bun", "run", "index.ts"]
