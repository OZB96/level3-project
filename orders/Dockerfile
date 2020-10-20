FROM maven:3-jdk-11 as build

WORKDIR /opt

COPY . .

RUN mvn clean package

FROM adoptopenjdk/openjdk11:alpine

COPY --from=build "/opt/target/*.jar" ./app.jar

USER ${SERVICE_USER}

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/urandom","-jar","./app.jar", "--port=80"]
