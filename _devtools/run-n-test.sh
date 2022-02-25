# export DOCKER_HOST=ssh://ubuntu@192.168.1.98

export MONGO_INITDB_ROOT_USERNAME=admin
export MONGO_INITDB_ROOT_PASSWORD=admin123
export MONGO_HOST=mongodb
export MONGO_PORT=27017
export MONGO_USER=admin
export MONGO_PASS=admin123

export RABBITMQ_USER=admin
export RABBITMQ_PASS=admin
export RABBITMQ_HOST=rabbitmq
export RABBITMQ_PROTOCOL=amqp
export RABBITMQ_PORT=5672

PROJECT=simple-shopping
# Deploy core services
docker-compose -p $PROJECT -f ./docker-compose-test.yml up -d

# echo 'We need to wait for 30s before running test case'
sleep 30

RABBITMQ_CONTAINER_ID=$(echo $PROJECT)_rabbitmq_1
docker exec -ti $RABBITMQ_CONTAINER_ID rabbitmqctl add_user admin admin
docker exec -ti $RABBITMQ_CONTAINER_ID rabbitmqctl set_user_tags admin administrator
docker exec -ti $RABBITMQ_CONTAINER_ID rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"s


# Build product image and test
bash ./_devtools/build-product-svc.sh

NETWORK=$(echo $PROJECT)_shopping_net
docker run \
  --rm \
  -it \
  --name product_svc_testing \
  --network=$NETWORK \
  -e MONGO_HOST=$MONGO_HOST \
  -e MONGO_PORT=$MONGO_PORT \
  -e MONGO_USER=$MONGO_USER \
  -e MONGO_PASS=$MONGO_PASS \
  -e RABBITMQ_HOST=$RABBITMQ_HOST \
  -e RABBITMQ_PROTOCOL=$RABBITMQ_PROTOCOL \
  -e RABBITMQ_USER=$RABBITMQ_USER \
  -e RABBITMQ_PASS=$RABBITMQ_PASS \
  product_svc:testing npm run test
