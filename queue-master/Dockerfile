FROM maven:3.2-jdk-8 as build
WORKDIR /tmp

copy src /tmp/src
copy pom.xml /tmp/

run mvn clean package

FROM java:openjdk-8-alpine

COPY --from=build /tmp/target/*.jar /master-queue.jar

RUN chown -R ${SERVICE_USER}:${SERVICE_GROUP} /master-queue.jar

USER ${SERVICE_USER}

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/urandom","-jar","/master-queue.jar", "--port=80"]

