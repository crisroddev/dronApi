FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY client/package.json ./client/
RUN cd client && npm install && cd ..

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "dev" ]
