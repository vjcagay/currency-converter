FROM node:20.8.0-alpine AS backend
EXPOSE 8081 8081
ENV NODE_ENV production
WORKDIR /home/app
COPY backend .
RUN npm install
ENTRYPOINT npx ts-node --transpile-only index.ts

# Multi-stage, only for building the frontend dependencies
FROM node:20.8.0-alpine AS frontend-build
WORKDIR /home/app
ENV NODE_ENV production
COPY frontend .
RUN npm install
RUN npx vite build --sourcemap

FROM nginx:mainline-alpine3.18-slim AS frontend
EXPOSE 8080 80
WORKDIR /
COPY --from=frontend-build /home/app/dist /usr/share/nginx/html
