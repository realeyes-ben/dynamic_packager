FROM node:13.8.0-stretch

LABEL author="Benjamin Toofer"
LABEL email="ben.toofer@realeyes.com"

ENV BENTO Bento4-SDK-1-5-1-629.x86_64-unknown-linux

RUN apt-get update && apt-get install -y unzip wget

RUN wget http://zebulon.bok.net/Bento4/binaries/${BENTO}.zip -O /var/tmp/Bento4.zip \
    && unzip var/tmp/Bento4.zip -d var/tmp \
    && rm /var/tmp/Bento4.zip

ENV PATH /var/tmp/${BENTO}/bin:$PATH

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 8080