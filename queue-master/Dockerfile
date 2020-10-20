FROM maven:3-jdk-11 as build
WORKDIR /tmp

copy src /tmp/src
copy pom.xml /tmp/

run mvn clean package

FROM adoptopenjdk/openjdk11:alpine

COPY --from=build /tmp/target/*.jar /master-queue.jar

RUN chown -R ${SERVICE_USER}:${SERVICE_GROUP} /master-queue.jar

USER ${SERVICE_USER}

ENTRYPOINT ["/opt/java/openjdk/bin/java","-jar","/master-queue.jar", "--port=80"]

