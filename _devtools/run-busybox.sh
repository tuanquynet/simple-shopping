export DOCKER_HOST=ssh://ubuntu@192.168.1.98

docker run \
  -it -d \
  --network=simple-shopping_shopping_net \
  busybox sh