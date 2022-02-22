export DOCKER_HOST=ssh://ubuntu@192.168.1.98

export MONGO_INITDB_ROOT_USERNAME=admin
export MONGO_INITDB_ROOT_PASSWORD=admin123
export MONGO_HOST=mongodb
export MONGO_PORT=27017
export MONGO_USER=admin
export MONGO_PASS=admin123

docker-compose -f ./docker-compose.yml up -d
