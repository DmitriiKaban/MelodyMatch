# Stage 1: Build the application
FROM maven:3.8.3-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Update the path to match the actual location of the JAR file in the build stage
COPY --from=build /app/target/*.jar ./TUnify.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "TUnify.jar"]
