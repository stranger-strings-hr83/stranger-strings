FROM node:9
RUN mkdir /hrsf83-thesis

ADD package.json /hrsf83-thesis
RUN npm i

ADD . /hrsf83-thesis
WORKDIR /hrsf83-thesis


EXPOSE 8080

CMD ["npm", "start"]



