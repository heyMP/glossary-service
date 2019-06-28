FROM node:10-alpine

WORKDIR /home/node
COPY package.json package-lock*.json ./
RUN npm install
COPY . .

RUN touch /tmp/glossary-terms.json

EXPOSE 4000
CMD ["node", "index.js", "/tmp/glossary-terms.json"]