FROM node:15.8.0

WORKDIR /app

RUN npm install

COPY ./* /app/

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
