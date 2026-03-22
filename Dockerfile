FROM node:22-alpine AS base
WORKDIR /usr/src/app
COPY . .
RUN npm install

# dev
FROM base AS dev
CMD ["npm", "run", "dev"]

# init (generate + migrate + dev)
FROM base AS init
CMD ["sh", "-c", "npx drizzle-kit generate && npx drizzle-kit migrate && npm run dev"]

# migrate (migrate + dev)
FROM base AS migrate
CMD ["sh", "-c", "npx drizzle-kit migrate && npm run dev"]

# prod
FROM base AS prod
RUN npm run build
CMD ["node", ".output/server/index.mjs"]
