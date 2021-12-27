FROM node:16.13.1-alpine
COPY src /home/app/src
COPY package.json /home/app
COPY yarn.lock /home/app
COPY  tsconfig.json /home/app
WORKDIR /home/app
RUN yarn install && yarn tsc

EXPOSE 3000
ENTRYPOINT [ "node", "/home/app/dist/server.js" ]