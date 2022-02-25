PROJECT=simple-shopping
docker rmi product_svc:testing

docker-compose -p $PROJECT -f ./docker-compose-test.yml down --volumes
