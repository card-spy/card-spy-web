# Reference: https://calvinf.com/blog/2023/11/10/node-js-20-yarn-4-and-next-js-on-docker/

FROM node:20-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production YARN_VERSION=4.6.0

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init

# Setup Yarn 4
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install dependencies
COPY . .
COPY package.json yarn.lock* .yarnrc.yml ./
RUN yarn --immutable

# Build the node project
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
