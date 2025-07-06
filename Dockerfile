# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server ./server
WORKDIR /app/server
RUN npm install --production
EXPOSE 4000
CMD ["node", "index.js"]