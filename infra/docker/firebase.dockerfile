FROM node:14-slim

RUN apt-get update && \
    apt-get -y upgrade && \
    echo 'deb http://ftp.de.debian.org/debian sid main' >> '/etc/apt/sources.list' && \
    apt-get -y update && \
    mkdir -p /usr/share/man/man1 && \
    apt-get -y install curl openjdk-11-jre-headless

RUN npm install -g firebase-tools
