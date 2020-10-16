FROM maven:3.2-jdk-8 as build

WORKDIR /work

COPY . .

RUN mvn clean package

from java:openjdk-8-alpine

copy --from=build "/work/target/*.jar" /carts.jar

RUN chmod a+rx ./carts.jar

USER ${SERVICE_USER}

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/urandom","-jar","/carts.jar", "--port=80"]
