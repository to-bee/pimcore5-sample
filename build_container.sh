# This script will build the containers if the db container is not available
#!/bin/bash

source ./.env

CONTAINER_NAME=${DOCKER_APP_NAME_PRAEFIX}_db_1
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME exists"
    #echo "Creating sql dump"
    echo "Running docker-compose without build"
    docker-compose --project-name $DOCKER_APP_NAME_PRAEFIX up --remove-orphans -d


else
    if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
        echo "Cleanup $CONTAINER_NAME"
        docker rm $CONTAINER_NAME
    fi
    echo "Running docker-compose with build option"
    docker-compose --project-name $DOCKER_APP_NAME_PRAEFIX up --build --remove-orphans -d

fi