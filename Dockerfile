# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage — nginx serves the static SPA
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
# Railway sets PORT dynamically; fallback to 80 for local Docker
ENV PORT=80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
