FROM node:10
COPY . /src
COPY package.json /user
WORKDIR /src
RUN npm install --production
EXPOSE 5000
CMD npm start