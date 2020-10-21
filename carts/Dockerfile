FROM maven:3-jdk-11 as build

WORKDIR /work

COPY . .

RUN mvn clean package

from adoptopenjdk/openjdk11:alpine

copy --from=build "/work/target/*.jar" /carts.jar

RUN chmod a+rx ./carts.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/urandom","-jar","/carts.jar", "--port=80"]
