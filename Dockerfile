FROM node:14.2-alpine as build

RUN mkdir -p /src
COPY package.json src/package.json
WORKDIR /src

RUN npm install --only=production --silent

COPY . /src

RUN npm run build

FROM nginx:1.17-alpine

COPY --from=build /src/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
