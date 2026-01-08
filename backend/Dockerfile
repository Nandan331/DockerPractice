#using light weight node image
FROM node:18-alpine

#setting working directory
WORKDIR /app  

#copying package.json and package-lock.json
COPY package*.json ./

#installing dependencies
RUN npm install --production

#copying all files
COPY . .

#exposing port
EXPOSE 5500

#starting the server
CMD ["node", "index.js"]