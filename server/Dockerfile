FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY pom.xml /app/

RUN apk add maven && \
  rm -rf /var/cashe/apk/*

RUN set -x && \
  addgroup -g 1000 appuser && \
  adduser -u 1000 -D -G appuser appuser

USER appuser

RUN mvn dependency:go-offline -B
