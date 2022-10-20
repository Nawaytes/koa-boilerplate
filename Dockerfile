FROM node:16

# create dir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# build dependencies
RUN npm install serve -g
COPY ./package*.json ./
USER node
RUN npm ci
USER 0
RUN apt-get update 
RUN apt-get install -y chromium
# copy in source code
COPY --chown=node:node ./ ./
ENV NODE_OPTIONS=--max_old_space_size=512

# start server
CMD [ "npm", "run", "start:prod" ]
# CMD [ "tail", "-f", "/dev/null" ]