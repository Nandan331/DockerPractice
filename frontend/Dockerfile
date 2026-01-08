# -------- Build Stage --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build 


# -------- Production Stage --------
FROM node:20-alpine

WORKDIR /app

# Install serve to host static files
RUN npm install -g serve

# Correct absolute path
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Correct way to run frontend
CMD ["serve", "-s", "dist", "-l", "3000"]
