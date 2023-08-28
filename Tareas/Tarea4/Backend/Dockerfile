# syntax=docker/dockerfile:1

FROM golang:1.16-alpine

WORKDIR /

COPY . .
RUN go mod download

EXPOSE 8001

CMD [ "go","run","main.go" ]