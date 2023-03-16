FROM node:16-alpine as build
#funciona con nginx y build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/dist .
COPY nginx.conf /etc/nginx/nginx.conf