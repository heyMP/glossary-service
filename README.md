# Glossary Service

Service for storing glossary terms.

Example implementation:

```yml
version: "3"
services:
  glossary-service:
    build: .
    ports:
      - '4000:4000'
    volumes:
      - .:/home/node/
      - /home/node/node_modules
    environment: 
      MONGO_URL: mongo:27017

  mongo:
    image: mongo
    restart: always

volumes:
  mongo:
```