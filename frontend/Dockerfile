FROM node:18-slim AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV PYTHONPATH=${PYTHONPATH}:${PWD}
ENV PORT 3000
RUN npm install -g serve
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "-l", "3000", "./build"]