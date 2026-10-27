FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci -w backend --include-workspace-root
COPY backend backend
RUN npm run build -w backend

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY frontend/package.json frontend/
RUN npm ci -w backend --omit=dev
COPY --from=build /app/backend/dist backend/dist
USER node
EXPOSE 8080
CMD ["node", "backend/dist/server.js"]
