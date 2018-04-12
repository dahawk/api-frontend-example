# --- BUILD GO
FROM golang:1.10

WORKDIR /go/src/github.com/nimbusec-oss/api-frontend-example/
COPY . .

RUN go get && go install


# --- BUILD WEB
FROM node:9

WORKDIR /home/node

COPY client/ client/
COPY public/ public/

RUN npm install -g sass
RUN cd client && npm install
RUN cd client && ./node_modules/.bin/grunt

# --- START WEBSERVER
FROM node:9

ENV NIMBUSEC_KEY=abc
ENV NIMBUSEC_SECRET=abc
ENV NIMBUSEC_URL=https://api.nimbusec.com
ENV NIMBUSEC_REPORT_LOGO=/static/img/nimbusec-logo.png

EXPOSE 3000

COPY --from=0 /go/bin/api-frontend-example api-frontend-example
COPY --from=1 /home/node/public/ public/
CMD ./api-frontend-example