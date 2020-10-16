FROM maven:3.2-jdk-8 as build

WORKDIR /opt

COPY . .

RUN mvn clean package

FROM weaveworksdemos/msd-java:jre-latest

COPY --from=build "/opt/target/*.jar" ./app.jar

RUN	chown -R ${SERVICE_USER}:${SERVICE_GROUP} ./app.jar

USER ${SERVICE_USER}

ENTRYPOINT ["/usr/local/bin/java.sh","-jar","./app.jar", "--port=80"]
