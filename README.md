# simple-shopping
it's just demo


## Setup rabbitmq
for windows, please remove line 'NODENAME=rabbit@localhost' from rabbitmq/src/rabbimq-env.conf
docker exec -ti <container-id> rabbitmqctl add_user admin admin
docker exec -ti <container-id> rabbitmqctl set_user_tags admin administrator
docker exec -ti <container-id> rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"s
