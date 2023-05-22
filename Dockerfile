# Reference : https://nodejs.org/en/docs/guides/nodejs-docker-webapp
# Operating System
FROM node:18 as base

# Basic Package Install
RUN apt-get update && apt-get install -y \ 
    libvips-dev \
    libtool \
    automake \
    autoconf \
    nasm \
#    wget \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
#    libgtk-4-1 \
    libnspr4 \
    libnss3 \
    libwayland-client0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libvulkan1
# Install Chrome from Pythonist & Andrzej Krawczuk
RUN curl -LO  https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb
# Check chrome version
RUN echo "Chrome: " && google-chrome --version

# PM2
# RUN npm install pm2 -g

# Working Directory
WORKDIR /app/

COPY ./app/package.json ./app/yarn.lock ./

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn install

COPY ./app .

EXPOSE 4420
#RUN yarn test
CMD ["/bin/bash", "-c", "yarn test"]
