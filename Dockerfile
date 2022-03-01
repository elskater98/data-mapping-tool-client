FROM node:16.13.0

WORKDIR app

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm","build"]

