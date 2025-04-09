# Install dependencies only when needed
FROM node:20.0.0-alpine AS deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:20.0.0-alpine AS builder
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run the app
FROM node:20.0.0-alpine AS production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]