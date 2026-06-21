# use Node.js 22 as base image
FROM node:22-alpine

# install OpenSSL for Prisma
RUN apk add --no-cache openssl

# set working directory inside container
WORKDIR /app

# copy package files first (for caching)
COPY package*.json ./

# install dependencies
RUN npm install

# copy prisma schema
COPY prisma ./prisma/

# generate Prisma client
RUN npx prisma generate

# copy rest of the code
COPY . .

# expose port
EXPOSE 5000

# start the server
CMD ["node", "server.js"]